# Migrate from the legacy SDK

This SDK is deprecated and frozen. Use direct HTTP or MCP for new Signal integrations.
Existing package versions remain installable. This repository stays accessible.
The freeze does not remove public `/v1`, legacy `/mcp`, or private web routes.
Those endpoints keep their existing authentication. Endpoint retirement requires a separate
usage-based decision; there is no retirement date.

Use the [V2 HTTP and MCP cookbook](https://github.com/linkt-ai/linkt-cookbook/tree/main/v2)
and [Signal documentation](https://docs.linkt.ai/) for tested examples and the supported contract.
The SDK's classes describe legacy V1. Do not map SDK method names onto V2 routes by changing
the base URL. Follow the V2 operation and schema definitions for each migrated operation.

Use an organization API key for direct HTTP. Use the documented authentication flow for
MCP. Keep secrets out of source files and logs. Test a bounded read first, then migrate
operations with explicit pagination and error handling. Preserve the existing integration
until its replacement passes your acceptance checks.

## Publication shutdown

The repository's release-event, manual workflow and local publication commands reject
publication. Build and test support remains for existing code. No new SDK release is planned.
Do not unpublish existing versions or archive the repository.

These branch changes take effect only after the release owner verifies the replacement
HTTP/MCP pipeline and merges the coordinated freeze. The owner must also disable registry
publish credentials/trusted publishers and old workflow refs, close pending SDK release
proposals, and verify representative existing versions remain installable. Code guards alone
do not revoke external credentials. Merge the cookbook migration examples before activation.
Shared organization vendor installations are outside this shutdown.
