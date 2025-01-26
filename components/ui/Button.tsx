"use client";
import { motion } from "framer-motion";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
	return (
		<motion.button
			onClick={onClick}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.95 }}
			className={`
        px-6 
        h-[50px] 
        font-semibold 
        border 
        border-black 
        rounded-md 
        bg-black 
        text-white 
        transition-all 
        duration-200
        hover:bg-[#ff90e8]
        hover:text-black
        hover:-translate-y-1
        hover:-translate-x-1
        hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        active:translate-x-0
        active:translate-y-0
        active:shadow-none
        ${className || ""}
      `}
		>
			{children}
		</motion.button>
	);
};

export default Button;
