"use client";

import {
	Box,
	Checkbox,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from "@mui/material";

interface HeadCell {
	id: string;
	label: string;
	alignRight: boolean;
}

type SortDirection = "asc" | "desc";

interface OrderListHeadProps {
	order: SortDirection;
	orderBy: string;
	rowCount: number;
	headLabel: HeadCell[];
	numSelected: number;
	onRequestSort: (property: string, event: MouseEvent) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const visuallyHidden = {
	border: 0,
	margin: -1,
	padding: 0,
	width: "1px",
	height: "1px",
	overflow: "hidden",
	position: "absolute",
	whiteSpace: "nowrap",
	clip: "react(0 0 0 0)",
};

export default function OrderListHead({
	order,
	orderBy,
	rowCount,
	headLabel,
	numSelected,
	onRequestSort,
	onSelectAllClick,
}: OrderListHeadProps) {
	const createSortHandler =
		(property: string) => (event: MouseEvent) => {
			onRequestSort(property, event);
		};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
					/>
				</TableCell>
				{headLabel.map((headCell: HeadCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.alignRight ? "right" : "left"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							hideSortIcon
							active={orderBy == headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							// onClick={createSortHandler(headCell.id)}
							onClick={() => createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy == headCell.id ? (
								<Box sx={{ ...visuallyHidden }}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
