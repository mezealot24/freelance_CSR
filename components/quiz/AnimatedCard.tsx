import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface AnimatedCardProps {
	isVisible: boolean; // Prop to control animation based on visibility
}

const AnimatedCard = ({ isVisible }: AnimatedCardProps) => {
	const [animateCard, setAnimateCard] = useState(false);

	useEffect(() => {
		if (isVisible) {
			setAnimateCard(true);
		}
	}, [isVisible]);

	return (
		<motion.div
			className="w-[280px] h-[280px] relative"
			animate={animateCard ? { scale: 1.02 } : {}}
			transition={{ duration: 0.5, ease: "easeInOut" }}
		>
			<Card className="w-full h-full bg-white rounded-[32px] p-3 relative shadow-[#604b4a30_0px_70px_30px_-50px] overflow-hidden">
				<motion.div
					className="absolute bottom-3 left-3 right-3 bg-[#fbb9b6] rounded-[29px] z-[2] shadow-[rgba(96,75,74,0.19)_0px_5px_5px_0px_inset] overflow-hidden"
					initial={{ top: "80%" }}
					animate={
						animateCard
							? { top: "20%", borderRadius: "80px 29px 29px 29px" }
							: {}
					}
					transition={{
						duration: 0.5,
						ease: [0.645, 0.045, 0.355, 1],
						delay: 0.2,
					}}
				>
					<CardContent className="absolute bottom-0 left-6 right-6 h-40">
						<div className="space-y-4">
							<h3 className="font-semibold">Card Title</h3>
							<p className="text-sm">Card content goes here</p>
							<button className="bg-white text-[#fbb9b6] text-xs rounded-[20px] px-2.5 py-1.5 shadow-[rgba(165,132,130,0.13)_0px_5px_5px_0px] border-none">
								Button
							</button>
						</div>
					</CardContent>
				</motion.div>
			</Card>
		</motion.div>
	);
};

export default AnimatedCard;
