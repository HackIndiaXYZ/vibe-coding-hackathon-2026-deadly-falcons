import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lumen.app"),
  title: { default: "Lumen — The AI chief of staff for founders", template: "%s · Lumen" },
  description: "Describe outcomes. Lumen executes. The AI-native operating system for founders.",
  openGraph: {
    title: "Lumen — The AI chief of staff for founders",
    description: "Describe outcomes. Lumen executes.",
    url: "https://lumen.app",
    siteName: "Lumen",
    type: "website",
  },
  twitter: { card: "summary_large_image", creator: "@lumenhq" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Dark mode is hardcoded — no next-themes needed.
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
