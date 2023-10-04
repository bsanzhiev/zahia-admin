"use client";
import Scrollbar from "@/components/scrollbar/Scrollbar";
import { Box, Card, Container, Stack, Table, TableContainer, Typography } from "@mui/material";
import React from "react";

function Orders() {
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
						Orders
					</Typography>
				</Stack>

				<Card>
					<Box sx={{ backgroundColor: "grey" }}>OrdersListToolbar</Box>
          <TableContainer sx={{minWidth: 800}}>
            <Table>
              
            </Table>
          </TableContainer>
				</Card>
			</Container>
		</Scrollbar>
	);
}

export default Orders;
