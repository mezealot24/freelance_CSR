"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const generateBubbles = (count = 20) => {
	// Calculate viewport dimensions
	const viewportWidth =
		typeof window !== "undefined" ? window.innerWidth : 1920;
	const viewportHeight =
		typeof window !== "undefined" ? window.innerHeight : 1080;

	return Array(count)
		.fill(0)
		.map((_, i) => {
			// Make bubble size responsive to viewport
			const maxSize = Math.min(viewportWidth, viewportHeight) * 0.1; // 10% of smallest viewport dimension
			const minSize = Math.min(viewportWidth, viewportHeight) * 0.02; // 2% of smallest viewport dimension
			const size = Math.random() * (maxSize - minSize) + minSize;

			// Ensure bubbles start and animate within safe boundaries
			// Leave padding equal to bubble size
			return {
				x: Math.random() * (viewportWidth - size),
				y: Math.random() * (viewportHeight - size),
				size,
				color: `hsl(${Math.random() * 360}, 80%, 60%)`,
				// Randomize animation duration and delay
				duration: 3 + Math.random() * 2,
				delay: Math.random() * -2,
			};
		});
};

export default function ThankYouPage() {
	const [bubbles, setBubbles] = useState([]);
	const [dimensions, setDimensions] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		// Initial dimensions
		setDimensions({
			width: window.innerWidth,
			height: window.innerHeight,
		});

		// Generate initial bubbles
		setBubbles(generateBubbles());

		// Handle resize
		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
			setBubbles(generateBubbles());
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="fixed inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center overflow-hidden">
			{bubbles.map((bubble, index) => (
				<motion.div
					key={index}
					className="absolute rounded-full opacity-70"
					style={{
						width: bubble.size,
						height: bubble.size,
						backgroundColor: bubble.color,
					}}
					initial={{
						x: bubble.x,
						y: bubble.y,
					}}
					animate={{
						x: [
							bubble.x,
							bubble.x + Math.min(100, dimensions.width * 0.05),
							bubble.x,
						],
						y: [
							bubble.y,
							bubble.y + Math.min(100, dimensions.height * 0.05),
							bubble.y,
						],
					}}
					transition={{
						duration: bubble.duration,
						repeat: Infinity,
						repeatType: "reverse",
						delay: bubble.delay,
						ease: "easeInOut",
					}}
				/>
			))}
			<motion.div
				className="relative z-10 text-center px-4"
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.5, type: "spring" }}
			>
				<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-shadow">
					Thank You!
				</h1>
			</motion.div>
		</div>
	);
}
