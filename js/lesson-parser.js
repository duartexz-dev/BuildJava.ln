const WALKTHROUGH_HEADING = /^## Guided code walkthrough\s*$/m;
const SECTION_HEADING = /^###\s+(.+?)\s*$/gm;

export function parseGuidedWalkthrough(markdown) {
  if (typeof markdown !== "string") {
    throw new TypeError("The study guide must be a Markdown string.");
  }

  const heading = WALKTHROUGH_HEADING.exec(markdown);
  if (!heading) return [];

  const start = heading.index + heading[0].length;
  const remaining = markdown.slice(start);
  const nextMainHeading = remaining.search(/^##\s+(?!#)/m);
  const body = nextMainHeading === -1 ? remaining : remaining.slice(0, nextMainHeading);
  const headings = [...body.matchAll(SECTION_HEADING)];

  return headings.map((match, index) => {
    const sectionStart = match.index + match[0].length;
    const sectionEnd = index + 1 < headings.length ? headings[index + 1].index : body.length;
    const sectionBody = body.slice(sectionStart, sectionEnd).trim();
    const anchorMatch = sectionBody.match(/^\*\*Anchor:\*\*\s+\x60([^\x60]+)\x60\s*$/m);
    const termsMatch = /^\*\*Terms\*\*\s*$/m.exec(sectionBody);

    if (!anchorMatch) {
      throw new Error("Missing **Anchor:** in walkthrough section: " + match[1]);
    }
    if (!termsMatch) {
      throw new Error("Missing **Terms** list in walkthrough section: " + match[1]);
    }

    const explanation = sectionBody
      .slice(anchorMatch.index + anchorMatch[0].length, termsMatch.index)
      .trim()
      .replace(/^\*\*Explanation:\*\*\s*/m, "");

    if (!explanation) {
      throw new Error("Missing explanation text in walkthrough section: " + match[1]);
    }

    const termLines = sectionBody.slice(termsMatch.index + termsMatch[0].length).split(/\r?\n/);
    const items = termLines
      .map((line) => line.match(/^\s*-\s+\x60([^\x60]+)\x60:\s*(.+)$/))
      .filter(Boolean)
      .map((item) => ({ term: item[1], meaning: item[2].trim() }));

    if (items.length === 0) {
      throw new Error("No term definitions in walkthrough section: " + match[1]);
    }

    return {
      title: match[1].trim(),
      anchor: anchorMatch[1],
      explanation,
      items
    };
  });
}
