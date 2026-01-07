// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Schema extends APIResource {
  /**
   * Add custom fields to a sheet's entity schema.
   *
   * Custom fields extend the default schema to capture additional data points for
   * entities in this sheet.
   */
  addFields(sheetID: string, body: SchemaAddFieldsParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/v1/sheet/schema/${sheetID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Remove custom fields from a sheet's entity schema.
   *
   * Only custom fields can be removed; default fields cannot be deleted. Existing
   * entity data in removed fields remains in the database but becomes inaccessible.
   */
  deleteFields(sheetID: string, body: SchemaDeleteFieldsParams, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/sheet/schema/${sheetID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get the schema for a specific sheet.
   *
   * Returns the sheet's current schema including default fields and any custom
   * fields that have been added.
   */
  get(sheetID: string, options?: RequestOptions): APIPromise<SchemaGetResponse> {
    return this._client.get(path`/v1/sheet/schema/${sheetID}`, options);
  }

  /**
   * Get the default schemas for all entity types.
   *
   * Returns JSON Schema definitions for company, person, job_board, and
   * school_district entity types. Use this to understand the standard fields
   * available before adding custom fields.
   */
  getDefault(options?: RequestOptions): APIPromise<SchemaGetDefaultResponse> {
    return this._client.get('/v1/sheet/schema/default', options);
  }

  /**
   * Get the available field type definitions.
   *
   * Returns JSON Schema definitions for field types that can be used when adding
   * custom fields to sheets.
   */
  getFieldDefinitions(options?: RequestOptions): APIPromise<SchemaGetFieldDefinitionsResponse> {
    return this._client.get('/v1/sheet/schema/field', options);
  }
}

/**
 * JSON schema for the sheet.
 */
export interface SchemaGetResponse {
  /**
   * The title of the schema
   */
  title: string;

  /**
   * The type of the schema
   */
  type: string;

  /**
   * Definitions for nested schemas
   */
  $defs?: { [key: string]: unknown };

  /**
   * The properties of the schema
   */
  properties?: { [key: string]: unknown };

  /**
   * Required fields in the schema
   */
  required?: Array<string>;
}

/**
 * List of default schemas for sheets.
 */
export interface SchemaGetDefaultResponse {
  schemas: { [key: string]: SchemaGetDefaultResponse.Schemas };
}

export namespace SchemaGetDefaultResponse {
  /**
   * JSON schema for the sheet.
   */
  export interface Schemas {
    /**
     * The title of the schema
     */
    title: string;

    /**
     * The type of the schema
     */
    type: string;

    /**
     * Definitions for nested schemas
     */
    $defs?: { [key: string]: unknown };

    /**
     * The properties of the schema
     */
    properties?: { [key: string]: unknown };

    /**
     * Required fields in the schema
     */
    required?: Array<string>;
  }
}

/**
 * List of default field definitions for sheets.
 */
export interface SchemaGetFieldDefinitionsResponse {
  fields: { [key: string]: SchemaGetFieldDefinitionsResponse.Fields };
}

export namespace SchemaGetFieldDefinitionsResponse {
  /**
   * JSON schema for the sheet.
   */
  export interface Fields {
    /**
     * The title of the schema
     */
    title: string;

    /**
     * The type of the schema
     */
    type: string;

    /**
     * Definitions for nested schemas
     */
    $defs?: { [key: string]: unknown };

    /**
     * The properties of the schema
     */
    properties?: { [key: string]: unknown };

    /**
     * Required fields in the schema
     */
    required?: Array<string>;
  }
}

export interface SchemaAddFieldsParams {
  fields: Array<SchemaAddFieldsParams.Field>;
}

export namespace SchemaAddFieldsParams {
  /**
   * Definition for a custom field in a sheet.
   */
  export interface Field {
    /**
     * Field type
     */
    field_type: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'reference' | 'enum';

    /**
     * Field name
     */
    name: string;

    /**
     * Additional JSON schema properties
     */
    additional_props?: { [key: string]: unknown };

    /**
     * Schema for array items when field_type is ARRAY
     */
    array_items?: { [key: string]: unknown } | null;

    /**
     * Field description
     */
    description?: string;

    /**
     * List of allowed values when field_type is ENUM
     */
    enum_values?: Array<unknown> | null;

    /**
     * Properties for object fields when field_type is OBJECT
     */
    properties?: { [key: string]: unknown } | null;

    /**
     * Referenced model name when field_type is REFERENCE
     */
    reference_model?: string | null;

    /**
     * Whether field is required - always false for custom fields
     */
    required?: boolean;
  }
}

export interface SchemaDeleteFieldsParams {
  fields: Array<string>;
}

export declare namespace Schema {
  export {
    type SchemaGetResponse as SchemaGetResponse,
    type SchemaGetDefaultResponse as SchemaGetDefaultResponse,
    type SchemaGetFieldDefinitionsResponse as SchemaGetFieldDefinitionsResponse,
    type SchemaAddFieldsParams as SchemaAddFieldsParams,
    type SchemaDeleteFieldsParams as SchemaDeleteFieldsParams,
  };
}
