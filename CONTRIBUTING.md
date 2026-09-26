# Contributing to the frozen SDK

This repository preserves the legacy V1 client. New integrations use direct HTTP or MCP.
See [migration guidance](MIGRATION.md). No new SDK generation or publication is planned.

Keep existing package versions and generated source accessible. Repository maintenance can
update tests, migration documentation and publication guards. Do not restore publishing
workflows or bypass the shutdown scripts. External credentials and vendor access require the
coordinated activation review described in the migration guidance.

Run the existing verification commands when maintaining the retained source:

```sh
pnpm install --frozen-lockfile
pnpm test
```

Run the publication guard checks without registry credentials:

```sh
python3 .github/scripts/test-sdk-freeze.py
```

Report legacy client issues through this repository. Use the V2 HTTP/MCP contract and cookbook
for new operations. An issue report does not imply a new SDK release.
