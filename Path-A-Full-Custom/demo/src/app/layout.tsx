import { Outfit } from "next/font/google";
import "./globals.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import { ClientProviders } from "@/components/providers/ClientProviders";

// Disable static generation for all routes to prevent clientReferenceManifest errors
export const dynamic = 'force-dynamic';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
