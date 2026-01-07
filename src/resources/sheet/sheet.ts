// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as EntityAPI from './entity';
import {
  Entity,
  EntityRetrieveParams,
  EntityRetrieveResponse,
  EntityUpdateCommentsParams,
  EntityUpdateStatusParams,
} from './entity';
import * as SchemaAPI from './schema';
import {
  Schema,
  SchemaAddFieldsParams,
  SchemaDeleteFieldsParams,
  SchemaGetDefaultResponse,
  SchemaGetFieldDefinitionsResponse,
  SchemaGetResponse,
} from './schema';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class SheetResource extends APIResource {
  entity: EntityAPI.Entity = new EntityAPI.Entity(this._client);
  schema: SchemaAPI.Schema = new SchemaAPI.Schema(this._client);

  /**
   * Create a new sheet linked to an ICP.
   *
   * Sheets hold entities of a single type (company or person) and must reference an
   * ICP. The entity type must match one of the ICP's configured entity targets.
   */
  create(body: SheetCreateParams, options?: RequestOptions): APIPromise<Sheet> {
    return this._client.post('/v1/sheet', { body, ...options });
  }

  /**
   * Get a specific sheet by ID.
   */
  retrieve(sheetID: string, options?: RequestOptions): APIPromise<Sheet> {
    return this._client.get(path`/v1/sheet/${sheetID}`, options);
  }

  /**
   * Update an existing sheet.
   *
   * Only provided fields will be updated; omitted fields remain unchanged. The ICP
   * reference and entity_type cannot be changed after creation.
   */
  update(sheetID: string, body: SheetUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/v1/sheet/${sheetID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * List all sheets for the organization.
   *
   * Filter by ICP to see sheets for a specific targeting profile, or by entity type
   * to see all company or person sheets.
   */
  list(
    query: SheetListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SheetListResponse> {
    return this._client.get('/v1/sheet', { query, ...options });
  }

  /**
   * Delete a sheet and all its entities.
   *
   * **Cascade delete**: This permanently removes the sheet and all entities within
   * it. This operation cannot be undone.
   */
  delete(sheetID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/sheet/${sheetID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Export sheet entities as a CSV file.
   *
   * Exports entities with proper field formatting based on the sheet's schema. Pass
   * specific entity_ids to export a subset, or omit to export all entities.
   */
  exportCsv(
    sheetID: string,
    query: SheetExportCsvParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get(path`/v1/sheet/${sheetID}/export-csv`, { query, ...options });
  }

  /**
   * List all entities in a sheet.
   *
   * Supports text search across name/company fields and comprehensive filtering by
   * status, comments, and date ranges.
   */
  getEntities(
    sheetID: string,
    query: SheetGetEntitiesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SheetGetEntitiesResponse> {
    return this._client.get(path`/v1/sheet/${sheetID}/entities`, { query, ...options });
  }
}

/**
 * Valid entity types for sheets.
 */
export type EntityType = 'company' | 'person' | 'job_board' | 'school_district' | 'product';

/**
 * Response model for sheet.
 */
export interface Sheet {
  id: string;

  created_at: string;

  description: string;

  entity_schema: { [key: string]: unknown };

  icp_id: string;

  name: string;

  updated_at: string;

  entity_type?: string | null;
}

/**
 * Response model for sheet list.
 */
export interface SheetListResponse {
  page: number;

  page_size: number;

  sheets: Array<{ [key: string]: unknown }>;

  total: number;
}

export type SheetExportCsvResponse = unknown;

/**
 * Response schema for paginated list of sheet entities.
 *
 * Uses EntityForHTTP which automatically excludes embedding data for efficient API
 * responses.
 *
 * Attributes: entities: List of EntityForHTTP objects for the current page total:
 * Total number of entities matching the filter criteria page: Current page number
 * (1-based) page_size: Number of items per page
 */
export interface SheetGetEntitiesResponse {
  entities: Array<{ [key: string]: unknown }>;

  page: number;

  page_size: number;

  total: number;
}

export interface SheetCreateParams {
  description: string;

  /**
   * Type of entities to store
   */
  entity_type: EntityType;

  /**
   * ICP this sheet belongs to
   */
  icp_id: string;

  name: string;
}

export interface SheetUpdateParams {
  description?: string | null;

  icp_id?: string | null;

  name?: string | null;
}

export interface SheetListParams {
  entity_type?: string | null;

  icp_id?: string | null;

  /**
   * Sort order: -1 for descending, 1 for ascending
   */
  order?: number | null;

  page?: number;

  page_size?: number;

  /**
   * Field to sort by (e.g., 'created_at', 'updated_at', 'name')
   */
  sort_by?: string | null;
}

export interface SheetExportCsvParams {
  /**
   * Optional list of entity IDs to export. If not provided, exports all entities.
   */
  entity_ids?: Array<string> | null;
}

export interface SheetGetEntitiesParams {
  /**
   * Filter entities created after this date (ISO 8601 format: 2024-01-15T10:30:00Z)
   */
  created_after?: string | null;

  /**
   * Filter entities created before this date (ISO 8601 format)
   */
  created_before?: string | null;

  /**
   * Filter entities with or without user comments
   */
  has_comments?: boolean | null;

  /**
   * Sort order: -1 for descending, 1 for ascending
   */
  order?: number | null;

  /**
   * Page number (1-based)
   */
  page?: number;

  /**
   * Items per page (max 100, default 50)
   */
  page_size?: number;

  /**
   * Search entities by name or company
   */
  search?: string | null;

  /**
   * Field to sort by (e.g., 'created_at', 'updated_at', 'status')
   */
  sort_by?: string | null;

  /**
   * Filter by entity status (true=active, false=inactive)
   */
  status?: boolean | null;

  /**
   * Filter entities updated after this date (ISO 8601 format)
   */
  updated_after?: string | null;

  /**
   * Filter entities updated before this date (ISO 8601 format)
   */
  updated_before?: string | null;
}

SheetResource.Entity = Entity;
SheetResource.Schema = Schema;

export declare namespace SheetResource {
  export {
    type EntityType as EntityType,
    type Sheet as Sheet,
    type SheetListResponse as SheetListResponse,
    type SheetExportCsvResponse as SheetExportCsvResponse,
    type SheetGetEntitiesResponse as SheetGetEntitiesResponse,
    type SheetCreateParams as SheetCreateParams,
    type SheetUpdateParams as SheetUpdateParams,
    type SheetListParams as SheetListParams,
    type SheetExportCsvParams as SheetExportCsvParams,
    type SheetGetEntitiesParams as SheetGetEntitiesParams,
  };

  export {
    Entity as Entity,
    type EntityRetrieveResponse as EntityRetrieveResponse,
    type EntityRetrieveParams as EntityRetrieveParams,
    type EntityUpdateCommentsParams as EntityUpdateCommentsParams,
    type EntityUpdateStatusParams as EntityUpdateStatusParams,
  };

  export {
    Schema as Schema,
    type SchemaGetResponse as SchemaGetResponse,
    type SchemaGetDefaultResponse as SchemaGetDefaultResponse,
    type SchemaGetFieldDefinitionsResponse as SchemaGetFieldDefinitionsResponse,
    type SchemaAddFieldsParams as SchemaAddFieldsParams,
    type SchemaDeleteFieldsParams as SchemaDeleteFieldsParams,
  };
}
