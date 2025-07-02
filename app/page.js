import Link from "next/link";

async function getArticles() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/article`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <div className="p-4 sm:p-6">
      {/* Header with title and generate button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Latest Articles</h1>
        <Link
          href="/generate"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-center w-full sm:w-auto"
        >
          ✍️ Generate Article
        </Link>
      </div>

      {/* No articles fallback */}
      {articles.length === 0 && (
        <p className="text-gray-400">No articles found.</p>
      )}

      {/* Article list */}
      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <Link key={article._id} href={`/article/${article.slug}`}>
            <div className="p-4 border rounded hover:bg-gray-800 hover:text-white transition cursor-pointer">
              <h2 className="text-lg sm:text-xl font-semibold">
                {article.title}
              </h2>
              <p className="text-sm text-gray-400">{article.meta}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
