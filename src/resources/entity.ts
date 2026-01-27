// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SheetAPI from './sheet/sheet';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Entity extends APIResource {
  /**
   * Get a single entity by ID with enrichment.
   *
   * Returns the entity with sheet_name, entity_type, icp_id, and duplicate_info
   * populated. duplicate_info is null if the entity has no duplicates across ICPs.
   */
  retrieve(entityID: string, options?: RequestOptions): APIPromise<EntityResponse> {
    return this._client.get(path`/v1/entity/${entityID}`, options);
  }

  /**
   * Update entity status or comments with optional propagation.
   *
   * Only status and comments can be updated via this endpoint. Use status=null to
   * clear status, comments=null to clear comments.
   *
   * Status must be one of: new, reviewed, passed, contacted, or null.
   *
   * Propagation flags control cascading updates:
   *
   * - propagate_to_family: Update parent/child entities (default: True)
   * - propagate_to_duplicates: Update duplicate entities across ICPs (default: True)
   */
  update(entityID: string, body: EntityUpdateParams, options?: RequestOptions): APIPromise<EntityResponse> {
    return this._client.put(path`/v1/entity/${entityID}`, { body, ...options });
  }

  /**
   * Get paginated list of entities with filtering.
   *
   * Supports filtering by:
   *
   * - icp_id: Entities in sheets belonging to an ICP
   * - sheet_id: Entities in a specific sheet
   * - entity_type: Entities of a specific type (company, person, etc.)
   * - status: Filter by workflow status (supports multiple:
   *   ?status=new&status=reviewed) Valid values: new, reviewed, passed, contacted,
   *   null
   * - hide_duplicates: When true, only show primary entities (filter out duplicates)
   *
   * All results include enrichment fields for UI annotations.
   */
  list(
    query: EntityListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EntityListResponse> {
    return this._client.get('/v1/entity', { query, ...options });
  }

  /**
   * Delete an entity by ID.
   *
   * This is a hard delete - the entity will be permanently removed.
   */
  delete(entityID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/entity/${entityID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Update status for multiple entities at once with optional propagation.
   *
   * Accepts a list of entity IDs and a status value. The status can be:
   *
   * - "new", "reviewed", "passed", "contacted" (valid workflow statuses)
   * - null (to clear the status)
   *
   * Returns the count of successfully updated entities and any failed IDs. Entities
   * may fail to update if they have an invalid ID format or don't exist.
   *
   * Propagation flags control cascading updates:
   *
   * - propagate_to_family: Update parent/child of each entity (default: True)
   * - propagate_to_duplicates: Update duplicate entities across ICPs (default: True)
   *
   * WHY: Bulk operations enable users to update status for many entities at once
   * (e.g., mark all search results as "reviewed"), improving workflow efficiency
   * versus N individual PUT calls.
   */
  bulkUpdateStatus(
    body: EntityBulkUpdateStatusParams,
    options?: RequestOptions,
  ): APIPromise<EntityBulkUpdateStatusResponse> {
    return this._client.patch('/v1/entity/status/bulk', { body, ...options });
  }

  /**
   * Export entities as CSV.
   *
   * Supports two formats:
   *
   * **separate** (default):
   *
   * - One row per entity
   * - Standard flat export
   * - All entity types exported independently
   *
   * **combined**:
   *
   * - Pre-joined parent-child rows
   * - Requires icp_id parameter
   * - Child entity columns appear first, followed by parent columns
   * - Columns prefixed with entity type (e.g., "Person Name", "Company Industry")
   * - Parent data repeats for each child (one row per child)
   * - Orphan parents (no children) appear as rows with empty child columns
   *
   * **Excluded Fields** (both formats):
   *
   * - id, sheet_id, parent_id, icp_id, entity_type, sheet_name, comments
   *
   * **Included Fields**:
   *
   * - All data.\* fields (the actual enrichment data)
   * - status, created_at, updated_at
   *
   * **Filtering**:
   *
   * - status: Filter by workflow status (supports multiple:
   *   ?status=new&status=contacted) Valid values: new, reviewed, passed, contacted,
   *   null
   *
   * Args: icp_id: Filter by ICP ID (REQUIRED for format=combined) sheet_id: Filter
   * by sheet ID entity_type: Filter by entity type (ignored for format=combined)
   * entity_ids: Export specific entity IDs status: Filter by status values (multiple
   * allowed) format: Export format - "separate" (default) or "combined"
   *
   * Returns: StreamingResponse with CSV content
   *
   * Raises: HTTPException 400: format=combined without icp_id, or invalid status
   * value HTTPException 404: ICP, sheet, or entities not found
   */
  export(query: EntityExportParams | null | undefined = {}, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/entity/export', { query, ...options });
  }

  /**
   * Get entity counts grouped by entity_type.
   *
   * Returns the count of entities for each entity_type (company, person, etc.)
   * across the organization. Supports optional filtering by ICP or status.
   *
   * Additional filtering:
   *
   * - status: Filter by workflow status (supports multiple:
   *   ?status=new&status=reviewed) Valid values: new, reviewed, passed, contacted,
   *   null
   *
   * Used by Entity Master List for accurate tab navigation counts.
   */
  getCounts(
    query: EntityGetCountsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EntityGetCountsResponse> {
    return this._client.get('/v1/entity/counts', { query, ...options });
  }

  /**
   * Search entities by text query.
   *
   * Uses MongoDB Atlas Search for fuzzy text matching on entity names and company
   * fields. Results are sorted by relevance.
   *
   * Scope of search determined by filters:
   *
   * - sheet_id: Search within specific sheet
   * - icp_id: Search across ICP sheets
   * - No filters: Search org-wide
   *
   * Additional filtering:
   *
   * - status: Filter by workflow status (supports multiple:
   *   ?status=new&status=reviewed) Valid values: new, reviewed, passed, contacted,
   *   null
   * - hide_duplicates: When true, only show primary entities
   */
  search(query: EntitySearchParams, options?: RequestOptions): APIPromise<EntitySearchResponse> {
    return this._client.get('/v1/entity/search', { query, ...options });
  }
}

/**
 * Response model for single entity.
 *
 * IMPORTANT: Enrichment fields (sheet_name, entity_type, icp_id) are ALWAYS
 * populated to support UI annotations. Excludes embedding data for HTTP
 * efficiency.
 */
export interface EntityResponse {
  /**
   * Entity ID
   */
  id: string;

  /**
   * Creation timestamp
   */
  created_at: string;

  /**
   * Entity attribute data
   */
  data: { [key: string]: unknown };

  /**
   * Entity type (company, person, etc.)
   */
  entity_type: string;

  /**
   * ICP ID (via sheet)
   */
  icp_id: string;

  /**
   * Sheet this entity belongs to
   */
  sheet_id: string;

  /**
   * Name of parent sheet
   */
  sheet_name: string;

  /**
   * Last update timestamp
   */
  updated_at: string;

  /**
   * User comments
   */
  comments?: string | null;

  /**
   * Duplicate status information for an entity.
   *
   * Indicates whether an entity is part of a duplicate group and its role:
   *
   * - Primary entities: is_primary=True, has duplicate_entity_ids and duplicate_icps
   * - Duplicate entities: is_duplicate=True, has primary_entity_id and
   *   primary_icp_name
   *
   * For entities that have no duplicates, this field will be None/null in the
   * EntityResponse.
   */
  duplicate_info?: EntityResponse.DuplicateInfo | null;

  /**
   * Parent entity ID (for hierarchical entities)
   */
  parent_id?: string | null;

  /**
   * Status values for entity workflow tracking.
   *
   * Transitions are user-driven (not automatic state machine):
   *
   * - new: Default for all newly created entities
   * - reviewed: User has examined the entity
   * - passed: Entity has been approved/qualified
   * - contacted: Outreach has been initiated
   */
  status?: 'new' | 'reviewed' | 'passed' | 'contacted' | null;
}

export namespace EntityResponse {
  /**
   * Duplicate status information for an entity.
   *
   * Indicates whether an entity is part of a duplicate group and its role:
   *
   * - Primary entities: is_primary=True, has duplicate_entity_ids and duplicate_icps
   * - Duplicate entities: is_duplicate=True, has primary_entity_id and
   *   primary_icp_name
   *
   * For entities that have no duplicates, this field will be None/null in the
   * EntityResponse.
   */
  export interface DuplicateInfo {
    /**
     * Whether this entity is a duplicate (not the primary)
     */
    is_duplicate: boolean;

    /**
     * Whether this entity is the primary in a duplicate group
     */
    is_primary: boolean;

    /**
     * Number of duplicate entities (primary only)
     */
    duplicate_count?: number | null;

    /**
     * IDs of duplicate entities (primary only)
     */
    duplicate_entity_ids?: Array<string> | null;

    /**
     * ICPs containing duplicates (primary only)
     */
    duplicate_icps?: Array<DuplicateInfo.DuplicateIcp> | null;

    /**
     * ID of the primary entity (duplicate only)
     */
    primary_entity_id?: string | null;

    /**
     * ICP name of the primary entity (duplicate only)
     */
    primary_icp_name?: string | null;
  }

  export namespace DuplicateInfo {
    /**
     * Info about an ICP containing a duplicate entity.
     *
     * Used in DuplicateInfo to show which ICPs contain duplicate instances of the same
     * entity.
     */
    export interface DuplicateIcp {
      /**
       * ICP ID
       */
      icp_id: string;

      /**
       * ICP name
       */
      icp_name: string;
    }
  }
}

/**
 * Paginated list response for entities.
 *
 * All entities include enrichment fields (sheet_name, entity_type, icp_id) to
 * support UI annotations without additional API calls.
 */
export interface EntityListResponse {
  entities: Array<EntityResponse>;

  /**
   * Current page (1-based)
   */
  page: number;

  /**
   * Items per page
   */
  page_size: number;

  /**
   * Total matching entities (before pagination)
   */
  total: number;
}

/**
 * Response for bulk status update operation.
 *
 * WHY: Reports both success count and specific failures so the client knows
 * exactly which entities were updated and which failed.
 */
export interface EntityBulkUpdateStatusResponse {
  /**
   * Number of entities successfully updated
   */
  updated_count: number;

  /**
   * Entity IDs that failed to update (invalid format or not found)
   */
  failed_ids?: Array<string>;
}

export type EntityExportResponse = unknown;

/**
 * Response model for entity counts by type.
 *
 * Returns counts grouped by entity_type with an aggregate total. Used by Entity
 * Master List for tab navigation counts.
 */
export interface EntityGetCountsResponse {
  /**
   * Sum of all entity counts
   */
  total: number;

  /**
   * Entity counts keyed by entity_type (company, person, etc.)
   */
  counts?: { [key: string]: number };
}

/**
 * Search response with pagination.
 *
 * All entities include enrichment fields for UI annotations.
 */
export interface EntitySearchResponse {
  entities: Array<EntityResponse>;

  /**
   * Current page (1-based)
   */
  page: number;

  /**
   * Items per page
   */
  page_size: number;

  /**
   * Original search query
   */
  query: string;

  /**
   * Total matching entities
   */
  total: number;
}

export interface EntityUpdateParams {
  /**
   * Update comments (null to clear)
   */
  comments?: string | null;

  /**
   * Reflect updates to duplicate entities across ICPs (default: True)
   */
  propagate_to_duplicates?: boolean;

  /**
   * Reflect updates to parent/child entities (default: True)
   */
  propagate_to_family?: boolean;

  /**
   * Status values for entity workflow tracking.
   *
   * Transitions are user-driven (not automatic state machine):
   *
   * - new: Default for all newly created entities
   * - reviewed: User has examined the entity
   * - passed: Entity has been approved/qualified
   * - contacted: Outreach has been initiated
   */
  status?: 'new' | 'reviewed' | 'passed' | 'contacted' | null;
}

export interface EntityListParams {
  /**
   * Valid entity types for sheets.
   */
  entity_type?: SheetAPI.EntityType | null;

  /**
   * Hide duplicate entities (show only primaries)
   */
  hide_duplicates?: boolean;

  /**
   * Filter by ICP ID
   */
  icp_id?: string | null;

  /**
   * Page number (1-based)
   */
  page?: number;

  /**
   * Items per page
   */
  page_size?: number;

  /**
   * Filter by sheet ID
   */
  sheet_id?: string | null;

  /**
   * Filter by status values (supports multiple: ?status=new&status=reviewed)
   */
  status?: Array<string> | null;
}

export interface EntityBulkUpdateStatusParams {
  /**
   * List of entity IDs to update (1-1000 IDs)
   */
  entity_ids: Array<string>;

  /**
   * New status value: new, reviewed, passed, contacted, or null to clear
   */
  status: string | null;

  /**
   * Reflect status to duplicate entities across ICPs (default: True)
   */
  propagate_to_duplicates?: boolean;

  /**
   * Reflect status to parent/child of each entity (default: True)
   */
  propagate_to_family?: boolean;
}

export interface EntityExportParams {
  /**
   * Specific entity IDs
   */
  entity_ids?: Array<string> | null;

  /**
   * Valid entity types for sheets.
   */
  entity_type?: SheetAPI.EntityType | null;

  /**
   * Export format: 'separate' (default) or 'combined' (joined parent-child rows)
   */
  format?: 'separate' | 'combined';

  /**
   * Filter by ICP ID
   */
  icp_id?: string | null;

  /**
   * Filter by sheet ID
   */
  sheet_id?: string | null;

  /**
   * Filter by status values (supports multiple: ?status=new&status=contacted)
   */
  status?: Array<string> | null;
}

export interface EntityGetCountsParams {
  /**
   * Filter by ICP ID
   */
  icp_id?: string | null;

  /**
   * Filter by status values (supports multiple: ?status=new&status=passed)
   */
  status?: Array<string> | null;
}

export interface EntitySearchParams {
  /**
   * Search query
   */
  q: string;

  /**
   * Valid entity types for sheets.
   */
  entity_type?: SheetAPI.EntityType | null;

  /**
   * Hide duplicate entities (show only primaries)
   */
  hide_duplicates?: boolean;

  /**
   * Filter by ICP ID
   */
  icp_id?: string | null;

  /**
   * Page number
   */
  page?: number;

  /**
   * Items per page
   */
  page_size?: number;

  /**
   * Filter by sheet ID
   */
  sheet_id?: string | null;

  /**
   * Filter by status values (supports multiple: ?status=new&status=reviewed)
   */
  status?: Array<string> | null;
}

export declare namespace Entity {
  export {
    type EntityResponse as EntityResponse,
    type EntityListResponse as EntityListResponse,
    type EntityBulkUpdateStatusResponse as EntityBulkUpdateStatusResponse,
    type EntityExportResponse as EntityExportResponse,
    type EntityGetCountsResponse as EntityGetCountsResponse,
    type EntitySearchResponse as EntitySearchResponse,
    type EntityUpdateParams as EntityUpdateParams,
    type EntityListParams as EntityListParams,
    type EntityBulkUpdateStatusParams as EntityBulkUpdateStatusParams,
    type EntityExportParams as EntityExportParams,
    type EntityGetCountsParams as EntityGetCountsParams,
    type EntitySearchParams as EntitySearchParams,
  };
}
