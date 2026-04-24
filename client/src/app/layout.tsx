import type { Metadata } from "next";
import Script from "next/script";
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
      <body className="min-h-full">
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
          </Script>
        )}
        {children}
      </body>
    </html>
  );
}
