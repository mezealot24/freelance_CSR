import React from "react";
import { motion } from "framer-motion";

import { HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
	variant?: "comic";
	size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "comic", size = "default", ...props }, ref) => {
		const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

		return (
			<motion.button
				whileHover={isMobile ? { scale: 0.95 } : {}}
				whileTap={isMobile ? { scale: 0.9 } : {}}
				className={`comic-button ${className}`}
				ref={ref}
				{...props}
			/>
		);
	}
);

Button.displayName = "Button";

export { Button };
