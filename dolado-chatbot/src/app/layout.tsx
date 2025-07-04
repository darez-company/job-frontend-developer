import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dolado Chatbot",
  description: "Assistente virtual de consultoria da Dolado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
