'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ArticlePage(props) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === "zk286187@gmail.com"; 
  console.log("Logged in as:", session?.user?.email);
// Replace with your email
  const [slug, setSlug] = useState(null);
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 🧠 Extract slug safely from dynamic route
  useEffect(() => {
  const s = props?.params?.slug;
  if (s) setSlug(s);
}, []);


  // 📥 Fetch article + comments when slug is ready
  useEffect(() => {
    if (!slug) return;

    fetch(`/api/article`)
      .then(res => res.json())
      .then(data => {
        const match = data.find((a) => a.slug === slug);
        setArticle(match);
      });

    fetch(`/api/comment?slug=${slug}`)
      .then(res => res.json())
      .then(setComments);
  }, [slug]);

  
const handleDelete = async () => {
  if (confirm("Are you sure you want to delete this article?")) {
    const res = await fetch(`/api/article/${slug}`, { method: "DELETE" });
    if (res.ok) {
      window.location.href = "/";
    } else {
      alert("Delete failed.");
    }
  }
}

  const handleSubmit = async () => {
    const res = await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        articleSlug: slug,
        content: newComment,
        user: {
          name: session.user.name,
          email: session.user.email,
        },
      }),
    });

    const posted = await res.json();
    setComments([posted, ...comments]);
    setNewComment("");
  };

  if (!slug || !article) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="whitespace-pre-wrap mb-10">{article.content}</div>

      <div className="mt-10">
        {isAdmin && (
  <div className="mb-6 flex gap-4">
    <button
      onClick={() => window.location.href = `/article/${slug}/edit`}
      className="px-4 py-2 bg-yellow-500 text-white rounded"
    >
      Edit
    </button>
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded"
    >
      Delete
    </button>
  </div>
)}

        <h2 className="text-xl font-semibold mb-2">Comments</h2>

        {session ? (
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full border rounded p-2"
            />
            <button
              onClick={handleSubmit}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Post Comment
            </button>
          </div>
        ) : (
          <p className="text-gray-400 mb-4">Please sign in to comment.</p>
        )}

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul>
            {comments.map((c) => (
              <li key={c._id} className="mb-3">
                <p className="text-sm text-gray-400">
                  {c.user.name} — {new Date(c.createdAt).toLocaleString()}
                </p>
                <p>{c.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
