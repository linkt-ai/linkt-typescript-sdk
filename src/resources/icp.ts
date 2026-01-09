// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Icp extends APIResource {
  /**
   * Create a new Ideal Customer Profile (ICP).
   *
   * ICPs are the foundation of your research workflows. They define WHAT entities to
   * target using business-level descriptions and filters, without specifying
   * technical implementation details.
   *
   * Create an ICP first, then link Sheets to it for entity storage.
   */
  create(body: IcpCreateParams, options?: RequestOptions): APIPromise<IcpResponse> {
    return this._client.post('/v1/icp', { body, ...options });
  }

  /**
   * Get a specific ICP by ID.
   */
  retrieve(icpID: string, options?: RequestOptions): APIPromise<IcpResponse> {
    return this._client.get(path`/v1/icp/${icpID}`, options);
  }

  /**
   * Update an existing ICP.
   *
   * Only provided fields will be updated; omitted fields remain unchanged.
   */
  update(icpID: string, body: IcpUpdateParams, options?: RequestOptions): APIPromise<IcpResponse> {
    return this._client.put(path`/v1/icp/${icpID}`, { body, ...options });
  }

  /**
   * List all ICPs for the organization.
   *
   * Results are scoped to your organization. Use the `mode` filter to separate
   * discovery ICPs (for finding new entities) from monitoring ICPs (for tracking
   * existing entities).
   */
  list(query: IcpListParams | null | undefined = {}, options?: RequestOptions): APIPromise<IcpListResponse> {
    return this._client.get('/v1/icp', { query, ...options });
  }

  /**
   * Delete an ICP and all related resources.
   *
   * **Cascade delete**: This permanently removes the ICP along with all associated
   * sheets, entities, schedules, tasks, and signals. This operation cannot be
   * undone.
   */
  delete(icpID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/icp/${icpID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get all active runs for an ICP.
   *
   * Returns runs in non-terminal states (RUNNING, SCHEDULED, PENDING). Useful for
   * checking if workflows are currently processing this ICP before making changes.
   */
  getActiveRuns(icpID: string, options?: RequestOptions): APIPromise<IcpGetActiveRunsResponse> {
    return this._client.get(path`/v1/icp/${icpID}/active_runs`, options);
  }
}

/**
 * Request model for entity target configuration.
 *
 * Synchronized with core.schema.mongo.icp.EntityTargetConfig to ensure all fields
 * available in the database model can be set via the API.
 *
 * Attributes: entity_type: The entity type to target (e.g., 'company', 'person').
 * description: Business description of what makes a good target. root: If True,
 * this is the root entity type of the search hierarchy. Only one entity target
 * should be marked as root. Defaults to False for backward compatibility with
 * existing API consumers. desired_count: For non-root entities, the desired number
 * of entities per parent (minimum: 1). Uses `ge=1` Field constraint which
 * generates `minimum: 1` in OpenAPI schema for SDK validation. If not specified,
 * defaults to system minimum (typically 2). filters: Optional list of filter
 * criteria to apply to the search.
 *
 * Note: The `root` and `desired_count` fields default to False and None
 * respectively, making them optional in API requests for backward compatibility
 * with existing integrations.
 */
export interface EntityTargetConfig {
  /**
   * Business description of targets
   */
  description: string;

  /**
   * Entity type to target (company, person, etc.)
   */
  entity_type: string;

  /**
   * For non-root entities, desired count per parent (minimum: 1). If not specified,
   * defaults to system minimum.
   */
  desired_count?: number | null;

  /**
   * Filters to apply
   */
  filters?: Array<string>;

  /**
   * If this is the root entity type of the search. Only one entity target should be
   * root.
   */
  root?: boolean;
}

/**
 * Response model for ICP.
 */
export interface IcpResponse {
  id: string;

  created_at: string;

  description: string;

  entity_targets: Array<IcpResponse.EntityTarget>;

  name: string;

  updated_at: string;
}

export namespace IcpResponse {
  /**
   * Response model for entity target configuration.
   *
   * Synchronized with core.schema.mongo.icp.EntityTargetConfig to return all
   * configuration fields stored in the database to API consumers.
   *
   * Attributes: root: If True, this is the root entity type of the search hierarchy.
   * entity_type: The entity type this config targets (e.g., 'company', 'person').
   * description: Business description of what makes a good target. desired_count:
   * For non-root entities, the desired number of entities per parent. Returns None
   * if not explicitly set in the ICP.
   *
   * Note: The `desired_count` field is included in responses to enable API consumers
   * to see the full configuration. When None, the system applies its default minimum
   * (typically 2).
   */
  export interface EntityTarget {
    /**
     * Business description of targets
     */
    description: string;

    /**
     * Entity type (company, person, etc.)
     */
    entity_type: string;

    /**
     * If this is the root entity type
     */
    root: boolean;

    /**
     * For non-root entities, desired count per parent
     */
    desired_count?: number | null;
  }
}

/**
 * Response for listing ICPs.
 */
export interface IcpListResponse {
  icps: Array<IcpResponse>;

  page: number;

  page_size: number;

  total: number;
}

/**
 * Response model for ICP running status.
 */
export interface IcpGetActiveRunsResponse {
  runs: Array<IcpGetActiveRunsResponse.Run>;
}

export namespace IcpGetActiveRunsResponse {
  /**
   * Individual run status item for API responses.
   *
   * Includes both agent_type (execution context) and task_type (workflow type)
   * fields to support filtering and display during the transition from legacy runs.
   *
   * Attributes: id: Unique run identifier (ObjectId as string) agent_type: HOW the
   * run was triggered ("task", "play") task_type: WHAT workflow runs ("signal",
   * "search", "profile", "ingest"). None for plays or legacy runs without this
   * field. created_at: When the run was created
   */
  export interface Run {
    /**
     * Run ID
     */
    id: string;

    /**
     * Execution context (task, play)
     */
    agent_type: string;

    /**
     * Creation timestamp
     */
    created_at?: string | null;

    /**
     * Workflow type for task-based runs (signal, search, profile, ingest)
     */
    task_type?: string | null;
  }
}

export interface IcpCreateParams {
  description: string;

  entity_targets: Array<EntityTargetConfig>;

  name: string;
}

export interface IcpUpdateParams {
  description?: string | null;

  entity_targets?: Array<EntityTargetConfig> | null;

  name?: string | null;
}

export interface IcpListParams {
  /**
   * Filter by ICP mode: 'discovery' or 'monitoring'
   */
  mode?: 'discovery' | 'monitoring' | null;

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

export declare namespace Icp {
  export {
    type EntityTargetConfig as EntityTargetConfig,
    type IcpResponse as IcpResponse,
    type IcpListResponse as IcpListResponse,
    type IcpGetActiveRunsResponse as IcpGetActiveRunsResponse,
    type IcpCreateParams as IcpCreateParams,
    type IcpUpdateParams as IcpUpdateParams,
    type IcpListParams as IcpListParams,
  };
}
