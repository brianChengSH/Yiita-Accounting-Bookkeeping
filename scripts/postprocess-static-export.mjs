import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const outputDirectory = join(process.cwd(), "dist", "client");

async function listExportFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return listExportFiles(path);
    return entry.isFile() && /\.(?:html|rsc)$/.test(entry.name) ? [path] : [];
  }));
  return files.flat();
}

const exportFiles = await listExportFiles(outputDirectory);

for (const file of exportFiles) {
  const exportPath = relative(outputDirectory, file).split(sep).join("/");
  const isEnglishRoute = exportPath === "en.html"
    || exportPath === "en.rsc"
    || exportPath.startsWith("en/");

  if (!isEnglishRoute) continue;

  const source = await readFile(file, "utf8");
  const localized = source
    .replaceAll('<html lang="zh-Hant"', '<html lang="en"')
    .replaceAll('"lang":"zh-Hant"', '"lang":"en"')
    .replaceAll('\\"lang\\":\\"zh-Hant\\"', '\\"lang\\":\\"en\\"');

  if (localized !== source) await writeFile(file, localized);
}
