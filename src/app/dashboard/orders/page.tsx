"use client";
import React, { useState } from "react";
import { filter } from "lodash";
import Scrollbar from "@/components/scrollbar/Scrollbar";
import { ProductsListHead } from "@/sections/@dashboard/menu";
import {
	Box,
	Card,
	Checkbox,
	Container,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";

// mock
import ORDERS_LIST from "@/_mock/orders";

// -------------------------------------------------------

const TABLE_HEAD = [
	{ id: "order", label: "Order", alignRight: false },
	{ id: "date", label: "Date", alignRight: false },
	{ id: "items", label: "Items", alignRight: false },
	{ id: "price", label: "Price", alignRight: false },
	{ id: "status", label: "Status", alignRight: false },
	{ id: "" },
];

// -------------------------------------------------------

function descendingComparator(
	a: { [x: string]: number },
	b: { [x: string]: number },
	orderBy: string | number
) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order: string, orderBy: string) {
	return order === "desc"
		? (a: any, b: any) => descendingComparator(a, b, orderBy)
		: (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

//TODO что за _user?
function applySortFilter(
	array: any[],
	comparator: { (a: any, b: any): number; (arg0: any, arg1: any): any },
	query: string | number
) {
	const stabilizedThis = array.map((el: any, index: any) => [el, index]);
	stabilizedThis.sort((a: number[], b: number[]) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (typeof query === "number") {
		query = query.toString();
	}
	if (query) {
		return filter(
			array,
			(_user: { name: string }) =>
				_user.name.toLowerCase().indexOf(query.toString().toLowerCase()) !== -1
		);
	}
	return stabilizedThis.map((el: any[]) => el[0]);
}

export default function Orders() {
	const [order, setOrder] = useState("asc");
	const [orderBy, setOredrBy] = useState("code");
	const [selected, setSelected] = useState<number[] | string[]>([]);
	const [filterOrder, setFilterOrder] = useState();
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	// ----------------------------------------------------

	const handleRequestSort = (
		event: any,
		property: React.SetStateAction<string>
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOredrBy(property);
	};

	const handleSelectAllClick = (event: { target: { checked: any } }) => {
		if (event.target.checked) {
			const newSelecteds = ORDERS_LIST.map((n) => n.code);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const filteredOrders = applySortFilter(
		ORDERS_LIST,
		getComparator(order, orderBy),
		filterOrder || ''
	);

	const selectedNumbers: number[] =
		typeof filterOrder === "number"
			? selected.map((item) => item as number)
			: [];

	const selectedStrings: string[] =
		typeof filterOrder === "string"
			? selected.map((item) => item as string)
			: [];

	const handleClick = (event: any, name: string) => {
		const selectedIndex = selectedStrings.indexOf(name);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(
				selectedStrings,
				selectedNumbers.map((item) => item.toString()),
				name
			);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(
				selectedStrings.slice(1),
				selectedNumbers.map((item) => item.toString())
			);
		} else if (selectedIndex === selectedStrings.length - 1) {
			newSelected = newSelected.concat(
				selectedStrings.slice(0, -1),
				selectedNumbers.map((item) => item.toString())
			);
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selectedStrings.slice(0, selectedIndex),
				selectedNumbers.map((item) => item.toString()),
				selectedStrings.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (
		event: any,
		newPage: React.SetStateAction<number>
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
		setPage(0);
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	// ----------------------------------------------------

	return (
		<>
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Orders
					</Typography>
				</Stack>

				<Card>
					<Box sx={{ backgroundColor: "grey", mb: 5 }}>OrdersListToolbar</Box>
					<>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<TableBody>
									{ORDERS_LIST.map((row) => {
											const { id, code, date, items, price, status } = row;
											const selectedOrder = selected.indexOf(code) !== -1;
											return (
												<TableRow
													hover
													key={id}
													tabIndex={-1}
													role="checkbox"
													selected={selectedOrder}
												>
													<TableCell padding="checkbox">
														<Checkbox
															checked={selectedOrder}
															onChange={(event) => handleClick(event, code)}
														/>
													</TableCell>

													<TableCell
														component="th"
														scope="row"
														padding="none"
														sx={{ width: 230 }}
													>
														#{code}
													</TableCell>

													<TableCell align="left">{date.toString()}</TableCell>

													<TableCell align="left">{items}</TableCell>

													<TableCell align="left">₮{price}</TableCell>

													<TableCell align="left">{status}</TableCell>

													<TableCell align="right" padding="none"></TableCell>

													<TableCell></TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
					</>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={ORDERS_LIST.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Card>
			</Container>
		</>
	);
}
