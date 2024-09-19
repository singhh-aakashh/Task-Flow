import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider"
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons:"fuzzieLogo.png",
  title: "TaskFlow",
  description: "Automate Your Work With TaskFlow",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider>
            {children}
             <Toaster/>
            </ModalProvider>
          </ThemeProvider>
        </body>
    </html>
  );
}
