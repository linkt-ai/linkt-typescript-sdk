"""Execute publication rejection paths without registry access or credentials."""
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile
import textwrap
import unittest

ROOT = Path(__file__).resolve().parents[2]
PUBLISHER = "npm"


class FreezeTests(unittest.TestCase):
    def test_local_and_vendor_upload_commands_reject_without_external_commands(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            marker = root / "called"
            for command in ["uv", "npm", "pnpm", "curl", "twine", "python"]:
                trap = root / command
                trap.write_text('#!/bin/sh\nprintf called > "$FREEZE_MARKER"\nexit 72\n')
                trap.chmod(0o755)
            env = {**os.environ, "PATH": str(root) + os.pathsep + os.environ["PATH"],
                   "FREEZE_MARKER": str(marker), "PYPI_TOKEN": "fixture-private-token",
                   "NPM_TOKEN": "fixture-private-token", "AUTH": "fixture-private-token"}
            for file in [f"bin/publish-{PUBLISHER}", "bin/check-release-environment", "scripts/utils/upload-artifact.sh"]:
                for arguments in [[], ["--force", "--token", "fixture-private-token"]]:
                    with self.subTest(file=file, arguments=bool(arguments)):
                        result = subprocess.run(["bash", str(ROOT / file), *arguments], cwd=ROOT,
                                                env=env, capture_output=True, text=True, timeout=5)
                        self.assertEqual(result.returncode, 1)
                        self.assertIn("publication is disabled", result.stderr)
                        self.assertNotIn("fixture-private-token", result.stdout + result.stderr)
                        self.assertFalse(marker.exists())

    def test_release_and_manual_workflow_bodies_reject_without_credentials(self):
        for name in [f"publish-{PUBLISHER}.yml", "release-doctor.yml"]:
            source = (ROOT / ".github/workflows" / name).read_text()
            self.assertIn("permissions: {}", source)
            self.assertIn("workflow_dispatch:", source)
            self.assertNotIn("secrets.", source)
            self.assertNotIn("id-token:", source)
            self.assertNotIn("uses:", source)
            if name.startswith("publish"):
                self.assertIn("types: [published]", source)
            script = textwrap.dedent(source.split("        run: |\n", 1)[1])
            for event in ["release", "workflow_dispatch"]:
                result = subprocess.run(["bash", "-c", script], capture_output=True, text=True,
                    timeout=5, env={**os.environ, "GITHUB_EVENT_NAME": event})
                self.assertEqual(result.returncode, 1)
                self.assertIn("publication is disabled", result.stdout)

    def test_no_publication_commands_remain_in_workflows_or_helper_scripts(self):
        forbidden = re.compile(r"\b(?:uv|npm|pnpm)\s+publish\b|\btwine\s+upload\b|core\.getIDToken\(")
        for directory in [".github/workflows", "bin", "scripts"]:
            for path in (ROOT / directory).rglob("*"):
                if path.is_file():
                    with self.subTest(path=str(path.relative_to(ROOT))):
                        self.assertIsNone(forbidden.search(path.read_text()))
        ci = (ROOT / ".github/workflows/ci.yml").read_text()
        self.assertNotIn("Upload tarball", ci)
        self.assertNotIn("id-token: write", ci)

    def test_migration_notice_and_typescript_distribution_stay_frozen(self):
        readme = (ROOT / "README.md").read_text()
        self.assertIn("Deprecated legacy V1 SDK", readme)
        self.assertIn("MIGRATION.md", readme)
        self.assertNotIn("may be released as minor versions", readme)
        migration = (ROOT / "MIGRATION.md").read_text()
        for text in ["direct HTTP or MCP", "Existing package versions remain installable", "no retirement date"]:
            self.assertIn(text, migration)
        if PUBLISHER == "npm":
            package = json.loads((ROOT / "package.json").read_text())
            self.assertTrue(package["private"])
            result = subprocess.run(["node", "scripts/utils/make-dist-package-json.cjs"], cwd=ROOT,
                                    capture_output=True, text=True, timeout=5)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertTrue(json.loads(result.stdout)["private"])


if __name__ == "__main__":
    unittest.main()
