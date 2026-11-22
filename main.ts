// Do Not Run This in Front of Fifty People — a one-line joke about
// working beside AI coding agents.
//
// The program writes the joke to /output/entry.txt. The joke must stay one
// line of 1 to 280 characters, so the program checks its own length before
// writing and refuses to emit anything outside that range.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { Buffer } from "node:buffer";

const JOKE =
  "The demo crashed live, so my agent fixed it by adding a comment above the bug: // do not run this in front of fifty people.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

const length = [...JOKE].length;
if (length < 1 || length > 280 || JOKE.trim().length === 0) {
  throw new Error(`joke is ${length} characters, outside the 1-280 range`);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("joke must be a single line");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, JOKE, "utf8");

// Read back and verify the written bytes match the joke exactly, so a
// partial or failed write is caught here instead of silently passing.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== JOKE) {
  throw new Error("written entry does not match the joke");
}

// The gate counts Unicode code points, not bytes, but the file must also
// be valid UTF-8 with no trailing newline or extra whitespace sneaking in.
const bytes = Buffer.byteLength(written, "utf8");
if (written !== written.trim()) {
  throw new Error("written entry has leading or trailing whitespace");
}

console.log(`wrote ${length} characters (${bytes} bytes) to ${OUT_FILE}`);
