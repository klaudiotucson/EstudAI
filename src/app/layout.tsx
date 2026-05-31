import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EstudAI Premium",
  description: "Aprenda qualquer coisa com IA Premium, mapas mentais e simulados adaptativos.",
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
