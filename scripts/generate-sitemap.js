import { SitemapStream } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = "https://profitlenz.netlify.app";

const sitemap = new SitemapStream({ hostname });

const writeStream = createWriteStream(
  path.resolve(__dirname, "../public/sitemap.xml"),
);

sitemap.pipe(writeStream);

const pages = ["/", "/all-calculators", "/faqs", "/pro"];

pages.forEach((page) => {
  sitemap.write({
    url: page,
    changefreq: "weekly",
    priority: page === "/" ? 1.0 : 0.8,
  });
});

sitemap.end();

writeStream.on("finish", () => {
  console.log("✅ Sitemap generated successfully!");
});
