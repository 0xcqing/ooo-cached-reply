import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I'm on vacation. Your email is cached until Monday, when I will answer it with total confidence and no memory of ever reading it.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 160;

function fail(reason: string): never {
  console.error(`invalid entry: ${reason}`);
  process.exit(1);
}

function charLength(value: string): number {
  return [...value].length;
}

function byteLength(value: string): number {
  return Buffer.byteLength(value, "utf8");
}

function validateText(value: string): void {
  const chars = charLength(value);
  if (chars < MIN_LENGTH || chars > MAX_LENGTH) {
    fail(`character count ${chars} is outside ${MIN_LENGTH}..${MAX_LENGTH}`);
  }
  const bytes = byteLength(value);
  if (bytes < MIN_LENGTH || bytes > MAX_LENGTH) {
    fail(`byte count ${bytes} is outside ${MIN_LENGTH}..${MAX_LENGTH}`);
  }
  if (value.trim().length === 0) {
    fail("text is only white space");
  }
  if (/[\r\n]/.test(value)) {
    fail("text contains a newline character");
  }
  if (!value.includes(" ")) {
    fail("text contains no ASCII space");
  }
}

function report(outPath: string, text: string, chars: number, bytes: number): string {
  return [
    `path: ${outPath}`,
    `text: ${text}`,
    `characters: ${chars}`,
    `bytes: ${bytes}`,
  ].join("\n");
}

function resolveOutputDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  return dir;
}

function writeEntry(dir: string, text: string): string {
  const outPath = join(dir, "entry.txt");
  writeFileSync(outPath, text + "\n", "utf8");
  return outPath;
}

function verifyReadBack(outPath: string, text: string): void {
  const written = readFileSync(outPath);
  const expected = Buffer.from(text + "\n", "utf8");
  if (!written.equals(expected)) {
    fail("read-back bytes do not match what was written");
  }
}

function main(): void {
  validateText(TEXT);

  const dir = resolveOutputDir();
  const outPath = writeEntry(dir, TEXT);
  verifyReadBack(outPath, TEXT);

  const chars = charLength(TEXT);
  const bytes = byteLength(TEXT);

  console.log(report(outPath, TEXT, chars, bytes));
}

main();
