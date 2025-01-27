import { motion } from "framer-motion";
import Image from "next/image";
import { ChatMessage } from "@/types/question";
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
					className="relative bg-gray-300 rounded-lg p-3 max-w-[80%] 
			  before:content-[''] 
			  before:absolute 
			  before:left-[-10px] 
			  before:top-[10px] 
			  before:w-0 
			  before:h-0 
			  before:border-l-[10px] 
			  before:border-l-transparent 
			  before:border-r-[10px] 
			  before:border-r-gray-300 
			  before:border-t-[10px] 
			  before:border-t-gray-300 
			  before:border-b-[10px] 
			  before:border-b-transparent"
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
				className="relative bg-pink-600 text-white rounded-lg p-3 max-w-[80%] 
		  after:content-[''] 
		  after:absolute 
		  after:right-[-10px] 
		  after:top-[10px] 
		  after:w-0 
		  after:h-0 
		  after:border-r-[10px] 
		  after:border-r-transparent 
		  after:border-l-[10px] 
		  after:border-l-pink-600 
		  after:border-t-[10px] 
		  after:border-t-pink-600 
		  after:border-b-[10px] 
		  after:border-b-transparent"
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
