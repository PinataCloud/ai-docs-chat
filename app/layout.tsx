import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata: any = {
  title: "Pinata Docs Chat",
  description: "An AI chat app trained exclusively on Pinata's developer docs.",
  images: [
    {
      url: 'https://tutorials.mypinata.cloud/ipfs/bafybeiemz43bqzqxbtktrka3bdrwh2qhymc56flnqatvch4pprffqqakxe', // Must be an absolute URL
      width: 800,
      height: 600,
    }   
  ],
  twitter: {
    card: 'summary_large_image',
    title: "Pinata Docs Chat",
    description: "An AI chat app trained exclusively on Pinata's developer docs.",  
    images: ['https://tutorials.mypinata.cloud/ipfs/bafybeiemz43bqzqxbtktrka3bdrwh2qhymc56flnqatvch4pprffqqakxe'], // Must be an absolute URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-bgColor">
      <body
        className={`antialiased font-body`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
