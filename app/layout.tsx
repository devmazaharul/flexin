import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "./__global_components/Header";
import { appConfig } from "@/constant/app.config";
import Footer from "./__global_components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FlexIn - Trusted with us",
    template: "%s | FlexIn", // dynamic page এ ব্যবহার হবে
  },
  description: "FlexIn is a trusted platform providing secure services with modern technology.",
  keywords: ["FlexIn", "Fintech", "Payments", "Secure Platform", "Next.js SEO"],
  authors: [{ name: "FlexIn Team" }],
  creator: "FlexIn",
  publisher: "FlexIn",

  // Open Graph for Facebook / LinkedIn
  openGraph: {
    type: "website",
    url: `${appConfig.hostname}`, // তোমার আসল ডোমেইন দাও
    title: "FlexIn - Trusted with us",
    description: "FlexIn is a trusted platform providing secure services with modern technology.",
    siteName: "FlexIn",
    images: [
      {
        url: "https://flexin.mazaharul.site/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdk3f19ace%2Fimage%2Fupload%2Fv1756907407%2Fflexin%2Fj1dwacsw1xtnsnhksbnt.webp&w=1080&q=75", 
        width: 1200,
        height: 630,
        alt: "FlexIn - Trusted with us",
      },
    ],
    locale: "en_US",
  },

  // Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "FlexIn - Trusted with us",
    description: "FlexIn is a trusted platform providing secure services with modern technology.",
    images: ["https://flexin.mazaharul.site/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdk3f19ace%2Fimage%2Fupload%2Fv1756907407%2Fflexin%2Fj1dwacsw1xtnsnhksbnt.webp&w=1080&q=75"],
    creator: "@flexin", // তোমার Twitter handle থাকলে দাও
  },

  // Canonical link
  alternates: {
    canonical: "https://flexin.com",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-[95%] mx-auto">
          <div>
            <Header />
          </div>
          {children}
        </div>
<Footer/>

        <Toaster
          position="top-center"
          closeButton
          expand={false}
          duration={3000}
          visibleToasts={5}
          toastOptions={{
            style: {
              maxWidth: "20rem",
              width: "auto",
            },
          }}
        />
      </body>
    </html>
  );
}
