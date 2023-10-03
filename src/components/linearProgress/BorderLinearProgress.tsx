import { styled } from "@mui/material/styles";

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 6,
	borderRadius: 4,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
	},
	[`&.${linearProgressClasses.bar}`]: {
		borderRadius: 4,
		backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
	},
})) as typeof LinearProgress;

export default BorderLinearProgress;