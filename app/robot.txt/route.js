export async function GET() {
  const content = `User-agent: *
Allow: /
Sitemap: https://trend-wise-seven.vercel.app/`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
