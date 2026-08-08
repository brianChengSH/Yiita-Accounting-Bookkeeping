import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "dist", "client");
const routes = ["關於", "副本-people"];

for (const route of routes) {
  const encodedRoute = encodeURIComponent(route);

  await Promise.all([
    copyFile(join(outputDirectory, `${encodedRoute}.html`), join(outputDirectory, `${route}.html`)),
    copyFile(join(outputDirectory, `${encodedRoute}.rsc`), join(outputDirectory, `${route}.rsc`)),
    mkdir(join(outputDirectory, route), { recursive: true }).then(() =>
      copyFile(join(outputDirectory, `${encodedRoute}.html`), join(outputDirectory, route, "index.html")),
    ),
  ]);
}
