import { connectToDB } from "@/lib/mongodb";
import Article from "@/models/article";

export async function generateMetadata({ params }) {
  const { slug } = params;
  await connectToDB();
  const article = await Article.findOne({ slug });

  return {
    title: article?.title || "TrendWise Article",
    description: article?.meta || "Explore the latest auto-generated tech blogs on TrendWise.",
    openGraph: {
      title: article?.title,
      description: article?.meta,
      url: `https://your-domain.com/article/${slug}`,
      siteName: "TrendWise",
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title,
      description: article?.meta,
    },
  };
}
