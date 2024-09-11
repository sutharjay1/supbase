"use client";

import ConvexClientProvider from "@/components/provider/convex-client-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/provider/modal-provider";
import { Suspense } from "react";
import Loading from "@/components/auth/loading";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen scroll-smooth bg-background font-sans antialiased",
          inter.className,
        )}
      >
        <Toaster />
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <TooltipProvider>
              <ModalProvider />
              {children}
            </TooltipProvider>
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
