import { motion } from "framer-motion";
import Image from "next/image";
import { ChatMessage } from "@/types/chat";
import { avatarVariants, messageVariants } from "@/animations/chatAnimations";

type ChatBubbleProps = Omit<ChatMessage, "id">;

export const ChatBubble = ({ type, message, avatar }: ChatBubbleProps) => {
	if (type === "scammer") {
		return (
			<motion.div
				initial="hidden"
				animate="visible"
				className="flex items-start gap-2"
			>
				<motion.div variants={avatarVariants}>
					<Image
						src={avatar}
						alt="Avatar"
						width={32}
						height={32}
						className="rounded-full"
					/>
				</motion.div>
				<motion.div
					variants={messageVariants}
					className="bg-gray-200 rounded-lg p-3 max-w-[80%]"
				>
					<p className="text-gray-800">{message}</p>
				</motion.div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			className="flex items-start justify-end gap-2"
		>
			<motion.div
				variants={messageVariants}
				className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]"
			>
				<p>{message}</p>
			</motion.div>
			<motion.div variants={avatarVariants}>
				<Image
					src={avatar}
					alt="Avatar"
					width={32}
					height={32}
					className="rounded-full"
				/>
			</motion.div>
		</motion.div>
	);
};

export default ChatBubble;
