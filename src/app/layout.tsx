import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "BrutalMirror 🤖 | Ρώτα, αλλά να αντέχεις...",
  description:
    "Brutal honesty meets Supabase and Next.js. Το πιο ειλικρινές AI που γνώρισες ποτέ.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "BrutalMirror",
    description:
      "Ρώτα. Θα πονέσει. Το πιο brutal AI που γνώρισες ποτέ.",
    url: "https://brutalmirror.vercel.app",
    siteName: "BrutalMirror",
    images: [
      {
        url: "https://brutalmirror.vercel.app/favicon.png",
        width: 512,
        height: 512,
        alt: "BrutalMirror Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el">
      <head />
      <body className="bg-gray-100 text-black">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-black text-white shadow">
          <h1 className="text-xl font-bold">BrutalMirror (preview)</h1>
          <Link href="/brutalchat" target="_blank" rel="noopener noreferrer">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
              💬 BrutalChat
            </button>
          </Link>
        </header>

        {/* Main Content */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
