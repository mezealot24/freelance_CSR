import "@/app/globals.css";
import { Inter, Prompt } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });
const prompt = Prompt({ subsets: ["thai"], weight: "400" });

export const metadata = {
	title: "Behind the Screen - ทดสอบความรู้เกี่ยวกับการหลอกลวงออนไลน์",
	description:
		"แบบทดสอบเพื่อประเมินความรู้เกี่ยวกับการหลอกลวงออนไลน์และการป้องกันตัวเอง",
	generator: "v0.dev",
};

export default function RootLayout({ children }) {
	return (
		<html lang="th" suppressHydrationWarning>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
			</head>
			<body
				className={`${inter.className} ${prompt.className}`}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem={false}
					disableTransitionOnChange
				>
					<UserProvider>{children}</UserProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

import "./globals.css";
