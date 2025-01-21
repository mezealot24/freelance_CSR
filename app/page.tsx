"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const Home = () => {
	const handleProtectionClick = () => {
		// handle protection button click
		window.location.href = "/scams";
	};

	const handleQuizClick = () => {
		// handle quiz button click
		window.location.href = "/quiz";
	};

	return (
		<section className="h-full relative bg-primary pt-32">
			<div className="container mx-auto h-full">
				<div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
					{/* Text */}
					<div className="text-center xl:text-left order-2 xl:order-none">
						<h1 className="h1 mb-6 text-accent">Digital Awareness</h1>
						{/* Buttons */}
						<div className="flex flex-col xl:flex-row items-center gap-8">
							<Button onClick={handleProtectionClick} className="">
								Protection
							</Button>
							<Button onClick={handleQuizClick} className="">
								Quiz
							</Button>
						</div>
					</div>

					{/* Photo */}
					<div className="order-1 xl:order-none mb-8 xl:mb-0">
						<Image
							src="/img/hero.jpg"
							alt="hero"
							width={500}
							height={333}
							priority
							className="rounded-lg shadow-lg"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
