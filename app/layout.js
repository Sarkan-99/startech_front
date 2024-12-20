import localFont from "next/font/local";
import "./globals.css";
import { LoadingProvider } from './contexts/LoadingContext';
import Loading from './components/Loading';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "StarTech",
  description: "Created by Cinf",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Mini-logo.png" />
        <title>StarTech</title>
       
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LoadingProvider>
          <Loading />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
