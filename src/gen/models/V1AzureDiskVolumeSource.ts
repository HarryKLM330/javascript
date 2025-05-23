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
* AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
*/
export class V1AzureDiskVolumeSource {
    /**
    * cachingMode is the Host Caching mode: None, Read Only, Read Write.
    */
    'cachingMode'?: string;
    /**
    * diskName is the Name of the data disk in the blob storage
    */
    'diskName': string;
    /**
    * diskURI is the URI of data disk in the blob storage
    */
    'diskURI': string;
    /**
    * fsType is Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. \"ext4\", \"xfs\", \"ntfs\". Implicitly inferred to be \"ext4\" if unspecified.
    */
    'fsType'?: string;
    /**
    * kind expected values are Shared: multiple blob disks per storage account  Dedicated: single blob disk per storage account  Managed: azure managed data disk (only in managed availability set). defaults to shared
    */
    'kind'?: string;
    /**
    * readOnly Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
    */
    'readOnly'?: boolean;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "cachingMode",
            "baseName": "cachingMode",
            "type": "string",
            "format": ""
        },
        {
            "name": "diskName",
            "baseName": "diskName",
            "type": "string",
            "format": ""
        },
        {
            "name": "diskURI",
            "baseName": "diskURI",
            "type": "string",
            "format": ""
        },
        {
            "name": "fsType",
            "baseName": "fsType",
            "type": "string",
            "format": ""
        },
        {
            "name": "kind",
            "baseName": "kind",
            "type": "string",
            "format": ""
        },
        {
            "name": "readOnly",
            "baseName": "readOnly",
            "type": "boolean",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return V1AzureDiskVolumeSource.attributeTypeMap;
    }

    public constructor() {
    }
}
