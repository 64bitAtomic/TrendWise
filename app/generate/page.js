'use client';
import { useState } from 'react';

export default function GeneratePage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);

 const generate = async () => {
  setLoading(true);
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ topic }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      setArticle(data.article);
    } else {
      console.error("Server Error:", data.error);
      alert("Failed: " + data.error);
    }
  } catch (error) {
    console.error("Client Error:", error);
    alert("Something went wrong.");
  }
  setLoading(false);
};

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Generate Article</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic..."
        className="p-2 border rounded mr-2"
      />
      <button onClick={generate} className="bg-blue-600 text-white px-4 py-2 rounded">
        Generate
      </button>

      {loading && <p>Generating article...</p>}

      {article && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">{article.title}</h2>
          <p className="mt-2 whitespace-pre-wrap">{article.content}</p>
        </div>
      )}
    </div>
  );
}
