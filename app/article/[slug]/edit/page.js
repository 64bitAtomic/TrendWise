'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPage({ params }) {
  const slug = params.slug;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/api/article")
      .then(res => res.json())
      .then(data => {
        const article = data.find((a) => a.slug === slug);
        if (article) {
          setTitle(article.title);
          setContent(article.content);
        }
      });
  }, [slug]);

  const handleUpdate = async () => {
    const res = await fetch(`/api/article/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push(`/article/${slug}`);
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <input
        className="w-full mb-4 p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className="w-full mb-4 p-2 border rounded h-60"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded">
        Save Changes
      </button>
    </div>
  );
}
