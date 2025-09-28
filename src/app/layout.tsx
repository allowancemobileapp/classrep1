import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import StarfieldBackground from "@/components/cosmic/starfield-background";
import CosmicElements from "@/components/cosmic/cosmic-elements";

export const metadata: Metadata = {
  title: "Class-Rep: Cosmic Edition",
  description: "Your timetable, evolved. Join the mission.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="https://pjabgadtwtszzljyzvdt.supabase.co/storage/v1/object/public/public-downloads/app_icon_foreground.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <StarfieldBackground />
        <CosmicElements />
        <main className="relative z-10">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
