import { forwardRef, HTMLAttributes } from "react";
// icons
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

interface IconifyProps extends HTMLAttributes<HTMLDivElement> {
	icon: string;
	sx?: Record<string, any>;
	width?: number | string;
}

// Remove Box - dont work well, use div instead

const Iconify = forwardRef<HTMLDivElement, IconifyProps>(
	({ icon, width = 20, sx = {}, ...other }, ref) => {
		return (
			<div ref={ref} style={{ width, height: width, ...sx }} {...other}>
				<Icon icon={icon} />
			</div>
		);
	}
);

export default Iconify;
