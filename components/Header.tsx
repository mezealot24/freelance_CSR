import Link from "next/link";

//components
import NavBar from "@/components/NavBar";
import MobileNav from "./MobileNav.jsx";
import { ShieldCheck } from "lucide-react";

interface HeaderProps {
	className?: string;
}

const Header: React.FC<HeaderProps> = () => {
	return (
		<header className="md:py-2 xl:py-10 bg-grey-100 shadow-md lg:w-full">
			<div className="container mx-auto px-4">
				{/* Add container with padding */}
				<div className="flex justify-between items-center">
					{/* logo */}
					<div className="flex items-center">
						{/* Added flex container for logo + text */}
						<Link className="flex items-center" href="/">
							{/* Added items-center */}
							<ShieldCheck size={32} className="lg:h-12 w-12 text-green-600" />
							<span className="text-md font-bold ml-2 text-neutral-500">
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
