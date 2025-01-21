const TabletIcon = () => {
	return (
		<div className="relative w-36 h-44 bg-white rounded-2xl border-4 border-neutral-500">
			{/* หน้าจอ */}
			<div className="absolute top-[10%] left-[8%] right-[8%] bottom-[15%] bg-amber-200 rounded-lg border-2 border-neutral-500"></div>

			{/* กล้องด้านบน */}
			<div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-neutral-400 rounded-full"></div>

			{/* ปุ่มด้านล่าง */}
			<div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-neutral-500"></div>
		</div>
	);
};

export default TabletIcon;
