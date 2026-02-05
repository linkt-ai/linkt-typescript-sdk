// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Schedule extends APIResource {
  /**
   * Create a new schedule.
   *
   * The cron expression must be a daily, weekly, or monthly pattern. For signal
   * tasks, the cron frequency must match the task's monitoring_frequency.
   *
   * @example
   * ```ts
   * const scheduleResponse = await client.schedule.create({
   *   cron_expression: 'cron_expression',
   *   icp_id: '5eb7cf5a86d9755df3a6c593',
   *   name: 'x',
   *   task_id: '5eb7cf5a86d9755df3a6c593',
   * });
   * ```
   */
  create(body: ScheduleCreateParams, options?: RequestOptions): APIPromise<ScheduleResponse> {
    return this._client.post('/v1/schedule', { body, ...options });
  }

  /**
   * Get a specific schedule by ID.
   *
   * @example
   * ```ts
   * const scheduleResponse = await client.schedule.retrieve(
   *   '5eb7cf5a86d9755df3a6c593',
   * );
   * ```
   */
  retrieve(scheduleID: string, options?: RequestOptions): APIPromise<ScheduleResponse> {
    return this._client.get(path`/v1/schedule/${scheduleID}`, options);
  }

  /**
   * Update a schedule.
   *
   * Only provided fields will be updated. The cron expression is validated for
   * frequency restrictions.
   *
   * @example
   * ```ts
   * const scheduleResponse = await client.schedule.update(
   *   '5eb7cf5a86d9755df3a6c593',
   * );
   * ```
   */
  update(
    scheduleID: string,
    body: ScheduleUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ScheduleResponse> {
    return this._client.patch(path`/v1/schedule/${scheduleID}`, { body, ...options });
  }

  /**
   * List schedules with pagination and optional filters.
   *
   * @example
   * ```ts
   * const scheduleListResponse = await client.schedule.list();
   * ```
   */
  list(
    query: ScheduleListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ScheduleListResponse> {
    return this._client.get('/v1/schedule', { query, ...options });
  }

  /**
   * Delete a schedule.
   *
   * @example
   * ```ts
   * await client.schedule.delete('5eb7cf5a86d9755df3a6c593');
   * ```
   */
  delete(scheduleID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/schedule/${scheduleID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Request model for creating a new schedule.
 *
 * Attributes: name: Human-readable name for the schedule. task_id: ID of the task
 * to execute. icp_id: ID of the ICP context for execution. cron_expression: 5-part
 * cron expression (must be daily/weekly/monthly). description: Optional
 * description. parameters: Optional execution parameters.
 */
export interface CreateScheduleRequest {
  /**
   * Cron expression (5 parts: minute hour day month day_of_week). Must be daily,
   * weekly, or monthly.
   */
  cron_expression: string;

  /**
   * ICP context for execution
   */
  icp_id: string;

  /**
   * Schedule name
   */
  name: string;

  /**
   * Task to execute
   */
  task_id: string;

  /**
   * Schedule description
   */
  description?: string | null;

  /**
   * Execution parameters
   */
  parameters?: { [key: string]: unknown };
}

/**
 * Response model for paginated schedule list.
 *
 * Attributes: schedules: List of schedules. total: Total number of schedules
 * matching filters. page: Current page number (1-based). page_size: Number of
 * items per page.
 */
export interface ScheduleListResponse {
  /**
   * Current page number (1-based)
   */
  page: number;

  /**
   * Number of items per page
   */
  page_size: number;

  /**
   * List of schedules
   */
  schedules: Array<ScheduleResponse>;

  /**
   * Total number of schedules matching filters
   */
  total: number;
}

/**
 * Response model for schedule data.
 *
 * Attributes: id: Schedule ID. name: Schedule name. task_id: Task ID. icp_id: ICP
 * ID. cron_expression: Cron expression. status: Schedule status. description:
 * Optional description. parameters: Execution parameters. created_at: Creation
 * timestamp. updated_at: Last update timestamp.
 */
export interface ScheduleResponse {
  /**
   * Schedule ID
   */
  id: string;

  /**
   * Creation timestamp
   */
  created_at: string;

  /**
   * Cron expression
   */
  cron_expression: string;

  /**
   * ICP ID
   */
  icp_id: string;

  /**
   * Schedule name
   */
  name: string;

  /**
   * Schedule status
   */
  status: string;

  /**
   * Task ID
   */
  task_id: string;

  /**
   * Last update timestamp
   */
  updated_at: string;

  /**
   * Description
   */
  description?: string | null;

  /**
   * Execution parameters
   */
  parameters?: { [key: string]: unknown };
}

/**
 * Request model for updating a schedule.
 *
 * At least one field must be provided.
 *
 * Attributes: name: Updated schedule name. description: Updated description.
 * cron_expression: Updated cron expression (validated for frequency). parameters:
 * Updated execution parameters. status: Updated schedule status.
 */
export interface UpdateScheduleRequest {
  /**
   * Updated cron expression
   */
  cron_expression?: string | null;

  /**
   * Updated description
   */
  description?: string | null;

  /**
   * Updated schedule name
   */
  name?: string | null;

  /**
   * Updated execution parameters
   */
  parameters?: { [key: string]: unknown } | null;

  /**
   * Schedule status values.
   *
   * ACTIVE: Schedule is eligible for execution PAUSED: Temporarily suspended but can
   * be resumed DISABLED: Permanently disabled (requires manual intervention)
   */
  status?: 'active' | 'paused' | 'disabled' | null;
}

export interface ScheduleCreateParams {
  /**
   * Cron expression (5 parts: minute hour day month day_of_week). Must be daily,
   * weekly, or monthly.
   */
  cron_expression: string;

  /**
   * ICP context for execution
   */
  icp_id: string;

  /**
   * Schedule name
   */
  name: string;

  /**
   * Task to execute
   */
  task_id: string;

  /**
   * Schedule description
   */
  description?: string | null;

  /**
   * Execution parameters
   */
  parameters?: { [key: string]: unknown };
}

export interface ScheduleUpdateParams {
  /**
   * Updated cron expression
   */
  cron_expression?: string | null;

  /**
   * Updated description
   */
  description?: string | null;

  /**
   * Updated schedule name
   */
  name?: string | null;

  /**
   * Updated execution parameters
   */
  parameters?: { [key: string]: unknown } | null;

  /**
   * Schedule status values.
   *
   * ACTIVE: Schedule is eligible for execution PAUSED: Temporarily suspended but can
   * be resumed DISABLED: Permanently disabled (requires manual intervention)
   */
  status?: 'active' | 'paused' | 'disabled' | null;
}

export interface ScheduleListParams {
  /**
   * Filter by ICP
   */
  icp_id?: string | null;

  /**
   * Sort order: -1 descending, 1 ascending
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
   * Field to sort by (e.g., 'created_at')
   */
  sort_by?: string | null;

  /**
   * Schedule status values.
   *
   * ACTIVE: Schedule is eligible for execution PAUSED: Temporarily suspended but can
   * be resumed DISABLED: Permanently disabled (requires manual intervention)
   */
  status?: 'active' | 'paused' | 'disabled' | null;

  /**
   * Filter by task
   */
  task_id?: string | null;
}

export declare namespace Schedule {
  export {
    type CreateScheduleRequest as CreateScheduleRequest,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleResponse as ScheduleResponse,
    type UpdateScheduleRequest as UpdateScheduleRequest,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleUpdateParams as ScheduleUpdateParams,
    type ScheduleListParams as ScheduleListParams,
  };
}
