"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/Button";

const Home = () => {
	const handleProtectionClick = () => {
		window.location.href = "/form";
	};

	/* 	const handleQuizClick = () => {
		window.location.href = "/quiz";
	}; */

	return (
		<section className="min-h-screen flex items-center justify-center">
			<div className="container mx-auto relative z-10">
				<div className="flex flex-col xl:flex-row items-center justify-between xl:min-h-[calc(100vh-4rem)]">
					{/* Text */}
					<div className="text-center xl:text-left w-full xl:w-1/2 order-2 xl:order-none">
						<h1 className="mb-6 text-accent text-3xl">Digital Awareness</h1>
						{/* Buttons */}
						<div className="flex flex-col xl:flex-row items-center gap-8">
							<Button variant="comic" onClick={handleProtectionClick}>
								Survey
							</Button>
							{/* 							<Button variant="comic" onClick={handleQuizClick}>
								Quiz
							</Button> */}
						</div>
					</div>

					{/* Photo */}
					<div className="order-1 xl:order-none mb-8 xl:mb-0 w-full xl:w-1/2 flex justify-center">
						<Image
							src="/images/hero.png"
							alt="hero"
							width={500}
							height={333}
							priority
							className="rounded-lg shadow-lg max-w-full"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
