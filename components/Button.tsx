import React from "react";
import { motion } from "framer-motion";
import { HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
	variant?: "comic";
	size?: "default" | "sm" | "lg" | "icon";
	disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant = "comic", size = "default", disabled, ...props },
		ref
	) => {
		const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

		return (
			<motion.button
				whileHover={!disabled ? (isMobile ? { scale: 0.95 } : {}) : undefined}
				whileTap={!disabled ? (isMobile ? { scale: 0.9 } : {}) : undefined}
				className={`comic-button ${
					disabled
						? "opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400 hover:shadow-none"
						: ""
				} ${className}`}
				ref={ref}
				disabled={disabled}
				{...props}
			/>
		);
	}
);

Button.displayName = "Button";

export { Button };
