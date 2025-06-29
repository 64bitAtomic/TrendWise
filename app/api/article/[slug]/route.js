import { connectToDB } from "@/lib/mongodb";
import Article from "@/models/article";

export async function DELETE(req, { params }) {
  const { slug } = params;
  await connectToDB();
  const deleted = await Article.findOneAndDelete({ slug });

  if (!deleted) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ success: true }));
}

export async function PUT(req, { params }) {
  const { slug } = params;
  const { title, content } = await req.json();

  await connectToDB();
  const updated = await Article.findOneAndUpdate(
    { slug },
    { title, content },
    { new: true }
  );

  return Response.json(updated);
}
