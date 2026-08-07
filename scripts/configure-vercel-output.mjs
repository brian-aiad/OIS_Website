#!/usr/bin/env node

import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

const [configArg, staticArg] = process.argv.slice(2);

if (!configArg || !staticArg) {
  console.error(
    "Usage: node scripts/configure-vercel-output.mjs <config.json> <static-directory>",
  );
  process.exit(1);
}

const configPath = resolve(configArg);
const staticDirectory = resolve(staticArg);

async function collectIndexFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectIndexFiles(entryPath)));
    } else if (entry.isFile() && entry.name === "index.html") {
      files.push(entryPath);
    }
  }

  return files;
}

const [configInfo, staticInfo] = await Promise.all([
  stat(configPath),
  stat(staticDirectory),
]);

if (!configInfo.isFile()) {
  throw new Error(`Vercel output config is not a file: ${configPath}`);
}

if (!staticInfo.isDirectory()) {
  throw new Error(`Vercel static output is not a directory: ${staticDirectory}`);
}

const config = JSON.parse(await readFile(configPath, "utf8"));
const indexFiles = await collectIndexFiles(staticDirectory);
const overrides = { ...(config.overrides ?? {}) };
const routePaths = new Set();

for (const indexFile of indexFiles) {
  const outputPath = relative(staticDirectory, indexFile).split(sep).join("/");
  if (outputPath === "index.html") continue;

  const suffix = "/index.html";
  if (!outputPath.endsWith(suffix)) {
    throw new Error(`Unexpected prerendered page path: ${outputPath}`);
  }

  const routePath = outputPath.slice(0, -suffix.length);
  if (!routePath || routePaths.has(routePath)) {
    throw new Error(`Duplicate or empty canonical output path: ${routePath}`);
  }

  routePaths.add(routePath);
  overrides[outputPath] = {
    ...(overrides[outputPath] ?? {}),
    path: routePath,
  };
}

if (routePaths.size === 0) {
  throw new Error("No non-home prerendered pages were found in Vercel static output");
}

// A bare cleanUrls flag is not sufficient for nested route/index.html files.
// Build Output API overrides publish each file at its canonical clean path.
delete config.cleanUrls;
config.overrides = overrides;

await writeFile(configPath, `${JSON.stringify(config)}\n`, "utf8");
console.log(
  `Configured ${routePaths.size} canonical prerendered paths in ${configPath}`,
);
