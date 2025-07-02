import { connectToDB } from "@/lib/mongodb";
import Article from "@/models/article";

export async function GET() {
  await connectToDB();
  const articles = await Article.find();

  const urls = articles
    .map((a) => {
      return `<url>
  <loc>https://trend-wise-seven.vercel.app/article/${a.slug}</loc>
  <lastmod>${new Date(a.createdAt).toISOString()}</lastmod>
</url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
