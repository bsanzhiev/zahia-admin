"use client";
import React, { useState } from "react";
import { filter } from "lodash";
// import Scrollbar from "@/components/scrollbar/Scrollbar";
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

import { OrderListHead, OrderListToolbar } from "@/sections/@dashboard/order";

// mock
import ORDERSLIST from "@/_mock/orders";

type SortDirection = "asc" | "desc";

interface HeadCell {
  id: string;
  label: string;
  alignRight: boolean;
}

interface OrderItems {
	id: string;
	code: string;
	date: Date;
	items: number;
	price: number;
	status: string;
}

const TABLE_HEAD: HeadCell[] = [
	{ id: "order", label: "Order", alignRight: false },
	{ id: "date", label: "Date", alignRight: false },
	{ id: "items", label: "Items", alignRight: false },
	{ id: "price", label: "Price", alignRight: false },
	{ id: "status", label: "Status", alignRight: false },
	{ id: "", label: "", alignRight: false },
];

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

//TODO _user
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

export default function OrdersPage() {
	const [order, setOrder] = useState<SortDirection>("asc");
	const [orderBy, setOredrBy] = useState<string>("");
	const [selected, setSelected] = useState<number[] | string[]>([]);
	const [filterOrder, setFilterOrder] = useState<string | number>();
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [filterName, setFilterName] = useState<string>("");

	// ----------------------------------------------------

	// const handleRequestSort = (
	// 	event: any,
	// 	property: React.SetStateAction<string>
	// ) => {
	// 	const isAsc = orderBy === property && order === "asc";
	// 	setOrder(isAsc ? "desc" : "asc");
	// 	setOredrBy(property);
	// };

	const handleRequestSort = (property: string) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOredrBy(property);
	};

	const handleSelectAllClick = (event: { target: { checked: any } }) => {
		if (event.target.checked) {
			const newSelecteds = ORDERSLIST.map((n) => n.code);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const filteredOrders: OrderItems[] = applySortFilter(
		ORDERSLIST,
		getComparator(order, orderBy),
		filterOrder || ""
	);

	const emptyRows =
	page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ORDERSLIST.length) : 0;

	const isNotFound = !filteredOrders.length && !!filterName;

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

	const handleFilterByName = (event: { target: { value: string } }) => {
		setPage(0);
		setFilterName(event.target.value);
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
					<OrderListToolbar
						numSelected={selected.length}
						filterName={filterName}
						onFilterName={handleFilterByName}
					/>
					<>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<OrderListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									rowCount={ORDERSLIST.length}
									numSelected={selected.length}
									onRequestSort={handleRequestSort}
									onSelectAllClick={handleSelectAllClick}
								/>
								<TableBody>
									{filteredOrders
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => {
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

													<TableCell align="right" padding="none">Foooo</TableCell>

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
						count={ORDERSLIST.length}
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
