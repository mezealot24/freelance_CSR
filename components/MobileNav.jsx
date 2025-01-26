"use client";

import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";

const links = [
	{ name: "Home", path: "/" },
	{ name: "Scams", path: "/scams" },
	{ name: "Quiz", path: "/quiz" },
	{ name: "About", path: "/about" },
];

const MobileNav = () => {
	const pathname = usePathname();
	return (
		<Sheet>
			<SheetTrigger className="flex justify-center items-center">
				<Menu className="text-[32px] text-accent" />
			</SheetTrigger>
			<SheetContent className="flex flex-col">
				<SheetTitle className="sr-only">Navigation Menu</SheetTitle>
				{/* logo */}
				<div className="mt-32 mb-40 text-center text-2xl text-gray-600">
					<Link href="/">
						<h1 className="text-4xl font-semibold">
							Digital Awareness<span className="text-grey-100">.</span>
						</h1>
					</Link>
				</div>
				{/* nav links */}
				<nav className="flex flex-col justify-center items-center gap-6 text-gray-500">
					{links.map((link, index) => (
						<Link
							key={index}
							href={link.path}
							className={`${
								pathname === link.path ? "text-pink-500" : "text-black-500"
							} text-2xl capitalize`}
						>
							{link.name}
						</Link>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
