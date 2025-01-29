import { motion } from "framer-motion";
import React from "react";

const ballVariants = {
	animate: {
		y: [0, -75, 0],
		scaleX: [1, 1, 1.5, 0.8, 1.1, 1],
		scaleY: [1, 1, 0.4, 1.2, 0.8, 1],
		transition: {
			duration: 1,
			repeat: Infinity,
			ease: [0, 0.5, 0.5, 1],
		},
	},
};

const Loader = () => {
	return (
		<div className="flex justify-center items-center">
			<div className="flex gap-4">
				{[
					{ color: "#99e2d0", delay: 0 },
					{ color: "#ff79da", delay: 0.1 },
					{ color: "#9356dc", delay: 0.2 },
				].map((group, groupIndex) => (
					<div
						key={groupIndex}
						className="flex flex-col justify-end items-center relative h-[100px] w-[40px]"
					>
						{[0, 1, 2].map((ball) => (
							<motion.div
								key={ball}
								className="absolute w-[30px] h-[30px] rounded-full"
								style={{
									backgroundColor: group.color,
									originY: 1,
								}}
								variants={ballVariants}
								animate="animate"
								initial={{ y: 0 }}
								transition={{
									delay: group.delay * ball,
									duration: 1,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Loader;
