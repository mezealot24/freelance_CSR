import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link"
		| "comic";
	size?: "default" | "sm" | "lg" | "icon";
}

const buttonVariants = {
	default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
	destructive:
		"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
	outline:
		"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
	secondary:
		"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
	ghost: "hover:bg-accent hover:text-accent-foreground",
	link: "text-primary underline-offset-4 hover:underline",
	comic:
		"text-white bg-red-500 border-2 border-black rounded-lg shadow-[5px_5px_0px_black] transition-all duration-300 ease-in-out hover:bg-white hover:text-red-500 hover:border-red-500 hover:shadow-[5px_5px_0px_#4c0519] active:bg-yellow-400 active:shadow-none active:translate-y-1 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-500 disabled:shadow-none disabled:cursor-not-allowed",
};

const buttonSizes = {
	default: "h-9 px-4 py-2",
	sm: "h-8 rounded-md px-3 text-xs",
	lg: "h-10 rounded-md px-8",
	icon: "h-9 w-9",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "comic", size = "default", ...props }, ref) => {
		const buttonProps = {
			whileHover: { scale: 1.05 },
			whileTap: { scale: 0.95 },
			className: cn(buttonVariants[variant], buttonSizes[size], className),
			ref,
			...props,
		} as const;

		return <motion.button {...buttonProps} />;
	}
);

Button.displayName = "Button";

export { Button };
