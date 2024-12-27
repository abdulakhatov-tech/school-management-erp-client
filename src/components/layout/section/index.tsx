import { FC } from "react";

interface SectionPropsI {
	id: string;
	title?: string;
	children: React.ReactNode;
	className?: string;
}

const Section: FC<SectionPropsI> = ({ id, title, children, className }) => {
	return (
		<section id={id} className={`w-full p-2 h-full ${className}`}>
			{title ? (
				<h2 className="text-[20px] md:text-[24px] font-bold leading-[36px]">
					{title}
				</h2>
			) : (
				""
			)}
			{children}
		</section>
	);
};

export default Section;