import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "project-id.sh"


def generate_id(java_path: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["bash", str(SCRIPT), java_path],
        cwd=ROOT,
        check=False,
        capture_output=True,
        text=True,
    )


class ProjectIdTests(unittest.TestCase):
    def test_uses_public_java_class_name(self):
        result = generate_id("tests/fixtures/ProjectIdFixture.java")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout.strip(), "ProjectIdFixture")

    def test_adds_suffix_for_existing_id(self):
        result = generate_id("projects/Beginner/Calculator.java")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout.strip(), "Calculator2")

    def test_rejects_non_java_path(self):
        result = generate_id("README.md")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Usage", result.stderr)

    def test_rejects_missing_source(self):
        result = generate_id("projects/Beginner/DoesNotExist.java")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("not found", result.stderr)


if __name__ == "__main__":
    unittest.main()
