"use client";
import { motion } from "framer-motion";

const Button = ({ children, onClick, className }) => {
	return (
		<motion.button
			onClick={onClick}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.95 }}
			className={`bg-[#fbeee0] border-2 border-[#422800] rounded-[30px] boxshadow 
        text-[#422800] font-semibold px-6 h-[50px] hover:bg-white active:button-game:active 
        active:translate-x-[2px] active:translate-y-[2px] ${className || ""}`}
		>
			{children}
		</motion.button>
	);
};

export default Button;
