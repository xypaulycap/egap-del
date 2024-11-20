import Header from "@/components/layout/Header";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/AppContext";
import { Toaster } from "react-hot-toast";


const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Egapswiftbuy",
  description: "Shop a wide range of quality products at competitive prices. We offer wholesale and retail options for essentials like rice, groundnut oil, Bonvita, Cadbury chocolates, spices, cleaning products, and much more. Perfect for households, businesses, and bulk orders. Fast delivery and great customer service!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Toaster />
          <Header />
          {children}
          <footer className="border-t p-6 text-center text-gray-500 mt-16">
            &copy; 2024 All rights reserved
          </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
