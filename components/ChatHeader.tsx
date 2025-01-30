import React from "react";
import { ChevronLeft, Phone, Video, Menu } from "lucide-react";

const ChatHeader = () => {
	return (
		<div className="flex items-center justify-between bg-rose-500 text-white p-4 w-full">
			{/* Left Section */}
			<div className="flex items-center space-x-3">
				<ChevronLeft className="w-6 h-6 cursor-pointer" />
				<div className="flex items-center space-x-3">
					<div>
						<h2 className="font-semibold text-lg">คุณสมชาย</h2>
						<p className="text-sm text-gray-100">ออนไลน์</p>
					</div>
				</div>
			</div>

			{/* Right Section - Action Buttons */}
			<div className="flex items-center space-x-4">
				<Phone className="w-6 h-6 cursor-pointer" />
				<Video className="w-6 h-6 cursor-pointer" />
				<Menu className="w-6 h-6 cursor-pointer" />
			</div>
		</div>
	);
};

export default ChatHeader;
