import { connectToDB } from "@/lib/mongodb";
import { generateArticleContent } from "@/lib/gemini";
import Article from "@/models/article";

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return new Response(JSON.stringify({ error: "Topic is required" }), {
        status: 400,
      });
    }

    await connectToDB();

    const rawContent = await generateArticleContent(topic);

    const article = await Article.create({
      title: topic,
      slug: topic.toLowerCase().replace(/\s+/g, "-"),
      meta: "Auto-generated article on " + topic,
      content: rawContent,
      media: {},
    });

    return new Response(JSON.stringify({ success: true, article }), {
      status: 200,
    });
  } catch (err) {
    console.error("Generate Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
