import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "data" / "projects.json"
GUIDE_SECTIONS = [
    "Overview",
    "Learning goals",
    "Prerequisites",
    "Project and file structure",
    "Program execution",
    "Complete code walkthrough",
    "Key Java concepts in context",
    "Example execution",
    "Limitations and common mistakes",
    "Practice and extensions",
    "Summary and source",
]


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def nonblank_lines(path: Path) -> int:
    return sum(1 for line in read_text(path).splitlines() if line.strip())


class RepositoryTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.projects = json.loads(read_text(CATALOG_PATH))

    def test_catalogue_ids_and_steps_are_unique_and_continuous(self):
        ids = [project["id"] for project in self.projects]
        steps = sorted(project["step"] for project in self.projects)
        self.assertEqual(len(ids), len(set(ids)))
        self.assertEqual(steps, list(range(1, len(self.projects) + 1)))

    def test_every_project_defines_exactly_two_existing_resources(self):
        for project in self.projects:
            with self.subTest(project=project["id"]):
                self.assertEqual(
                    [item["id"] for item in project["materials"]],
                    ["code", "didactic"],
                )
                code, study = project["materials"]
                self.assertEqual((code["label"], code["type"]), ("Original code", "java"))
                self.assertEqual((study["label"], study["type"]), ("Study material", "markdown"))
                self.assertTrue(code["path"].endswith(".java"))
                self.assertTrue(study["path"].endswith(".md"))
                self.assertTrue((ROOT / code["path"]).is_file())
                self.assertTrue((ROOT / study["path"]).is_file())
                self.assertTrue(read_text(ROOT / code["path"]).strip())
                self.assertTrue(read_text(ROOT / study["path"]).strip())

    def test_every_guide_has_the_standard_sections_and_exact_source_link(self):
        for project in self.projects:
            with self.subTest(project=project["id"]):
                code = next(item for item in project["materials"] if item["id"] == "code")
                study = next(item for item in project["materials"] if item["id"] == "didactic")
                guide = read_text(ROOT / study["path"])
                self.assertRegex(guide, r"(?m)^#\s+.+$")
                positions = []
                for index, heading in enumerate(GUIDE_SECTIONS, start=1):
                    match = re.search(
                        rf"(?m)^##\s+{index}\.\s+{re.escape(heading)}$",
                        guide,
                    )
                    self.assertIsNotNone(
                        match,
                        f"{project['id']} is missing section {index}: {heading}",
                    )
                    positions.append(match.start())
                self.assertEqual(positions, sorted(positions))
                source_relative = "../" + str(Path(code["path"]).relative_to("projects"))
                self.assertIn(source_relative, guide)
                self.assertNotRegex(guide, r"(?m)^##\s+Guided code walkthrough$")

    def test_original_candidate_manager_is_not_the_refactored_version(self):
        source = read_text(ROOT / "projects" / "Intermediate" / "CandidateManager.java")
        self.assertIn("boolean shouldContinue = false;", source)
        self.assertRegex(source, r"do\s*\{")
        self.assertIn("while (shouldContinue);", source)
        self.assertIn("candidates.remove(candidatePosition);", source)
        self.assertIn("shouldContinue = scanner.nextBoolean();", source)
        self.assertNotIn("private static void removeCandidate", source)
        self.assertNotIn("private static int readInt", source)

    def test_original_vehicle_keeps_its_nested_vehicle_class(self):
        source = read_text(ROOT / "projects" / "Intermediate" / "Vehicle.java")
        self.assertIn("public static class vehicle", source)
        self.assertIn(
            "public vehicle(String name, String mark, String color, int horses, int year)",
            source,
        )
        self.assertIn(
            "new vehicle(nameVehicle, markVehicle, colorVehicle, horsesPotence, yearVehicle)",
            source,
        )
        self.assertNotIn("@Override", source)

    def test_study_page_renders_the_project_materials_array(self):
        html = read_text(ROOT / "project.html")
        script = read_text(ROOT / "js" / "project-study.js")
        self.assertIn('id="resource-options"', html)
        self.assertIn('id="resource-content"', html)
        self.assertIn("project.materials.forEach", script)
        self.assertIn("project.materials.find", script)
        self.assertIn('resource.type === "java"', script)
        self.assertIn('resource.type === "markdown"', script)
        self.assertIn("code.textContent = content", script)
        self.assertIn("navigator.clipboard.writeText(source)", script)

    def test_original_code_is_presented_without_formatting_or_rewriting(self):
        script = read_text(ROOT / "js" / "project-study.js")
        self.assertIn("code.textContent = content", script)
        self.assertNotIn("formatJavaSource", script)
        self.assertNotIn("highlightCode", script)

    def test_java_source_has_more_nonblank_lines_than_all_javascript_files(self):
        java_files = list((ROOT / "projects").rglob("*.java"))
        javascript_files = list(ROOT.rglob("*.js"))
        java_lines = sum(nonblank_lines(path) for path in java_files)
        javascript_lines = sum(nonblank_lines(path) for path in javascript_files)
        self.assertGreater(
            java_lines,
            javascript_lines,
            f"Java has {java_lines} nonblank lines, JavaScript has {javascript_lines}. "
            "Add real Java learning content or simplify JavaScript.",
        )

    def test_javasage_enforces_the_original_source_and_materials_standard(self):
        agent = read_text(ROOT / ".github" / "agents" / "JavaSage.agent.md")
        self.assertIn("materials", agent)
        self.assertIn(
            "Never modify, refactor, reformat, rename, or regenerate the original Java source",
            agent,
        )
        for heading in GUIDE_SECTIONS:
            self.assertIn(f"**{heading}**", agent)

    def test_project_catalogue_json_is_the_single_source_of_truth(self):
        adapter = read_text(ROOT / "js" / "project-data.js")
        self.assertIn("data/projects.json", adapter)
        self.assertFalse((ROOT / "js" / "code-notes.js").exists())
        self.assertFalse((ROOT / "js" / "lesson-parser.js").exists())


if __name__ == "__main__":
    unittest.main()
