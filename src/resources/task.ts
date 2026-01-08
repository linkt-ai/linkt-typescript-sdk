// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TaskAPI from './task';
import * as SheetAPI from './sheet/sheet';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Task extends APIResource {
  /**
   * Create a new task template.
   *
   * Tasks define reusable workflow configurations that reference Prefect
   * deployments. Execute a task to create runs.
   *
   * @example
   * ```ts
   * const task = await client.task.create({
   *   deployment_name: 'deployment_name',
   *   description: 'description',
   *   flow_name: 'flow_name',
   *   name: 'x',
   * });
   * ```
   */
  create(body: TaskCreateParams, options?: RequestOptions): APIPromise<TaskCreateResponse> {
    return this._client.post('/v1/task', { body, ...options });
  }

  /**
   * Get a specific task by ID.
   *
   * @example
   * ```ts
   * const task = await client.task.retrieve(
   *   '5eb7cf5a86d9755df3a6c593',
   * );
   * ```
   */
  retrieve(taskID: string, options?: RequestOptions): APIPromise<TaskRetrieveResponse> {
    return this._client.get(path`/v1/task/${taskID}`, options);
  }

  /**
   * Update an existing task.
   *
   * Only provided fields will be updated; omitted fields remain unchanged. The
   * flow_name cannot be changed after creation.
   *
   * @example
   * ```ts
   * await client.task.update('5eb7cf5a86d9755df3a6c593');
   * ```
   */
  update(taskID: string, body: TaskUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/v1/task/${taskID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * List all tasks for the organization.
   *
   * Tasks are reusable workflow templates. Filter by flow_name to see specific
   * workflow types (search, ingest, signal).
   *
   * @example
   * ```ts
   * const tasks = await client.task.list();
   * ```
   */
  list(
    query: TaskListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TaskListResponse> {
    return this._client.get('/v1/task', { query, ...options });
  }

  /**
   * Delete a task.
   *
   * A task cannot be deleted if it has active (non-terminal) runs. This operation
   * cannot be undone.
   *
   * @example
   * ```ts
   * await client.task.delete('5eb7cf5a86d9755df3a6c593');
   * ```
   */
  delete(taskID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/task/${taskID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Execute a task by creating a new run.
   *
   * Creates a new workflow execution asynchronously and returns tracking information
   * immediately. Monitor the run status using the returned run_id.
   *
   * @example
   * ```ts
   * const response = await client.task.execute(
   *   '5eb7cf5a86d9755df3a6c593',
   * );
   * ```
   */
  execute(
    taskID: string,
    body: TaskExecuteParams,
    options?: RequestOptions,
  ): APIPromise<TaskExecuteResponse> {
    return this._client.post(path`/v1/task/${taskID}/execute`, { body, ...options });
  }
}

/**
 * Configuration for one-time CSV enrichment tasks.
 *
 * Used by ingest_csv workflows to enrich entities from uploaded CSV files. The
 * csv_entity_type tracks the entity type of rows IN THE CSV, which may differ from
 * the ICP hierarchy (e.g., CSV has people, but ICP has company→person).
 *
 * Attributes: file_id: Reference to uploaded CSV file in S3 (via File document)
 * primary_column: Column containing entity names for matching csv_entity_type:
 * Entity type of rows in CSV (may differ from ICP hierarchy)
 */
export interface IngestTaskConfig {
  /**
   * Entity type in the CSV (e.g., 'person', 'company')
   */
  csv_entity_type: string;

  /**
   * File ID referencing uploaded CSV in MongoDB
   */
  file_id: string;

  /**
   * Column containing entity names
   */
  primary_column: string;

  /**
   * Config type for ingest tasks
   */
  config_type?: 'ingest-task';

  version?: 'v1.0';

  /**
   * Optional webhook URL to notify when workflow run completes
   */
  webhook_url?: string | null;
}

/**
 * Search v2 dual-agent configuration.
 */
export interface SearchV2Config {
  /**
   * Jinja2 analyst agent instructions
   */
  analyst_prompt: string;

  /**
   * Jinja2 discovery agent instructions
   */
  discovery_prompt: string;

  /**
   * Config type (search-prompt for legacy, search-task for normalized)
   */
  config_type?: 'search-prompt' | 'search-task';

  version?: 'v2.0';

  /**
   * Optional webhook URL to notify when workflow run completes
   */
  webhook_url?: string | null;
}

/**
 * Search v3.0 configuration with planning-driven approach.
 *
 * Key differences from v2.0:
 *
 * - No hardcoded discovery_prompt or analyst_prompt
 * - desired_contact_count extracted from ICP builder session
 * - user_feedback field for append-only feedback accumulation
 */
export interface SearchV3Config {
  /**
   * Normalized config type for all search tasks
   */
  config_type?: 'search-task';

  /**
   * Number of contacts to find per company (from ICP builder session)
   */
  desired_contact_count?: number;

  /**
   * Accumulated user feedback (append-only)
   */
  user_feedback?: string;

  version?: 'v3.0';

  /**
   * Optional webhook URL to notify when workflow run completes
   */
  webhook_url?: string | null;
}

/**
 * CSV-based signal monitoring configuration.
 *
 * Monitors signals for companies/people uploaded via CSV file.
 *
 * Attributes: version: Config version (always "v2.0") config_type: Config type
 * discriminator (always "signal-csv") entity_type: Type of entity being monitored
 * (company, person, etc.) file_id: ID of the uploaded CSV file primary_column:
 * Column containing entity names (defaults to "name") signal_types: Types of
 * signals to monitor for these entities monitoring_frequency: How often to check
 * for signals (daily/weekly/monthly) webhook_url: Optional webhook URL to notify
 * when signal run completes
 */
export interface SignalCsvConfigInput {
  /**
   * ID of the uploaded CSV file
   */
  file_id: string;

  /**
   * Types of signals to monitor for these entities
   */
  signal_types: Array<SignalTypeConfig>;

  /**
   * Config type discriminator
   */
  config_type?: 'signal-csv';

  /**
   * Type of entity being monitored (company, school district, person, etc.)
   */
  entity_type?: SheetAPI.EntityType;

  /**
   * How often to check for new signals (daily, weekly, monthly)
   */
  monitoring_frequency?: 'daily' | 'weekly' | 'monthly';

  /**
   * Column containing entity names. Defaults to 'name'. Used to extract entity names
   * from CSV rows during signal workflow.
   */
  primary_column?: string;

  /**
   * Config version
   */
  version?: 'v2.0';

  /**
   * Optional webhook URL to notify when signal run completes
   */
  webhook_url?: string | null;
}

/**
 * Sheet-based signal monitoring configuration.
 *
 * Monitors signals for entities from an existing discovery ICP's sheet. Unlike CSV
 * mode, signals are deterministically linked to source entities without requiring
 * analyst agent processing.
 *
 * UPDATED 2025-12-29: Removed source_sheet_id field. Sheets are uniquely
 * identified by (source_icp_id, entity_type), so source_sheet_id was redundant and
 * never used at runtime.
 *
 * Attributes: source_icp_id: ID of the discovery ICP containing entities to
 * monitor entity_type: Type of entity being monitored (selects which sheet)
 * entity_filters: Optional MongoDB query to filter entities signal_types: Types of
 * signals to monitor monitoring_frequency: How often to check for signals
 * webhook_url: Optional webhook URL to notify when signal run completes
 */
export interface SignalSheetConfigInput {
  /**
   * Types of signals to monitor
   */
  signal_types: Array<SignalTypeConfig>;

  /**
   * ID of the discovery ICP containing entities to monitor
   */
  source_icp_id: string;

  /**
   * Config type discriminator
   */
  config_type?: 'signal-sheet';

  /**
   * Optional MongoDB query to filter entities within the sheet
   */
  entity_filters?: { [key: string]: unknown } | null;

  /**
   * Type of entity being monitored (company, person, school_district, etc.)
   */
  entity_type?: SheetAPI.EntityType;

  /**
   * How often to check for new signals
   */
  monitoring_frequency?: 'daily' | 'weekly' | 'monthly';

  /**
   * Config version
   */
  version?: 'v2.0';

  /**
   * Optional webhook URL to notify when signal run completes
   */
  webhook_url?: string | null;
}

/**
 * Topic-based signal monitoring configuration.
 *
 * Monitors signals based on criteria without requiring pre-existing entities.
 *
 * Attributes: version: Config version (always "v2.0") config_type: Config type
 * discriminator (always "signal-topic") entity_type: Type of entity being
 * monitored (company, person, etc.) topic_criteria: Natural language description
 * of what to monitor signal_types: Types of signals to monitor for this topic
 * monitoring_frequency: How often to check for signals (daily/weekly/monthly)
 * geographic_filters: Optional geographic regions to focus on industry_filters:
 * Optional industries to focus on company_size_filters: Optional company size
 * criteria webhook_url: Optional webhook URL to notify when signal run completes
 */
export interface SignalTopicConfigInput {
  /**
   * Types of signals to monitor for this topic
   */
  signal_types: Array<SignalTypeConfig>;

  /**
   * Natural language description of what to monitor
   */
  topic_criteria: string;

  /**
   * Company size criteria (e.g., employee count ranges)
   */
  company_size_filters?: Array<string> | null;

  /**
   * Config type discriminator
   */
  config_type?: 'signal-topic';

  /**
   * Type of entity being monitored (company, school district, person, etc.)
   */
  entity_type?: SheetAPI.EntityType;

  /**
   * Geographic regions to focus on
   */
  geographic_filters?: Array<string> | null;

  /**
   * Industries to focus on
   */
  industry_filters?: Array<string> | null;

  /**
   * How often to check for new signals (daily, weekly, monthly)
   */
  monitoring_frequency?: 'daily' | 'weekly' | 'monthly';

  /**
   * Config version
   */
  version?: 'v2.0';

  /**
   * Optional webhook URL to notify when signal run completes
   */
  webhook_url?: string | null;
}

/**
 * Configuration for a single signal type to monitor.
 *
 * Allows both standard signal types and custom types using OTHER.
 */
export interface SignalTypeConfig {
  /**
   * Detailed description of what to monitor
   */
  description: string;

  /**
   * Display name for this signal type
   */
  display: string;

  /**
   * Signal type to monitor (use OTHER for custom types)
   */
  type:
    | 'funding'
    | 'leadership_change'
    | 'layoff'
    | 'product_launch'
    | 'partnership'
    | 'acquisition'
    | 'expansion'
    | 'award'
    | 'pivot'
    | 'regulatory'
    | 'rfp'
    | 'contract_renewal'
    | 'hiring_surge'
    | 'infrastructure'
    | 'compliance'
    | 'job_posting'
    | 'other';
}

/**
 * Standard single-prompt configuration for most flows. Used by: ingest, profile,
 * signal, and future single-prompt flows.
 *
 * NOTE: config_type should match flow_name (e.g., 'profile-prompt',
 * 'ingest-prompt'). This is enforced by Task model validator.
 */
export interface StandardPromptConfig {
  /**
   * Config type (e.g., 'profile-prompt', 'ingest-prompt')
   */
  config_type: string;

  /**
   * Jinja2 template for task instructions
   */
  prompt: string;

  version?: 'v1.0';

  /**
   * Optional webhook URL to notify when workflow run completes
   */
  webhook_url?: string | null;
}

export type TaskCreateResponse = { [key: string]: unknown };

export type TaskRetrieveResponse = { [key: string]: unknown };

/**
 * Response model for paginated task list.
 */
export interface TaskListResponse {
  /**
   * Current page number (1-based)
   */
  page: number;

  /**
   * Number of items per page
   */
  page_size: number;

  /**
   * List of tasks
   */
  tasks: Array<TaskListResponse.Task>;

  /**
   * Total number of tasks matching filters
   */
  total: number;
}

export namespace TaskListResponse {
  /**
   * Response model for task data.
   */
  export interface Task {
    /**
     * Task ID
     */
    id: string;

    /**
     * Creation timestamp
     */
    created_at: string;

    /**
     * Prefect deployment name
     */
    deployment_name: string;

    /**
     * Task description
     */
    description: string;

    /**
     * Prefect flow name
     */
    flow_name: string;

    /**
     * Task name
     */
    name: string;

    /**
     * Last update timestamp
     */
    updated_at: string;

    /**
     * Task ICP ID
     */
    icp_id?: string | null;

    /**
     * Template prompt for the task. Can include placeholders for runtime parameters.
     */
    prompt?: string | null;

    /**
     * Flow-specific task configuration with versioning
     */
    task_config?:
      | { [key: string]: unknown }
      | TaskAPI.StandardPromptConfig
      | TaskAPI.SearchV2Config
      | TaskAPI.SearchV3Config
      | TaskAPI.IngestTaskConfig
      | Task.SignalTopicConfigOutput
      | Task.SignalCsvConfigOutput
      | Task.SignalSheetConfigOutput
      | null;
  }

  export namespace Task {
    /**
     * Topic-based signal monitoring configuration.
     *
     * Monitors signals based on criteria without requiring pre-existing entities.
     *
     * Attributes: version: Config version (always "v2.0") config_type: Config type
     * discriminator (always "signal-topic") entity_type: Type of entity being
     * monitored (company, person, etc.) topic_criteria: Natural language description
     * of what to monitor signal_types: Types of signals to monitor for this topic
     * monitoring_frequency: How often to check for signals (daily/weekly/monthly)
     * geographic_filters: Optional geographic regions to focus on industry_filters:
     * Optional industries to focus on company_size_filters: Optional company size
     * criteria webhook_url: Optional webhook URL to notify when signal run completes
     */
    export interface SignalTopicConfigOutput {
      /**
       * Types of signals to monitor for this topic
       */
      signal_types: Array<TaskAPI.SignalTypeConfig>;

      /**
       * Natural language description of what to monitor
       */
      topic_criteria: string;

      /**
       * Company size criteria (e.g., employee count ranges)
       */
      company_size_filters?: Array<string> | null;

      /**
       * Config type discriminator
       */
      config_type?: 'signal-topic';

      /**
       * Type of entity being monitored (company, school district, person, etc.)
       */
      entity_type?: SheetAPI.EntityType;

      /**
       * Geographic regions to focus on
       */
      geographic_filters?: Array<string> | null;

      /**
       * Industries to focus on
       */
      industry_filters?: Array<string> | null;

      /**
       * How often to check for new signals (daily, weekly, monthly)
       */
      monitoring_frequency?: 'daily' | 'weekly' | 'monthly';

      /**
       * Config version
       */
      version?: 'v2.0';

      /**
       * Optional webhook URL to notify when signal run completes
       */
      webhook_url?: string | null;
    }

    /**
     * CSV-based signal monitoring configuration.
     *
     * Monitors signals for companies/people uploaded via CSV file.
     *
     * Attributes: version: Config version (always "v2.0") config_type: Config type
     * discriminator (always "signal-csv") entity_type: Type of entity being monitored
     * (company, person, etc.) file_id: ID of the uploaded CSV file primary_column:
     * Column containing entity names (defaults to "name") signal_types: Types of
     * signals to monitor for these entities monitoring_frequency: How often to check
     * for signals (daily/weekly/monthly) webhook_url: Optional webhook URL to notify
     * when signal run completes
     */
    export interface SignalCsvConfigOutput {
      /**
       * ID of the uploaded CSV file
       */
      file_id: string;

      /**
       * Types of signals to monitor for these entities
       */
      signal_types: Array<TaskAPI.SignalTypeConfig>;

      /**
       * Config type discriminator
       */
      config_type?: 'signal-csv';

      /**
       * Type of entity being monitored (company, school district, person, etc.)
       */
      entity_type?: SheetAPI.EntityType;

      /**
       * How often to check for new signals (daily, weekly, monthly)
       */
      monitoring_frequency?: 'daily' | 'weekly' | 'monthly';

      /**
       * Column containing entity names. Defaults to 'name'. Used to extract entity names
       * from CSV rows during signal workflow.
       */
      primary_column?: string;

      /**
       * Config version
       */
      version?: 'v2.0';

      /**
       * Optional webhook URL to notify when signal run completes
       */
      webhook_url?: string | null;
    }

    /**
     * Sheet-based signal monitoring configuration.
     *
     * Monitors signals for entities from an existing discovery ICP's sheet. Unlike CSV
     * mode, signals are deterministically linked to source entities without requiring
     * analyst agent processing.
     *
     * UPDATED 2025-12-29: Removed source_sheet_id field. Sheets are uniquely
     * identified by (source_icp_id, entity_type), so source_sheet_id was redundant and
     * never used at runtime.
     *
     * Attributes: source_icp_id: ID of the discovery ICP containing entities to
     * monitor entity_type: Type of entity being monitored (selects which sheet)
     * entity_filters: Optional MongoDB query to filter entities signal_types: Types of
     * signals to monitor monitoring_frequency: How often to check for signals
     * webhook_url: Optional webhook URL to notify when signal run completes
     */
    export interface SignalSheetConfigOutput {
      /**
       * Types of signals to monitor
       */
      signal_types: Array<TaskAPI.SignalTypeConfig>;

      /**
       * ID of the discovery ICP containing entities to monitor
       */
      source_icp_id: string;

      /**
       * Config type discriminator
       */
      config_type?: 'signal-sheet';

      /**
       * Optional MongoDB query to filter entities within the sheet
       */
      entity_filters?: { [key: string]: unknown } | null;

      /**
       * Type of entity being monitored (company, person, school_district, etc.)
       */
      entity_type?: SheetAPI.EntityType;

      /**
       * How often to check for new signals
       */
      monitoring_frequency?: 'daily' | 'weekly' | 'monthly';

      /**
       * Config version
       */
      version?: 'v2.0';

      /**
       * Optional webhook URL to notify when signal run completes
       */
      webhook_url?: string | null;
    }
  }
}

/**
 * Response model for task execution.
 */
export interface TaskExecuteResponse {
  /**
   * The Prefect flow run ID
   */
  flow_run_id: string;

  /**
   * The ID of the created run
   */
  run_id: string;

  /**
   * Initial status of the run
   */
  status: string;
}

export interface TaskCreateParams {
  /**
   * The Prefect deployment name for this flow
   */
  deployment_name: string;

  /**
   * Detailed description of what this task accomplishes
   */
  description: string;

  /**
   * The Prefect flow name (e.g., 'search', 'ingest', 'signal')
   */
  flow_name: string;

  /**
   * Human-readable name for the task
   */
  name: string;

  /**
   * Optional ICP ID for signal monitoring tasks
   */
  icp_id?: string | null;

  /**
   * Template prompt for the task. Can include placeholders for runtime parameters.
   */
  prompt?: string | null;

  /**
   * Flow-specific task configuration with versioning
   */
  task_config?:
    | { [key: string]: unknown }
    | StandardPromptConfig
    | SearchV2Config
    | SearchV3Config
    | IngestTaskConfig
    | SignalTopicConfigInput
    | SignalCsvConfigInput
    | SignalSheetConfigInput
    | null;
}

export interface TaskUpdateParams {
  /**
   * Updated deployment name
   */
  deployment_name?: string | null;

  /**
   * Updated task description
   */
  description?: string | null;

  /**
   * Updated ICP Connection
   */
  icp_id?: string | null;

  /**
   * Updated task name
   */
  name?: string | null;

  /**
   * Updated task prompt template
   */
  prompt?: string | null;

  /**
   * Updated flow-specific task configuration with versioning
   */
  task_config?:
    | { [key: string]: unknown }
    | StandardPromptConfig
    | SearchV2Config
    | SearchV3Config
    | IngestTaskConfig
    | SignalTopicConfigInput
    | SignalCsvConfigInput
    | SignalSheetConfigInput
    | null;
}

export interface TaskListParams {
  /**
   * Filter by flow name
   */
  flow_name?: string | null;

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
   * Field to sort by (e.g., 'created_at', 'updated_at', 'name')
   */
  sort_by?: string | null;
}

export interface TaskExecuteParams {
  /**
   * Optional ICP ID to attach to this run for workflows that require ICP context
   */
  icp_id?: string | null;

  /**
   * Runtime parameters to pass to the task execution
   */
  parameters?: { [key: string]: unknown };
}

export declare namespace Task {
  export {
    type IngestTaskConfig as IngestTaskConfig,
    type SearchV2Config as SearchV2Config,
    type SearchV3Config as SearchV3Config,
    type SignalCsvConfigInput as SignalCsvConfigInput,
    type SignalSheetConfigInput as SignalSheetConfigInput,
    type SignalTopicConfigInput as SignalTopicConfigInput,
    type SignalTypeConfig as SignalTypeConfig,
    type StandardPromptConfig as StandardPromptConfig,
    type TaskCreateResponse as TaskCreateResponse,
    type TaskRetrieveResponse as TaskRetrieveResponse,
    type TaskListResponse as TaskListResponse,
    type TaskExecuteResponse as TaskExecuteResponse,
    type TaskCreateParams as TaskCreateParams,
    type TaskUpdateParams as TaskUpdateParams,
    type TaskListParams as TaskListParams,
    type TaskExecuteParams as TaskExecuteParams,
  };
}
