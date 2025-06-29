import { connectToDB } from "@/lib/mongodb";
import Comment from "@/models/comment";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  await connectToDB();
  const comments = await Comment.find({ articleSlug: slug }).sort({ createdAt: -1 });
  return Response.json(comments);
}

export async function POST(req) {
  const body = await req.json();
  const { articleSlug, user, content } = body;

  if (!content || !user?.email) {
    return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
  }

  await connectToDB();

  const comment = await Comment.create({
    articleSlug,
    user,
    content,
  });

  return Response.json(comment);
}
