import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { UserProvider } from "../context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Scam Awareness",
	description: "Generated by Mezealot",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full bg-primary text-primary">
			<body className={inter.className}>
				<UserProvider>{children}</UserProvider>
			</body>
		</html>
	);
}
