import type { Metadata } from "next";
import { inter, geistMono, ppMori, ppPangram } from "./fonts";
// When PP Pangram Sans Rounded font files are added:
// import { inter, geistMono, ppMori, ppPangramSans } from "./fonts";
import "./globals.css";

// Default theme
import "@splidejs/react-splide/css";

// or only core styles
import "@splidejs/react-splide/css/core";

export const metadata: Metadata = {
  title: {
    default: "Snick — Your Free-To-Play Game Hub",
    template: "%s | Snick",
  },
  description:
    "Discover and play the best free browser-based board games, party games, and multiplayer games. Sneak click only!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${ppPangram.variable} ${ppMori.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
