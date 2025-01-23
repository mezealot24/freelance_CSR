"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

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
		<BackgroundBeamsWithCollision>
			<section className="h-full relative pt-32 pb-16 xl:pb-32">
				<div className="container mx-auto max-h-screen ">
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
								src="/images/hero.png"
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
		</BackgroundBeamsWithCollision>
	);
};

export default Home;
