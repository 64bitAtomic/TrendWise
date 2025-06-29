import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateArticleContent(topic) {
  //const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(`
Write a short SEO-optimized blog article about "${topic}".
Include:
- Title
- Meta description
- H1 and H2 headings
- Bullet points or paragraphs
Return as plain text or markdown.
  `);

  const response = await result.response;
  const text = response.text();

  return text;
}
