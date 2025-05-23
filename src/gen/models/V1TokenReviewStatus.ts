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

import { V1UserInfo } from '../models/V1UserInfo.js';
import { HttpFile } from '../http/http.js';

/**
* TokenReviewStatus is the result of the token authentication request.
*/
export class V1TokenReviewStatus {
    /**
    * Audiences are audience identifiers chosen by the authenticator that are compatible with both the TokenReview and token. An identifier is any identifier in the intersection of the TokenReviewSpec audiences and the token\'s audiences. A client of the TokenReview API that sets the spec.audiences field should validate that a compatible audience identifier is returned in the status.audiences field to ensure that the TokenReview server is audience aware. If a TokenReview returns an empty status.audience field where status.authenticated is \"true\", the token is valid against the audience of the Kubernetes API server.
    */
    'audiences'?: Array<string>;
    /**
    * Authenticated indicates that the token was associated with a known user.
    */
    'authenticated'?: boolean;
    /**
    * Error indicates that the token couldn\'t be checked
    */
    'error'?: string;
    'user'?: V1UserInfo;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "audiences",
            "baseName": "audiences",
            "type": "Array<string>",
            "format": ""
        },
        {
            "name": "authenticated",
            "baseName": "authenticated",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "error",
            "baseName": "error",
            "type": "string",
            "format": ""
        },
        {
            "name": "user",
            "baseName": "user",
            "type": "V1UserInfo",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1TokenReviewStatus.attributeTypeMap;
    }

    public constructor() {
    }
}
