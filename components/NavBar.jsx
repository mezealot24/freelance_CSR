"use client";

import React, { useState } from "react";
import Link from "next/link";
import path from "path";

const NavBar = () => {
	const [activeItem, setActiveItem] = useState(1);

	const navItems = [
		{ id: 1, label: "Home", path: "/" },
		{ id: 2, label: "Scams", path: "/scams" },
		{ id: 3, label: "Quiz", path: "/quiz" },
		{ id: 4, label: "About", path: "/about" },
	];

	return (
		<nav className="flex items-center gap-8">
			{navItems.map((item) => (
				<Link
					key={item.id}
					href={item.path}
					className={`
			  relative px-4 py-2 text-gray-700 transition-colors duration-300
			  hover:text-grey group cursor-pointer text-lg font-medium
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
			))}
		</nav>
	);
};

export default NavBar;
