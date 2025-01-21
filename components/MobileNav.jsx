"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import path from "path";

const MobileNav = () => {
	const [activeItem, setActiveItem] = useState(null);
	const [isScrolled, setIsScrolled] = useState(false);

	// Add scroll event listener
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			setIsScrolled(scrollPosition > 50); // Change threshold as needed
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ id: 1, label: "Home", path: "/" },
		{ id: 2, label: "Scams", path: "/scams" },
		{ id: 3, label: "Quiz", path: "/quiz" },
		{ id: 4, label: "About", path: "/about" },
	];

	return (
		<nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
			{/* Top Tier - Brand */}
			<div
				className={`
          w-full h-16 flex items-center px-4 border-b border-gray-200
          transition-transform duration-300 ease-in-out
          ${isScrolled ? "-translate-y-16" : "translate-y-0"}
        `}
			>
				<ShieldCheck className="h-8 w-8 text-green-600" />
				<span className="ml-2 text-xl font-semibold text-gray-800">
					Digital Awareness
				</span>
			</div>

			{/* Bottom Tier - Navigation */}
			<div
				className={`w-full h-14 flex items-center justify-around
          transition-transform duration-300 ease-in-out
          ${isScrolled ? "-translate-y-16" : "translate-y-0"}`}
			>
				{navItems.map((item, index) => (
					<React.Fragment key={item.id}>
						<Link
							href={item.path}
							className={`
                relative px-4 py-2 text-gray-700 transition-colors duration-300
                hover:text-blue-600 group cursor-pointer
                ${activeItem === item.id ? "text-blue-600" : ""}
              `}
							onClick={() => setActiveItem(item.id)}
						>
							{item.label}
							<span
								className={`
                absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform origin-left
                transition-transform duration-300 scale-x-0
                group-hover:scale-x-100
                ${activeItem === item.id ? "scale-x-100" : ""}
              `}
							/>
						</Link>
						{index < navItems.length - 1 && (
							<div className="h-6 w-px bg-gray-300" />
						)}
					</React.Fragment>
				))}
			</div>
		</nav>
	);
};

export default MobileNav;
