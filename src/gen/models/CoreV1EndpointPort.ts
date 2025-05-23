/**
 * Kubernetes
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: v1.33.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http.js';

/**
* EndpointPort is a tuple that describes a single port. Deprecated: This API is deprecated in v1.33+.
*/
export class CoreV1EndpointPort {
    /**
    * The application protocol for this port. This is used as a hint for implementations to offer richer behavior for protocols that they understand. This field follows standard Kubernetes label syntax. Valid values are either:  * Un-prefixed protocol names - reserved for IANA standard service names (as per RFC-6335 and https://www.iana.org/assignments/service-names).  * Kubernetes-defined prefixed names:   * \'kubernetes.io/h2c\' - HTTP/2 prior knowledge over cleartext as described in https://www.rfc-editor.org/rfc/rfc9113.html#name-starting-http-2-with-prior-   * \'kubernetes.io/ws\'  - WebSocket over cleartext as described in https://www.rfc-editor.org/rfc/rfc6455   * \'kubernetes.io/wss\' - WebSocket over TLS as described in https://www.rfc-editor.org/rfc/rfc6455  * Other protocols should use implementation-defined prefixed names such as mycompany.com/my-custom-protocol.
    */
    'appProtocol'?: string;
    /**
    * The name of this port.  This must match the \'name\' field in the corresponding ServicePort. Must be a DNS_LABEL. Optional only if one port is defined.
    */
    'name'?: string;
    /**
    * The port number of the endpoint.
    */
    'port': number;
    /**
    * The IP protocol for this port. Must be UDP, TCP, or SCTP. Default is TCP.
    */
    'protocol'?: string;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "appProtocol",
            "baseName": "appProtocol",
            "type": "string",
            "format": ""
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string",
            "format": ""
        },
        {
            "name": "port",
            "baseName": "port",
            "type": "number",
            "format": "int32"
        },
        {
            "name": "protocol",
            "baseName": "protocol",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return CoreV1EndpointPort.attributeTypeMap;
    }

    public constructor() {
    }
}
