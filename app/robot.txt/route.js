export async function GET() {
  const content = `User-agent: *
Allow: /
Sitemap: http://localhost:3000/sitemap.xml`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
