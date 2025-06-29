'use client';
import { useEffect, useState } from "react";

export default function TestDB() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    fetch("/api/article").then(res => {
      setStatus(res.ok ? "Connected to DB ✅" : "Failed ❌");
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl">MongoDB Test</h1>
      <p>Status: {status}</p>
    </div>
  );
}
