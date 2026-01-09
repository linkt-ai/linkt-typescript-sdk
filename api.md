# Icp

Types:

- <code><a href="./src/resources/icp.ts">EntityTargetConfig</a></code>
- <code><a href="./src/resources/icp.ts">IcpResponse</a></code>
- <code><a href="./src/resources/icp.ts">IcpListResponse</a></code>
- <code><a href="./src/resources/icp.ts">IcpGetActiveRunsResponse</a></code>

Methods:

- <code title="post /v1/icp">client.icp.<a href="./src/resources/icp.ts">create</a>({ ...params }) -> IcpResponse</code>
- <code title="get /v1/icp/{icp_id}">client.icp.<a href="./src/resources/icp.ts">retrieve</a>(icpID) -> IcpResponse</code>
- <code title="put /v1/icp/{icp_id}">client.icp.<a href="./src/resources/icp.ts">update</a>(icpID, { ...params }) -> IcpResponse</code>
- <code title="get /v1/icp">client.icp.<a href="./src/resources/icp.ts">list</a>({ ...params }) -> IcpListResponse</code>
- <code title="delete /v1/icp/{icp_id}">client.icp.<a href="./src/resources/icp.ts">delete</a>(icpID) -> void</code>
- <code title="get /v1/icp/{icp_id}/active_runs">client.icp.<a href="./src/resources/icp.ts">getActiveRuns</a>(icpID) -> IcpGetActiveRunsResponse</code>

# Sheet

Types:

- <code><a href="./src/resources/sheet/sheet.ts">EntityType</a></code>
- <code><a href="./src/resources/sheet/sheet.ts">Sheet</a></code>
- <code><a href="./src/resources/sheet/sheet.ts">SheetListResponse</a></code>
- <code><a href="./src/resources/sheet/sheet.ts">SheetExportCsvResponse</a></code>
- <code><a href="./src/resources/sheet/sheet.ts">SheetGetEntitiesResponse</a></code>

Methods:

- <code title="post /v1/sheet">client.sheet.<a href="./src/resources/sheet/sheet.ts">create</a>({ ...params }) -> Sheet</code>
- <code title="get /v1/sheet/{sheet_id}">client.sheet.<a href="./src/resources/sheet/sheet.ts">retrieve</a>(sheetID) -> Sheet</code>
- <code title="put /v1/sheet/{sheet_id}">client.sheet.<a href="./src/resources/sheet/sheet.ts">update</a>(sheetID, { ...params }) -> void</code>
- <code title="get /v1/sheet">client.sheet.<a href="./src/resources/sheet/sheet.ts">list</a>({ ...params }) -> SheetListResponse</code>
- <code title="delete /v1/sheet/{sheet_id}">client.sheet.<a href="./src/resources/sheet/sheet.ts">delete</a>(sheetID) -> void</code>
- <code title="get /v1/sheet/{sheet_id}/export-csv">client.sheet.<a href="./src/resources/sheet/sheet.ts">exportCsv</a>(sheetID, { ...params }) -> unknown</code>
- <code title="get /v1/sheet/{sheet_id}/entities">client.sheet.<a href="./src/resources/sheet/sheet.ts">getEntities</a>(sheetID, { ...params }) -> SheetGetEntitiesResponse</code>

## Entity

Types:

- <code><a href="./src/resources/sheet/entity.ts">EntityRetrieveResponse</a></code>

Methods:

- <code title="get /v1/sheet/{sheet_id}/entity/{entity_id}">client.sheet.entity.<a href="./src/resources/sheet/entity.ts">retrieve</a>(entityID, { ...params }) -> EntityRetrieveResponse</code>
- <code title="put /v1/sheet/{sheet_id}/entity/{entity_id}/comments">client.sheet.entity.<a href="./src/resources/sheet/entity.ts">updateComments</a>(entityID, { ...params }) -> void</code>
- <code title="put /v1/sheet/{sheet_id}/entity/{entity_id}/status">client.sheet.entity.<a href="./src/resources/sheet/entity.ts">updateStatus</a>(entityID, { ...params }) -> void</code>

## Schema

Types:

- <code><a href="./src/resources/sheet/schema.ts">SchemaGetResponse</a></code>
- <code><a href="./src/resources/sheet/schema.ts">SchemaGetDefaultResponse</a></code>
- <code><a href="./src/resources/sheet/schema.ts">SchemaGetFieldDefinitionsResponse</a></code>

Methods:

- <code title="put /v1/sheet/schema/{sheet_id}">client.sheet.schema.<a href="./src/resources/sheet/schema.ts">addFields</a>(sheetID, { ...params }) -> void</code>
- <code title="delete /v1/sheet/schema/{sheet_id}">client.sheet.schema.<a href="./src/resources/sheet/schema.ts">deleteFields</a>(sheetID, { ...params }) -> void</code>
- <code title="get /v1/sheet/schema/{sheet_id}">client.sheet.schema.<a href="./src/resources/sheet/schema.ts">get</a>(sheetID) -> SchemaGetResponse</code>
- <code title="get /v1/sheet/schema/default">client.sheet.schema.<a href="./src/resources/sheet/schema.ts">getDefault</a>() -> SchemaGetDefaultResponse</code>
- <code title="get /v1/sheet/schema/field">client.sheet.schema.<a href="./src/resources/sheet/schema.ts">getFieldDefinitions</a>() -> SchemaGetFieldDefinitionsResponse</code>

# Task

Types:

- <code><a href="./src/resources/task.ts">IngestTaskConfig</a></code>
- <code><a href="./src/resources/task.ts">SearchV2Config</a></code>
- <code><a href="./src/resources/task.ts">SearchV3Config</a></code>
- <code><a href="./src/resources/task.ts">SignalTypeConfig</a></code>
- <code><a href="./src/resources/task.ts">StandardPromptConfig</a></code>
- <code><a href="./src/resources/task.ts">TaskCreateResponse</a></code>
- <code><a href="./src/resources/task.ts">TaskRetrieveResponse</a></code>
- <code><a href="./src/resources/task.ts">TaskListResponse</a></code>
- <code><a href="./src/resources/task.ts">TaskExecuteResponse</a></code>

Methods:

- <code title="post /v1/task">client.task.<a href="./src/resources/task.ts">create</a>({ ...params }) -> TaskCreateResponse</code>
- <code title="get /v1/task/{task_id}">client.task.<a href="./src/resources/task.ts">retrieve</a>(taskID) -> TaskRetrieveResponse</code>
- <code title="put /v1/task/{task_id}">client.task.<a href="./src/resources/task.ts">update</a>(taskID, { ...params }) -> void</code>
- <code title="get /v1/task">client.task.<a href="./src/resources/task.ts">list</a>({ ...params }) -> TaskListResponse</code>
- <code title="delete /v1/task/{task_id}">client.task.<a href="./src/resources/task.ts">delete</a>(taskID) -> void</code>
- <code title="post /v1/task/{task_id}/execute">client.task.<a href="./src/resources/task.ts">execute</a>(taskID, { ...params }) -> TaskExecuteResponse</code>

# Signal

Types:

- <code><a href="./src/resources/signal.ts">SignalResponse</a></code>
- <code><a href="./src/resources/signal.ts">SignalListResponse</a></code>

Methods:

- <code title="get /v1/signal/{signal_id}">client.signal.<a href="./src/resources/signal.ts">retrieve</a>(signalID) -> SignalResponse</code>
- <code title="get /v1/signal">client.signal.<a href="./src/resources/signal.ts">list</a>({ ...params }) -> SignalListResponse</code>

# Run

Types:

- <code><a href="./src/resources/run.ts">RunCreateResponse</a></code>
- <code><a href="./src/resources/run.ts">RunRetrieveResponse</a></code>
- <code><a href="./src/resources/run.ts">RunListResponse</a></code>
- <code><a href="./src/resources/run.ts">RunGetQueueResponse</a></code>

Methods:

- <code title="post /v1/run">client.run.<a href="./src/resources/run.ts">create</a>({ ...params }) -> RunCreateResponse</code>
- <code title="get /v1/run/{run_id}">client.run.<a href="./src/resources/run.ts">retrieve</a>(runID) -> RunRetrieveResponse</code>
- <code title="get /v1/run">client.run.<a href="./src/resources/run.ts">list</a>({ ...params }) -> RunListResponse</code>
- <code title="delete /v1/run/{run_id}">client.run.<a href="./src/resources/run.ts">delete</a>(runID) -> void</code>
- <code title="post /v1/run/{run_id}/cancel">client.run.<a href="./src/resources/run.ts">cancel</a>(runID) -> void</code>
- <code title="get /v1/run/{run_id}/queue">client.run.<a href="./src/resources/run.ts">getQueue</a>(runID, { ...params }) -> RunGetQueueResponse</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">CsvProcessingStatus</a></code>
- <code><a href="./src/resources/files.ts">FileRetrieveResponse</a></code>
- <code><a href="./src/resources/files.ts">FileListResponse</a></code>
- <code><a href="./src/resources/files.ts">FileUploadResponse</a></code>

Methods:

- <code title="get /v1/files/{file_id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileID) -> FileRetrieveResponse</code>
- <code title="get /v1/files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FileListResponse</code>
- <code title="post /v1/files/upload">client.files.<a href="./src/resources/files.ts">upload</a>({ ...params }) -> FileUploadResponse</code>
