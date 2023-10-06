"use client";

import { styled, alpha } from "@mui/material/styles";
import {
	IconButton,
	InputAdornment,
	OutlinedInput,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import Iconify from "@/components/iconify/Iconify";

const StyledRoot = styled(Toolbar)(({ theme }) => ({
	height: 96,
	display: "flex",
	justifyContent: "space-between",
	padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
	width: 240,
	transition: theme.transitions.create(["box-shadow", "width"], {
		easing: theme.transitions.easing.easeInOut,
		duration: theme.transitions.duration.shorter,
	}),
	"&.Mi-focused": {
		width: 320,
		// boxShadow: theme.customShadows.z8,
		boxShadow: theme.shadows[10],
	},
	"& fieldset": {
		borderWidth: "1px !important",
		borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
	},
}));

// -------------------------------------------------------------------

interface OrderListToolbarProps {
	numSelected: number;
	filterName: string;
	onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function OrderListToolbar({
	numSelected,
	filterName,
	onFilterName,
}: OrderListToolbarProps) {
	return (
		<StyledRoot
			sx={{
				...(numSelected > 0 && {
					color: "primary.main",
					bgcolor: "primary.lighter",
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography component="div" variant="subtitle1">
					{numSelected} selected
				</Typography>
			) : (
				<StyledSearch
					value={filterName}
					onChange={onFilterName}
					placeholder="Search order ..."
					startAdornment={
						<InputAdornment position="end">
							<Iconify
								icon="eva:search-fill"
								sx={{ color: "text.disabled", width: 20, height: 20 }}
							/>
						</InputAdornment>
					}
				/>
			)}

			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton>
						<Iconify icon="eva:trash-2-fill" />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<Iconify icon="ic:round-filter-list" />
					</IconButton>
				</Tooltip>
			)}
		</StyledRoot>
	);
}
