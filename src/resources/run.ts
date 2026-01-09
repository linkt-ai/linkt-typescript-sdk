// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Run extends APIResource {
  /**
   * Execute an agent by creating a new run.
   *
   * Creates a new workflow execution asynchronously. Prefer using POST
   * /v1/task/{task_id}/execute for task-based workflows.
   *
   * @example
   * ```ts
   * const run = await client.run.create({
   *   agent_id: '5eb7cf5a86d9755df3a6c593',
   *   parameters: { foo: 'bar' },
   * });
   * ```
   */
  create(body: RunCreateParams, options?: RequestOptions): APIPromise<RunCreateResponse> {
    return this._client.post('/v1/run', { body, ...options });
  }

  /**
   * Get a specific run by ID.
   *
   * Automatically refreshes status from Prefect if the run is still active.
   *
   * @example
   * ```ts
   * const run = await client.run.retrieve(
   *   '5eb7cf5a86d9755df3a6c593',
   * );
   * ```
   */
  retrieve(runID: string, options?: RequestOptions): APIPromise<RunRetrieveResponse> {
    return this._client.get(path`/v1/run/${runID}`, options);
  }

  /**
   * List all runs for the organization.
   *
   * Runs are workflow executions created from tasks. Filter by status to find active
   * runs (RUNNING, PENDING) or completed ones (COMPLETED, FAILED).
   *
   * @example
   * ```ts
   * const runs = await client.run.list();
   * ```
   */
  list(query: RunListParams | null | undefined = {}, options?: RequestOptions): APIPromise<RunListResponse> {
    return this._client.get('/v1/run', { query, ...options });
  }

  /**
   * Delete a run.
   *
   * Permanently deletes the run record. This operation cannot be undone.
   *
   * @example
   * ```ts
   * await client.run.delete('5eb7cf5a86d9755df3a6c593');
   * ```
   */
  delete(runID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/run/${runID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Cancel a running workflow.
   *
   * Cancels both the Prefect flow and updates the database record. Only effective
   * for non-terminal runs.
   *
   * @example
   * ```ts
   * await client.run.cancel('5eb7cf5a86d9755df3a6c593');
   * ```
   */
  cancel(runID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/run/${runID}/cancel`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get the queue status for a run.
   *
   * Shows entities being processed by the workflow. States: queued (waiting),
   * processing (active), completed (done), discarded (skipped). Set
   * include_history=true to see all processed entities.
   *
   * @example
   * ```ts
   * const response = await client.run.getQueue(
   *   '5eb7cf5a86d9755df3a6c593',
   * );
   * ```
   */
  getQueue(
    runID: string,
    query: RunGetQueueParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<RunGetQueueResponse> {
    return this._client.get(path`/v1/run/${runID}/queue`, { query, ...options });
  }
}

export type RunCreateResponse = { [key: string]: unknown };

export type RunRetrieveResponse = { [key: string]: unknown };

/**
 * Response schema for paginated list of agent runs.
 *
 * Follows the established pattern from other list endpoints:
 *
 * - SheetListResponse (src/api/schema/sheet.py)
 * - ICPListResponse (src/api/schema/icp.py)
 *
 * Attributes: runs: List of AgentRun objects for the current page (metadata
 * excluded) total: Total number of runs matching the filter criteria page: Current
 * page number (1-based) page_size: Number of items per page
 */
export interface RunListResponse {
  page: number;

  page_size: number;

  runs: Array<{ [key: string]: unknown }>;

  total: number;
}

/**
 * Response schema for run queue status with optional history.
 *
 * Provides a read-only view into the current state of a run's entity queue,
 * including queued entities, processing history, and statistics.
 *
 * Attributes: entities: List of entities (current queue or full history based on
 * request) stats: Queue statistics or state counts total: Total number of entities
 * returned offset: Offset used for pagination (0-indexed) limit: Maximum number of
 * entities returned state_counts: Optional breakdown of entities by state
 * include_history: Whether response includes historical data
 */
export interface RunGetQueueResponse {
  entities: Array<{ [key: string]: unknown }>;

  limit: number;

  offset: number;

  stats: { [key: string]: unknown };

  total: number;

  include_history?: boolean;

  state_counts?: { [key: string]: number } | null;
}

export interface RunCreateParams {
  agent_id: string;

  parameters: { [key: string]: unknown };

  icp_id?: string | null;
}

export interface RunListParams {
  /**
   * Filter by agent ID (legacy)
   */
  agent_id?: string | null;

  /**
   * Filter by agent type
   */
  agent_type?: string | null;

  /**
   * Filter runs created after this date (ISO 8601 format: 2024-01-15T10:30:00Z)
   */
  created_after?: string | null;

  /**
   * Filter runs created before this date (ISO 8601 format)
   */
  created_before?: string | null;

  /**
   * Filter by ICP ID
   */
  icp_id?: string | null;

  /**
   * Sort order: -1 for descending, 1 for ascending
   */
  order?: number | null;

  /**
   * Page number (1-based)
   */
  page?: number;

  /**
   * Items per page (max 100)
   */
  page_size?: number;

  /**
   * Field to sort by (e.g., 'created_at', 'updated_at', 'agent_type')
   */
  sort_by?: string | null;

  /**
   * Filter by run status (SCHEDULED, PENDING, RUNNING, COMPLETED, FAILED, CANCELED,
   * CRASHED, PAUSED)
   */
  status?:
    | 'SCHEDULED'
    | 'PENDING'
    | 'RUNNING'
    | 'COMPLETED'
    | 'FAILED'
    | 'CANCELED'
    | 'CRASHED'
    | 'PAUSED'
    | null;

  /**
   * Filter by task ID
   */
  task_id?: string | null;

  /**
   * Filter by task type (signal, search, profile, ingest)
   */
  task_type?: string | null;

  /**
   * Filter runs updated after this date (ISO 8601 format)
   */
  updated_after?: string | null;

  /**
   * Filter runs updated before this date (ISO 8601 format)
   */
  updated_before?: string | null;
}

export interface RunGetQueueParams {
  /**
   * Include processing history from all states
   */
  include_history?: boolean;

  /**
   * Maximum number of entities to return
   */
  limit?: number;

  /**
   * Starting position in queue (0-indexed)
   */
  offset?: number;

  /**
   * Filter by state: queued, processing, completed, discarded
   */
  state?: string | null;
}

export declare namespace Run {
  export {
    type RunCreateResponse as RunCreateResponse,
    type RunRetrieveResponse as RunRetrieveResponse,
    type RunListResponse as RunListResponse,
    type RunGetQueueResponse as RunGetQueueResponse,
    type RunCreateParams as RunCreateParams,
    type RunListParams as RunListParams,
    type RunGetQueueParams as RunGetQueueParams,
  };
}
