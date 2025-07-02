import "./globals.css";
import ClientWrapper from "./client-wrapper";
import { Providers } from "./providers";

export const metadata = {
  title: "TrendWise - AI-Powered Blogging",
  description:
    "Auto-generate SEO-optimized blog posts using AI with TrendWise.",
  openGraph: {
    title: "TrendWise - AI-Powered Blogging",
    description: "AI-driven SEO blog generator using Gemini and Next.js",
    url: "https://trend-wise-seven.vercel.app/",
    siteName: "TrendWise",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrendWise",
    description: "Create and browse AI-generated SEO blogs instantly.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white">
        <Providers>
          <ClientWrapper>
            <main className="flex-grow">{children}</main>
          </ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
