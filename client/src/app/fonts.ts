/**
 * Font Definitions — Board Game Hub (Snick)
 *
 * Design system fonts (from Figma):
 *   - PP Mori                 → Display / headings (--font-pp-mori)
 *   - PP Pangram Sans Rounded → Body / UI text     (--font-pp-pangram) [not yet available]
 *
 * PP Mori files available: ExtraLight, Regular, SemiBold (+ italic variants)
 * Figma uses Regular (400), Medium (500), Semibold (600), Bold (700).
 * We map: Regular → 400, Regular → 500 (closest match), SemiBold → 600–700.
 */

import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

/* =================================================================
   Google Fonts — Inter (body fallback) + Geist Mono
   ================================================================= */

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* =================================================================
   Local Font — PP Mori (Display / Headings)

   Available weights: ExtraLight (200), Regular (400), SemiBold (600)
   Each has a matching italic variant.
   ================================================================= */

export const ppMori = localFont({
  src: "./fonts/pp-mori/pp-mori-variable.ttf",
  weight: "100 900",
  style: "normal",
  variable: "--font-pp-mori",
});

export const ppPangram = localFont({
  src: "./fonts/pp-pangram-sans/pp-pangram-sans.ttf",
  weight: "100 900",
  style: "normal",
  variable: "--font-pp-pangram",
});
