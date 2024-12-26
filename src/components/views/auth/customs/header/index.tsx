import type { FC } from "react";
import { Logo } from "@/components/constants";


const AuthHeader: FC = () => {
	return (
		<div className="flex flex-col items-center gap-3 mb-4 sm:mb-6">
			<Logo  />
			<h3 className="text-[24px] md:text-[26px] lg:text-[28px] font-semibold lg:font-bold">School Management</h3>
		</div>
	);
};

export default AuthHeader;