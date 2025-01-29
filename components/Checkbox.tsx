import React, { ChangeEventHandler } from "react";
import { motion } from "framer-motion";

const Checkbox = ({ checked = false, onChange, label }: { checked?: boolean, onChange?: ChangeEventHandler<HTMLInputElement>, label?: string }) => {
	return (
		<div className="relative flex items-center">
			<label className="inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					className="hidden"
					checked={checked}
					onChange={(e) => onChange?.(e)}
				/>
				<div className="relative h-6 w-6">
					<motion.div
						className={`absolute h-6 w-6 rounded-full border-2 ${
							checked ? "border-purple-500 bg-purple-500" : "border-gray-300"
						}`}
						animate={checked ? "checked" : "unchecked"}
						variants={{
							checked: {
								scale: [1, 1.2, 1],
								transition: { duration: 0.6 },
							},
							unchecked: {
								scale: 1,
							},
						}}
					>
						<motion.svg
							className="absolute left-1 top-1"
							fill="none"
							viewBox="0 0 15 14"
							height="14"
							width="15"
						>
							<motion.path
								d="M2 8.36364L6.23077 12L13 2"
								stroke="white"
								strokeWidth="3"
								strokeLinecap="round"
								strokeLinejoin="round"
								initial={{ pathLength: 0 }}
								animate={{ pathLength: checked ? 1 : 0 }}
								transition={{ duration: 0.3, delay: checked ? 0.2 : 0 }}
							/>
						</motion.svg>
					</motion.div>

					{checked && (
						<motion.div
							className="absolute left-0 top-0"
							initial="initial"
							animate="animate"
						>
							{[...Array(6)].map((_, index) => (
								<motion.span
									key={index}
									className="absolute h-2 w-2 rounded-full bg-purple-500"
									variants={{
										initial: { scale: 0, opacity: 1 },
										animate: {
											scale: 0,
											opacity: 0,
											x: [0, Math.cos((index * Math.PI) / 3) * 24],
											y: [0, Math.sin((index * Math.PI) / 3) * 24],
											transition: {
												duration: 0.6,
												times: [0, 0.4, 1],
											},
										},
									}}
								/>
							))}
						</motion.div>
					)}
				</div>
				{label && <span className="ml-3 text-sm text-gray-700">{label}</span>}
			</label>
		</div>
	);
};

export default Checkbox;
