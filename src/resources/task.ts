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
 * CSV enrichment task configuration.
 *
 * Enriches entities from an uploaded CSV file with additional data discovered by
 * AI agents.
 *
 * Attributes: type: Config type discriminator (always "ingest"). file_id: ID of
 * the uploaded CSV file to process. primary_column: Column containing entity names
 * for matching. csv_entity_type: Entity type in the CSV (e.g., 'person',
 * 'company'). webhook_url: Optional webhook URL for completion notification.
 *
 * Example: >>> config = IngestTaskConfigRequest( ... file_id="abc123", ...
 * primary_column="company_name", ... csv_entity_type="company" ... )
 */
export interface IngestTaskConfig {
  /**
   * Entity type in the CSV (e.g., 'person', 'company')
   */
  csv_entity_type: string;

  /**
   * ID of the uploaded CSV file to process
   */
  file_id: string;

  /**
   * Column containing entity names for matching
   */
  primary_column: string;

  /**
   * Config type discriminator
   */
  type?: 'ingest';

  /**
   * Optional webhook URL to notify when workflow completes
   */
  webhook_url?: string | null;
}

/**
 * Profile prompt task configuration.
 *
 * Configures a profile workflow with a custom prompt template.
 *
 * Attributes: type: Config type discriminator (always "profile"). prompt: Jinja2
 * template for task instructions. webhook_url: Optional webhook URL for completion
 * notification.
 *
 * Example: >>> config = ProfilePromptConfigRequest( ... prompt="Analyze
 * {{ company_name }} and extract key metrics." ... )
 */
export interface ProfilePromptConfig {
  /**
   * Jinja2 template for task instructions
   */
  prompt: string;

  /**
   * Config type discriminator
   */
  type?: 'profile';

  /**
   * Optional webhook URL to notify when workflow completes
   */
  webhook_url?: string | null;
}

/**
 * Search task configuration for finding companies and contacts.
 *
 * Creates a v3.0 search workflow that uses AI agents to discover entities matching
 * your ICP criteria.
 *
 * Attributes: type: Config type discriminator (always "search").
 * desired_contact_count: Number of contacts to find per company (minimum: 1).
 * user_feedback: Optional feedback to refine search behavior. webhook_url:
 * Optional webhook URL for completion notification.
 *
 * Example: >>> config = SearchTaskConfigRequest(desired_contact_count=5) >>>
 * mongo_config = config.to_mongo_config() >>> mongo_config.version 'v3.0'
 */
export interface SearchTaskConfig {
  /**
   * Number of contacts to find per company (minimum: 1)
   */
  desired_contact_count?: number;

  /**
   * Config type discriminator
   */
  type?: 'search';

  /**
   * Optional feedback to refine search behavior
   */
  user_feedback?: string;

  /**
   * Optional webhook URL to notify when workflow completes
   */
  webhook_url?: string | null;
}

/**
 * CSV-based signal monitoring configuration.
 *
 * Monitors signals for entities uploaded via CSV file.
 *
 * Attributes: type: Config type discriminator (always "signal-csv"). file_id: ID
 * of the uploaded CSV file. signal_types: Types of signals to monitor.
 * entity_type: Type of entity being monitored (default: company). primary_column:
 * Column containing entity names (default: "name"). monitoring_frequency: How
 * often to check (daily/weekly/monthly). webhook_url: Optional webhook URL for
 * completion notification.
 *
 * Example: >>> config = SignalCSVConfigRequest( ... file_id="abc123", ...
 * signal_types=[SignalTypeConfig(type="hiring_surge", ...)] ... )
 */
export interface SignalCsvConfig {
  /**
   * ID of the uploaded CSV file
   */
  file_id: string;

  /**
   * Types of signals to monitor
   */
  signal_types: Array<SignalTypeConfig>;

  /**
   * Type of entity being monitored
   */
  entity_type?: SheetAPI.EntityType;

  /**
   * How often to check for new signals
   */
  monitoring_frequency?: 'daily' | 'weekly' | 'monthly';

  /**
   * Column containing entity names
   */
  primary_column?: string;

  /**
   * Config type discriminator
   */
  type?: 'signal-csv';

  /**
   * Optional webhook URL to notify when workflow completes
   */
  webhook_url?: string | null;
}

/**
 * Sheet-based signal monitoring configuration.
 *
 * Monitors signals for entities from an existing discovery ICP's sheet.
 *
 * Attributes: type: Config type discriminator (always "signal-sheet").
 * source_icp_id: ID of the discovery ICP containing entities to monitor.
 * signal_types: Types of signals to monitor. entity_type: Type of entity being
 * monitored (default: company). entity_filters: Optional MongoDB query to filter
 * entities. monitoring_frequency: How often to check (daily/weekly/monthly).
 * webhook_url: Optional webhook URL for completion notification.
 *
 * Example: >>> config = SignalSheetConfigRequest( ... source_icp_id="icp123", ...
 * signal_types=[SignalTypeConfig(type="leadership_change", ...)] ... )
 */
export interface SignalSheetConfig {
  /**
   * Types of signals to monitor
   */
  signal_types: Array<SignalTypeConfig>;

  /**
   * ID of the discovery ICP containing entities to monitor
   */
  source_icp_id: string;

  /**
   * Optional MongoDB query to filter entities
   */
  entity_filters?: { [key: string]: unknown } | null;

  /**
   * Type of entity being monitored
   */
  entity_type?: SheetAPI.EntityType;

  /**
   * How often to check for new signals
   */
  monitoring_frequency?: 'daily' | 'weekly' | 'monthly';

  /**
   * Config type discriminator
   */
  type?: 'signal-sheet';

  /**
   * Optional webhook URL to notify when workflow completes
   */
  webhook_url?: string | null;
}

/**
 * Topic-based signal monitoring configuration.
 *
 * Monitors for signals based on topic criteria without requiring pre-existing
 * entities.
 *
 * Attributes: type: Config type discriminator (always "signal-topic").
 * topic_criteria: Natural language description of what to monitor. signal_types:
 * Types of signals to monitor. entity_type: Type of entity being monitored
 * (default: company). monitoring_frequency: How often to check
 * (daily/weekly/monthly). geographic_filters: Optional geographic regions to focus
 * on. industry_filters: Optional industries to focus on. company_size_filters:
 * Optional company size criteria. webhook_url: Optional webhook URL for completion
 * notification.
 *
 * Example: >>> config = SignalTopicConfigRequest( ... topic_criteria="AI startups
 * raising Series A", ... signal_types=[SignalTypeConfig(type="funding", ...)] ...
 * )
 */
export interface SignalTopicConfig {
  /**
   * Types of signals to monitor
   */
  signal_types: Array<SignalTypeConfig>;

  /**
   * Natural language description of what to monitor
   */
  topic_criteria: string;

  /**
   * Company size criteria
   */
  company_size_filters?: Array<string> | null;

  /**
   * Type of entity being monitored
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
   * How often to check for new signals
   */
  monitoring_frequency?: 'daily' | 'weekly' | 'monthly';

  /**
   * Config type discriminator
   */
  type?: 'signal-topic';

  /**
   * Optional webhook URL to notify when workflow completes
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
 * Response model for task data.
 *
 * Uses TaskConfigResponse discriminated union for proper OpenAPI schema generation
 * with type-based discrimination.
 *
 * Attributes: id: Task ID. name: Task name. description: Task description. icp_id:
 * Task ICP ID. flow_name: Prefect flow name. deployment_name: Prefect deployment
 * name. prompt: Template prompt for the task. task_config: Flow-specific task
 * configuration. created_at: Creation timestamp. updated_at: Last update
 * timestamp.
 */
export interface TaskCreateResponse {
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
   * Flow-specific task configuration
   */
  task_config?:
    | TaskCreateResponse.SearchTaskConfigResponse
    | TaskCreateResponse.IngestTaskConfigResponse
    | TaskCreateResponse.ProfilePromptConfigResponse
    | TaskCreateResponse.SignalTopicConfigResponse
    | TaskCreateResponse.SignalCsvConfigResponse
    | TaskCreateResponse.SignalSheetConfigResponse
    | null;
}

export namespace TaskCreateResponse {
  /**
   * Search task configuration in API responses.
   *
   * Response model for search task configs that excludes backend-managed fields
   * (version, config_type) from the API surface.
   *
   * Attributes: type: Config type discriminator (always "search").
   * desired_contact_count: Number of contacts to find per company. user_feedback:
   * Feedback to refine search behavior. webhook_url: Webhook URL for completion
   * notification.
   */
  export interface SearchTaskConfigResponse {
    /**
     * Number of contacts to find per company
     */
    desired_contact_count: number;

    /**
     * Feedback to refine search behavior
     */
    user_feedback: string;

    type?: 'search';

    /**
     * Webhook URL for completion notification
     */
    webhook_url?: string | null;
  }

  /**
   * Ingest task configuration in API responses.
   *
   * Response model for CSV enrichment task configs that excludes backend-managed
   * fields from the API surface.
   *
   * Attributes: type: Config type discriminator (always "ingest"). file_id: ID of
   * the CSV file. primary_column: Column containing entity names. csv_entity_type:
   * Entity type in CSV. webhook_url: Webhook URL for completion notification.
   */
  export interface IngestTaskConfigResponse {
    /**
     * Entity type in CSV
     */
    csv_entity_type: string;

    /**
     * ID of the CSV file
     */
    file_id: string;

    /**
     * Column containing entity names
     */
    primary_column: string;

    type?: 'ingest';

    /**
     * Webhook URL for completion notification
     */
    webhook_url?: string | null;
  }

  /**
   * Profile prompt configuration in API responses.
   *
   * Response model for profile prompt task configs that excludes backend-managed
   * fields from the API surface.
   *
   * Attributes: type: Config type discriminator (always "profile"). prompt: Task
   * prompt template. webhook_url: Webhook URL for completion notification.
   */
  export interface ProfilePromptConfigResponse {
    /**
     * Task prompt template
     */
    prompt: string;

    type?: 'profile';

    /**
     * Webhook URL for completion notification
     */
    webhook_url?: string | null;
  }

  /**
   * Signal topic configuration in API responses.
   *
   * Response model for topic-based signal monitoring configs.
   *
   * Attributes: type: Config type discriminator (always "signal-topic").
   * topic_criteria: Topic criteria for monitoring. signal_types: Types of signals to
   * monitor. entity_type: Type of entity being monitored. monitoring_frequency: How
   * often to check for signals. geographic_filters: Geographic regions to focus on.
   * industry_filters: Industries to focus on. company_size_filters: Company size
   * criteria. webhook_url: Webhook URL for completion notification.
   */
  export interface SignalTopicConfigResponse {
    /**
     * Entity type
     */
    entity_type: SheetAPI.EntityType;

    /**
     * Monitoring frequency
     */
    monitoring_frequency: 'daily' | 'weekly' | 'monthly';

    /**
     * Signal types
     */
    signal_types: Array<TaskAPI.SignalTypeConfig>;

    /**
     * Topic criteria
     */
    topic_criteria: string;

    /**
     * Size filters
     */
    company_size_filters?: Array<string> | null;

    /**
     * Geographic filters
     */
    geographic_filters?: Array<string> | null;

    /**
     * Industry filters
     */
    industry_filters?: Array<string> | null;

    type?: 'signal-topic';

    /**
     * Webhook URL for completion notification
     */
    webhook_url?: string | null;
  }

  /**
   * Signal CSV configuration in API responses.
   *
   * Response model for CSV-based signal monitoring configs.
   *
   * Attributes: type: Config type discriminator (always "signal-csv"). file_id: CSV
   * file ID. signal_types: Types of signals to monitor. entity_type: Type of entity
   * being monitored. primary_column: Primary column for entity names.
   * monitoring_frequency: How often to check for signals. webhook_url: Webhook URL
   * for completion notification.
   */
  export interface SignalCsvConfigResponse {
    /**
     * Entity type
     */
    entity_type: SheetAPI.EntityType;

    /**
     * CSV file ID
     */
    file_id: string;

    /**
     * Monitoring frequency
     */
    monitoring_frequency: 'daily' | 'weekly' | 'monthly';

    /**
     * Primary column
     */
    primary_column: string;

    /**
     * Signal types
     */
    signal_types: Array<TaskAPI.SignalTypeConfig>;

    type?: 'signal-csv';

    /**
     * Webhook URL for completion notification
     */
    webhook_url?: string | null;
  }

  /**
   * Signal sheet configuration in API responses.
   *
   * Response model for sheet-based signal monitoring configs.
   *
   * Attributes: type: Config type discriminator (always "signal-sheet").
   * source_icp_id: Source ICP ID containing entities to monitor. signal_types: Types
   * of signals to monitor. entity_type: Type of entity being monitored.
   * entity_filters: Optional MongoDB query to filter entities. monitoring_frequency:
   * How often to check for signals. webhook_url: Webhook URL for completion
   * notification.
   */
  export interface SignalSheetConfigResponse {
    /**
     * Entity type
     */
    entity_type: SheetAPI.EntityType;

    /**
     * Monitoring frequency
     */
    monitoring_frequency: 'daily' | 'weekly' | 'monthly';

    /**
     * Signal types
     */
    signal_types: Array<TaskAPI.SignalTypeConfig>;

    /**
     * Source ICP ID
     */
    source_icp_id: string;

    /**
     * Entity filters
     */
    entity_filters?: { [key: string]: unknown } | null;

    type?: 'signal-sheet';

    /**
     * Webhook URL for completion notification
     */
    webhook_url?: string | null;
  }
}

/**
 * Response model for task data.
 *
 * Uses TaskConfigResponse discriminated union for proper OpenAPI schema generation
 * with type-based discrimination.
 *
 * Attributes: id: Task ID. name: Task name. description: Task description. icp_id:
 * Task ICP ID. flow_name: Prefect flow name. deployment_name: Prefect deployment
 * name. prompt: Template prompt for the task. task_config: Flow-specific task
 * configuration. created_at: Creation timestamp. updated_at: Last update
 * timestamp.
 */
export interface TaskRetrieveResponse {
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
   * Flow-specific task configuration
   */
  task_config?:
    | TaskRetrieveResponse.SearchTaskConfigResponse
    | TaskRetrieveResponse.IngestTaskConfigResponse
    | TaskRetrieveResponse.ProfilePromptConfigResponse
    | TaskRetrieveResponse.SignalTopicConfigResponse
    | TaskRetrieveResponse.SignalCsvConfigResponse
    | TaskRetrieveResponse.SignalSheetConfigResponse
    | null;
}

export namespace TaskRetrieveResponse {
  /**
   * Search task configuration in API responses.
   *
   * Response model for search task configs that excludes backend-managed fields
   * (version, config_type) from the API surface.
   *
   * Attributes: type: Config type discriminator (always "search").
   * desired_contact_count: Number of contacts to find per company. user_feedback:
   * Feedback to refine search behavior. webhook_url: Webhook URL for completion
   * notification.
   */
  export interface SearchTaskConfigResponse {
    /**
     * Number of contacts to find per company
     */
    desired_contact_count: number;

    /**
     * Feedback to refine search behavior
     */
    user_feedback: string;

    type?: 'search';

    /**
     * Webhook URL for completion notification
     */
    webhook_url?: string | null;
  }

  /**
   * Ingest task configuration in API responses.
   *
   * Response model for CSV enrichment task configs that excludes backend-managed
   * fields from the API surface.
   *
   * Attributes: type: Config type discriminator (always "ingest"). file_id: ID of
   * the CSV file. primary_column: Column containing entity names. csv_entity_type:
   * Entity type in CSV. webhook_url: Webhook URL for completion notification.
   */
  export interface IngestTaskConfigResponse {
    /**
     * Entity type in CSV
     */
    csv_entity_type: string;

    /**
     * ID of the CSV file
     */
    file_id: string;

    /**
     * Column containing entity names
     */
    primary_column: string;

    type?: 'ingest';

    /**
     * Webhook URL for completion notification
     */
    webhook_url?: string | null;
  }

  /**
   * Profile prompt configuration in API responses.
   *
   * Response model for profile prompt task configs that excludes backend-managed
   * fields from the API surface.
   *
   * Attributes: type: Config type discriminator (always "profile"). prompt: Task
   * prompt template. webhook_url: Webhook URL for completion notification.
   */
  export interface ProfilePromptConfigResponse {
    /**
     * Task prompt template
     */
    prompt: string;

    type?: 'profile';

    /**
     * Webhook URL for completion notification
     */
    webhook_url?: string | null;
  }

  /**
   * Signal topic configuration in API responses.
   *
   * Response model for topic-based signal monitoring configs.
   *
   * Attributes: type: Config type discriminator (always "signal-topic").
   * topic_criteria: Topic criteria for monitoring. signal_types: Types of signals to
   * monitor. entity_type: Type of entity being monitored. monitoring_frequency: How
   * often to check for signals. geographic_filters: Geographic regions to focus on.
   * industry_filters: Industries to focus on. company_size_filters: Company size
   * criteria. webhook_url: Webhook URL for completion notification.
   */
  export interface SignalTopicConfigResponse {
    /**
     * Entity type
     */
    entity_type: SheetAPI.EntityType;

    /**
     * Monitoring frequency
     */
    monitoring_frequency: 'daily' | 'weekly' | 'monthly';

    /**
     * Signal types
     */
    signal_types: Array<TaskAPI.SignalTypeConfig>;

    /**
     * Topic criteria
     */
    topic_criteria: string;

    /**
     * Size filters
     */
    company_size_filters?: Array<string> | null;

    /**
     * Geographic filters
     */
    geographic_filters?: Array<string> | null;

    /**
     * Industry filters
     */
    industry_filters?: Array<string> | null;

    type?: 'signal-topic';

    /**
     * Webhook URL for completion notification
     */
    webhook_url?: string | null;
  }

  /**
   * Signal CSV configuration in API responses.
   *
   * Response model for CSV-based signal monitoring configs.
   *
   * Attributes: type: Config type discriminator (always "signal-csv"). file_id: CSV
   * file ID. signal_types: Types of signals to monitor. entity_type: Type of entity
   * being monitored. primary_column: Primary column for entity names.
   * monitoring_frequency: How often to check for signals. webhook_url: Webhook URL
   * for completion notification.
   */
  export interface SignalCsvConfigResponse {
    /**
     * Entity type
     */
    entity_type: SheetAPI.EntityType;

    /**
     * CSV file ID
     */
    file_id: string;

    /**
     * Monitoring frequency
     */
    monitoring_frequency: 'daily' | 'weekly' | 'monthly';

    /**
     * Primary column
     */
    primary_column: string;

    /**
     * Signal types
     */
    signal_types: Array<TaskAPI.SignalTypeConfig>;

    type?: 'signal-csv';

    /**
     * Webhook URL for completion notification
     */
    webhook_url?: string | null;
  }

  /**
   * Signal sheet configuration in API responses.
   *
   * Response model for sheet-based signal monitoring configs.
   *
   * Attributes: type: Config type discriminator (always "signal-sheet").
   * source_icp_id: Source ICP ID containing entities to monitor. signal_types: Types
   * of signals to monitor. entity_type: Type of entity being monitored.
   * entity_filters: Optional MongoDB query to filter entities. monitoring_frequency:
   * How often to check for signals. webhook_url: Webhook URL for completion
   * notification.
   */
  export interface SignalSheetConfigResponse {
    /**
     * Entity type
     */
    entity_type: SheetAPI.EntityType;

    /**
     * Monitoring frequency
     */
    monitoring_frequency: 'daily' | 'weekly' | 'monthly';

    /**
     * Signal types
     */
    signal_types: Array<TaskAPI.SignalTypeConfig>;

    /**
     * Source ICP ID
     */
    source_icp_id: string;

    /**
     * Entity filters
     */
    entity_filters?: { [key: string]: unknown } | null;

    type?: 'signal-sheet';

    /**
     * Webhook URL for completion notification
     */
    webhook_url?: string | null;
  }
}

/**
 * Response model for paginated task list.
 *
 * Attributes: tasks: List of tasks. total: Total number of tasks matching filters.
 * page: Current page number (1-based). page_size: Number of items per page.
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
   *
   * Uses TaskConfigResponse discriminated union for proper OpenAPI schema generation
   * with type-based discrimination.
   *
   * Attributes: id: Task ID. name: Task name. description: Task description. icp_id:
   * Task ICP ID. flow_name: Prefect flow name. deployment_name: Prefect deployment
   * name. prompt: Template prompt for the task. task_config: Flow-specific task
   * configuration. created_at: Creation timestamp. updated_at: Last update
   * timestamp.
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
     * Flow-specific task configuration
     */
    task_config?:
      | Task.SearchTaskConfigResponse
      | Task.IngestTaskConfigResponse
      | Task.ProfilePromptConfigResponse
      | Task.SignalTopicConfigResponse
      | Task.SignalCsvConfigResponse
      | Task.SignalSheetConfigResponse
      | null;
  }

  export namespace Task {
    /**
     * Search task configuration in API responses.
     *
     * Response model for search task configs that excludes backend-managed fields
     * (version, config_type) from the API surface.
     *
     * Attributes: type: Config type discriminator (always "search").
     * desired_contact_count: Number of contacts to find per company. user_feedback:
     * Feedback to refine search behavior. webhook_url: Webhook URL for completion
     * notification.
     */
    export interface SearchTaskConfigResponse {
      /**
       * Number of contacts to find per company
       */
      desired_contact_count: number;

      /**
       * Feedback to refine search behavior
       */
      user_feedback: string;

      type?: 'search';

      /**
       * Webhook URL for completion notification
       */
      webhook_url?: string | null;
    }

    /**
     * Ingest task configuration in API responses.
     *
     * Response model for CSV enrichment task configs that excludes backend-managed
     * fields from the API surface.
     *
     * Attributes: type: Config type discriminator (always "ingest"). file_id: ID of
     * the CSV file. primary_column: Column containing entity names. csv_entity_type:
     * Entity type in CSV. webhook_url: Webhook URL for completion notification.
     */
    export interface IngestTaskConfigResponse {
      /**
       * Entity type in CSV
       */
      csv_entity_type: string;

      /**
       * ID of the CSV file
       */
      file_id: string;

      /**
       * Column containing entity names
       */
      primary_column: string;

      type?: 'ingest';

      /**
       * Webhook URL for completion notification
       */
      webhook_url?: string | null;
    }

    /**
     * Profile prompt configuration in API responses.
     *
     * Response model for profile prompt task configs that excludes backend-managed
     * fields from the API surface.
     *
     * Attributes: type: Config type discriminator (always "profile"). prompt: Task
     * prompt template. webhook_url: Webhook URL for completion notification.
     */
    export interface ProfilePromptConfigResponse {
      /**
       * Task prompt template
       */
      prompt: string;

      type?: 'profile';

      /**
       * Webhook URL for completion notification
       */
      webhook_url?: string | null;
    }

    /**
     * Signal topic configuration in API responses.
     *
     * Response model for topic-based signal monitoring configs.
     *
     * Attributes: type: Config type discriminator (always "signal-topic").
     * topic_criteria: Topic criteria for monitoring. signal_types: Types of signals to
     * monitor. entity_type: Type of entity being monitored. monitoring_frequency: How
     * often to check for signals. geographic_filters: Geographic regions to focus on.
     * industry_filters: Industries to focus on. company_size_filters: Company size
     * criteria. webhook_url: Webhook URL for completion notification.
     */
    export interface SignalTopicConfigResponse {
      /**
       * Entity type
       */
      entity_type: SheetAPI.EntityType;

      /**
       * Monitoring frequency
       */
      monitoring_frequency: 'daily' | 'weekly' | 'monthly';

      /**
       * Signal types
       */
      signal_types: Array<TaskAPI.SignalTypeConfig>;

      /**
       * Topic criteria
       */
      topic_criteria: string;

      /**
       * Size filters
       */
      company_size_filters?: Array<string> | null;

      /**
       * Geographic filters
       */
      geographic_filters?: Array<string> | null;

      /**
       * Industry filters
       */
      industry_filters?: Array<string> | null;

      type?: 'signal-topic';

      /**
       * Webhook URL for completion notification
       */
      webhook_url?: string | null;
    }

    /**
     * Signal CSV configuration in API responses.
     *
     * Response model for CSV-based signal monitoring configs.
     *
     * Attributes: type: Config type discriminator (always "signal-csv"). file_id: CSV
     * file ID. signal_types: Types of signals to monitor. entity_type: Type of entity
     * being monitored. primary_column: Primary column for entity names.
     * monitoring_frequency: How often to check for signals. webhook_url: Webhook URL
     * for completion notification.
     */
    export interface SignalCsvConfigResponse {
      /**
       * Entity type
       */
      entity_type: SheetAPI.EntityType;

      /**
       * CSV file ID
       */
      file_id: string;

      /**
       * Monitoring frequency
       */
      monitoring_frequency: 'daily' | 'weekly' | 'monthly';

      /**
       * Primary column
       */
      primary_column: string;

      /**
       * Signal types
       */
      signal_types: Array<TaskAPI.SignalTypeConfig>;

      type?: 'signal-csv';

      /**
       * Webhook URL for completion notification
       */
      webhook_url?: string | null;
    }

    /**
     * Signal sheet configuration in API responses.
     *
     * Response model for sheet-based signal monitoring configs.
     *
     * Attributes: type: Config type discriminator (always "signal-sheet").
     * source_icp_id: Source ICP ID containing entities to monitor. signal_types: Types
     * of signals to monitor. entity_type: Type of entity being monitored.
     * entity_filters: Optional MongoDB query to filter entities. monitoring_frequency:
     * How often to check for signals. webhook_url: Webhook URL for completion
     * notification.
     */
    export interface SignalSheetConfigResponse {
      /**
       * Entity type
       */
      entity_type: SheetAPI.EntityType;

      /**
       * Monitoring frequency
       */
      monitoring_frequency: 'daily' | 'weekly' | 'monthly';

      /**
       * Signal types
       */
      signal_types: Array<TaskAPI.SignalTypeConfig>;

      /**
       * Source ICP ID
       */
      source_icp_id: string;

      /**
       * Entity filters
       */
      entity_filters?: { [key: string]: unknown } | null;

      type?: 'signal-sheet';

      /**
       * Webhook URL for completion notification
       */
      webhook_url?: string | null;
    }
  }
}

/**
 * Response model for task execution.
 *
 * Attributes: run_id: The ID of the created run. flow_run_id: The Prefect flow run
 * ID. status: Initial status of the run.
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
   * Flow-specific task configuration with type discriminator
   */
  task_config?:
    | SearchTaskConfig
    | IngestTaskConfig
    | ProfilePromptConfig
    | SignalTopicConfig
    | SignalCsvConfig
    | SignalSheetConfig
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
   * Updated flow-specific task configuration with type discriminator
   */
  task_config?:
    | SearchTaskConfig
    | IngestTaskConfig
    | ProfilePromptConfig
    | SignalTopicConfig
    | SignalCsvConfig
    | SignalSheetConfig
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
    type ProfilePromptConfig as ProfilePromptConfig,
    type SearchTaskConfig as SearchTaskConfig,
    type SignalCsvConfig as SignalCsvConfig,
    type SignalSheetConfig as SignalSheetConfig,
    type SignalTopicConfig as SignalTopicConfig,
    type SignalTypeConfig as SignalTypeConfig,
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
