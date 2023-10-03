"use client";
import React, { useState } from "react";
import { filter } from "lodash";
import { sentenceCase } from "change-case";

import {
	Avatar,
	Box,
	Button,
	Card,
	Checkbox,
	Container,
	IconButton,
	MenuItem,
	Paper,
	Popover,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";

// components
import Iconify from "../../../components/iconify/";
import Label from "../../../components/label";
import Scrollbar from "@/components/scrollbar/Scrollbar";

// sections
import {
	ProductsListHead,
	ProductsListToolbar,
} from "../../../sections/@dashboard/menu";

//mock
import PRODUCTS_LIST from "../../../_mock/products";
import BorderLinearProgress from "@/components/linearProgress/BorderLinearProgress";
// import PRODUCTS_LIST from "../../../_mock/users";

// ----------------------------------------------------------------------
// Удалил Scrollbar - ненужная залупа, а погоди

const TABLE_HEAD = [
	{ id: "product", label: "Product", alignRight: false },
	{ id: "create_at", label: "Create at", alignRight: false },
	{ id: "stock", label: "Stock", alignRight: false },
	{ id: "price", label: "Price", alignRight: false },
	{ id: "publish", label: "Publish", alignRight: false },
	{ id: "" },
];

// ----------------------------------------------------------------------

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

function applySortFilter(
	array: any[],
	comparator: { (a: any, b: any): number; (arg0: any, arg1: any): any },
	query: string
) {
	const stabilizedThis = array.map((el: any, index: any) => [el, index]);
	stabilizedThis.sort((a: number[], b: number[]) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (query) {
		return filter(
			array,
			(_user: { name: string }) =>
				_user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	}
	return stabilizedThis.map((el: any[]) => el[0]);
}

export default function MenuPage() {
	const [open, setOpen] = useState(null);
	const [page, setPage] = useState<number>(0);
	const [order, setOrder] = useState("asc");
	const [selected, setSelected] = useState<string[]>([]);
	const [orderBy, setOredrBy] = useState("name");
	const [filterName, setFilterName] = useState("");
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleOpenMenu = (event: any) => {
		setOpen(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setOpen(null);
	};

	const handleEdit = () => {
		console.log("Open!");
	}

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
			const newSelecteds = PRODUCTS_LIST.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: any, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: string[] = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
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

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PRODUCTS_LIST.length) : 0;

	const filteredUsers = applySortFilter(
		PRODUCTS_LIST,
		getComparator(order, orderBy),
		filterName
	);

	const isNotFound = !filteredUsers.length && !!filterName;

	return (
			<Scrollbar>
				<Container>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						mb={5}
					>
						<Typography variant="h4" gutterBottom>
							Menu
						</Typography>
						<Button
							variant="contained"
							startIcon={<Iconify {...({ icon: "eva:plus-fill" } as any)} />}
						>
							New Product
						</Button>
					</Stack>

					<Card>
						<ProductsListToolbar
							numSelected={selected.length}
							filterName={filterName}
							onFilterName={handleFilterByName}
						/>
						<>
							<TableContainer sx={{ minWidth: 800 }}>
								<Table>
									<ProductsListHead
										order={order}
										orderBy={orderBy}
										headLabel={TABLE_HEAD}
										rowCount={PRODUCTS_LIST.length}
										numSelected={selected.length}
										onRequestSort={handleRequestSort}
										onSelectAllClick={handleSelectAllClick}
									/>
									<TableBody>
										{filteredUsers
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map((row) => {
												const {
													id,
													name,
													cover,
													create_at,
													quantity,
													stock,
													price,
													publish,
												} = row;
												const selectedUser = selected.indexOf(name) !== -1;

												return (
													<TableRow
														hover
														key={id}
														tabIndex={-1}
														role="checkbox"
														selected={selectedUser}
													>
														<TableCell padding="checkbox">
															<Checkbox
																checked={selectedUser}
																onChange={(event) => handleClick(event, name)}
															/>
														</TableCell>

														<TableCell
															component="th"
															scope="row"
															padding="none"
														>
															<Stack
																direction="row"
																alignItems="center"
																spacing={2}
															>
																<Avatar
																	alt={name}
																	src={cover}
																	variant="rounded"
																/>
																<Typography variant="subtitle2" noWrap>
																	{name}
																</Typography>
															</Stack>
														</TableCell>

														<TableCell align="left">
															{create_at.toISOString()}
														</TableCell>

														<TableCell align="left">
															<Stack direction="column" spacing={1}>
																<BorderLinearProgress
																	variant="determinate"
																	value={70}
																/>
																<Typography variant="caption" noWrap>
																	{quantity} {stock}
																</Typography>
															</Stack>
														</TableCell>

														{/* <TableCell align="left">
                            {isVerified ? "Yes" : "No"}
                          </TableCell> */}

														<TableCell align="left">${price}</TableCell>

														<TableCell align="left">
															<Label
																{...({
																	color:
																		publish === "published"
																			? "success"
																			: "warning",
																} as any)}
															>
																{sentenceCase(publish)}
															</Label>
														</TableCell>

														<TableCell align="right">
															<IconButton
																size="large"
																color="inherit"
																onClick={handleOpenMenu}
															>
																<Iconify icon={"eva:more-vertical-fill"} />
															</IconButton>
														</TableCell>
													</TableRow>
												);
											})}
										{emptyRows > 0 && (
											<TableRow style={{ height: 53 * emptyRows }}>
												<TableCell colSpan={6} />
											</TableRow>
										)}
									</TableBody>

									{isNotFound && (
										<TableBody>
											<TableRow>
												<TableCell align="center" colSpan={6} sx={{ py: 3 }}>
													<Paper sx={{ textAlign: "center" }}>
														<Typography variant="h6" paragraph>
															Not Found
														</Typography>
														<Typography variant="body2">
															No Resuls found for &nbsp;
														</Typography>
													</Paper>
												</TableCell>
											</TableRow>
										</TableBody>
									)}
								</Table>
							</TableContainer>
						</>

						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={PRODUCTS_LIST.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Card>
				</Container>

				<Popover
					disableScrollLock={true}
					open={Boolean(open)}
					anchorEl={open}
					onClose={handleCloseMenu}
					anchorOrigin={{ vertical: "top", horizontal: "left" }}
					transformOrigin={{vertical:'top', horizontal:'right'}}
					// TODO Depricated
					PaperProps={{
						sx: {
							p: 1,
							width: 140,
							"& .MuiMenuItem-root": {
								px: 1,
								typography: "body2",
								borderradius: 0.75,
							},
						},
					}}
				>
					<MenuItem>
						<Iconify onClick={handleEdit} icon={"eva:edit-fill"} sx={{ mr: 2 }} />
						Edit
					</MenuItem>

					<MenuItem sx={{ color: "error.main" }}>
						<Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
						Delete
					</MenuItem>
				</Popover>
			</Scrollbar>
	);
}
