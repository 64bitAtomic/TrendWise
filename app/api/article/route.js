import { connectToDB } from "@/lib/mongodb";
import Article from "@/models/article";

export async function GET() {
  await connectToDB();
  const articles = await Article.find().sort({ createdAt: -1 });
  return Response.json(articles);
}
