import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");

// Runtime contract: entry.txt alone decides what this program outputs.
// Nothing is embedded in this file — the line lives only in entry.txt,
// so swapping the entry file is enough to change the submission.
// This file copies entry.txt verbatim to the output directory, never
// inventing or altering a single character of the winning line.
if (text.length < 1 || text.length > 160 || text.trim().length === 0) {
  console.error(`entry.txt must be 1-160 characters, got ${text.length}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
