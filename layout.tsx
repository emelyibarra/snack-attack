import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Snack Attack: Frenchie Edition", description: "A chaotic multiplayer Frenchie treat game" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
