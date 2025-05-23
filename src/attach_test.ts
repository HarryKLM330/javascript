import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import WebSocket from 'isomorphic-ws';
import { ReadableStreamBuffer, WritableStreamBuffer } from 'stream-buffers';
import { anyFunction, anything, capture, instance, mock, verify, when } from 'ts-mockito';

import { CallAwaiter, matchBuffer, ResizableWriteableStreamBuffer } from './test/index.js';
import { Attach } from './attach.js';
import { KubeConfig } from './config.js';
import { TerminalSize } from './terminal-size-queue.js';
import { WebSocketHandler, WebSocketInterface } from './web-socket-handler.js';

describe('Attach', () => {
    describe('basic', () => {
        it('should correctly attach to a url', async () => {
            const kc = new KubeConfig();
            const fakeWebSocket: WebSocketInterface = mock(WebSocketHandler);
            const attach = new Attach(kc, instance(fakeWebSocket));
            const osStream = new WritableStreamBuffer();
            const errStream = new WritableStreamBuffer();
            const isStream = new ReadableStreamBuffer();

            const namespace = 'somenamespace';
            const pod = 'somepod';
            const container = 'somecontainer';

            await attach.attach(namespace, pod, container, osStream, errStream, isStream, false);

            const path = `/api/v1/namespaces/${namespace}/pods/${pod}/attach`;
            let args = `container=${container}&stderr=true&stdin=true&stdout=true&tty=false`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await attach.attach(namespace, pod, container, null, null, null, false);
            args = `container=${container}&stderr=false&stdin=false&stdout=false&tty=false`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await attach.attach(namespace, pod, container, osStream, null, null, false);
            args = `container=${container}&stderr=false&stdin=false&stdout=true&tty=false`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await attach.attach(namespace, pod, container, osStream, errStream, null, false);
            args = `container=${container}&stderr=true&stdin=false&stdout=true&tty=false`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();

            await attach.attach(namespace, pod, container, osStream, errStream, null, true);
            args = `container=${container}&stderr=true&stdin=false&stdout=true&tty=true`;
            verify(fakeWebSocket.connect(`${path}?${args}`, null, anyFunction())).called();
        });

        it('should correctly attach to streams', async () => {
            const kc = new KubeConfig();
            const fakeWebSocketInterface: WebSocketInterface = mock(WebSocketHandler);
            const fakeWebSocket: WebSocket.WebSocket = mock(WebSocket);
            const callAwaiter: CallAwaiter = new CallAwaiter();
            const attach = new Attach(kc, instance(fakeWebSocketInterface));
            const osStream = new ResizableWriteableStreamBuffer();
            const errStream = new WritableStreamBuffer();
            const isStream = new ReadableStreamBuffer();

            const namespace = 'somenamespace';
            const pod = 'somepod';
            const container = 'somecontainer';

            const path = `/api/v1/namespaces/${namespace}/pods/${pod}/attach`;
            const args = `container=${container}&stderr=true&stdin=true&stdout=true&tty=false`;

            const fakeConn: WebSocket.WebSocket = instance(fakeWebSocket);
            when(fakeWebSocketInterface.connect(`${path}?${args}`, null, anyFunction())).thenResolve(
                fakeConn,
            );
            when(fakeWebSocket.send(anything())).thenCall(callAwaiter.resolveCall('send'));
            when(fakeWebSocket.close()).thenCall(callAwaiter.resolveCall('close'));

            await attach.attach(namespace, pod, container, osStream, errStream, isStream, false);
            const [, , outputFn] = capture(fakeWebSocketInterface.connect).last();

            strictEqual(typeof outputFn, 'function');

            // this is redundant but needed for the compiler, sigh...
            if (!outputFn) {
                return;
            }

            let buffer = Buffer.alloc(1024, 10);

            outputFn(WebSocketHandler.StdoutStream, buffer);
            strictEqual(osStream.size(), 1024);
            let buff = osStream.getContents() as Buffer;
            for (let i = 0; i < 1024; i++) {
                strictEqual(buff[i], 10);
            }

            buffer = Buffer.alloc(1024, 20);
            outputFn(WebSocketHandler.StderrStream, buffer);
            strictEqual(errStream.size(), 1024);
            buff = errStream.getContents() as Buffer;
            for (let i = 0; i < 1024; i++) {
                strictEqual(buff[i], 20);
            }

            const initialTerminalSize: TerminalSize = { height: 0, width: 0 };
            await callAwaiter.awaitCall('send');
            verify(
                fakeWebSocket.send(
                    matchBuffer(WebSocketHandler.ResizeStream, JSON.stringify(initialTerminalSize)),
                ),
            ).called();

            const msg = 'This is test data';
            const inputPromise = callAwaiter.awaitCall('send');
            isStream.put(msg);
            await inputPromise;
            verify(fakeWebSocket.send(matchBuffer(WebSocketHandler.StdinStream, msg))).called();

            const terminalSize: TerminalSize = { height: 80, width: 120 };
            const resizePromise = callAwaiter.awaitCall('send');
            osStream.rows = terminalSize.height;
            osStream.columns = terminalSize.width;
            osStream.emit('resize');
            await resizePromise;
            verify(
                fakeWebSocket.send(matchBuffer(WebSocketHandler.ResizeStream, JSON.stringify(terminalSize))),
            ).called();

            const closePromise = callAwaiter.awaitCall('close');
            isStream.stop();
            await closePromise;
            verify(fakeWebSocket.close()).called();
        });
    });
});
