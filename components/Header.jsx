import Link from "next/link";

//components
import NavBar from "@/components/NavBar";
import MobileNav from "./MobileNav.jsx";
import { ShieldCheck } from "lucide-react";

const Header = () => {
	return (
		<header className="py-8 xl:py-10 bg-white shadow-md w-full">
			<div className="container mx-auto px-4">
				{" "}
				{/* Add container with padding */}
				<div className="flex justify-between items-center">
					{/* logo */}
					<div className="flex items-center">
						{" "}
						{/* Added flex container for logo + text */}
						<Link className="flex items-center" href="/">
							{" "}
							{/* Added items-center */}
							<ShieldCheck size={48} className="h-12 w-12 text-green-600" />
							<span className="text-3xl font-bold ml-2 text-neutral-500">
								Digital Awareness
							</span>
						</Link>
					</div>

					{/* Navigation */}
					<div className="hidden xl:flex items-center">
						<NavBar />
					</div>

					{/* Mobile nav */}
					<div className="xl:hidden">
						<MobileNav />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
