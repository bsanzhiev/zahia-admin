import * as React from "react";

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	InputAdornment,
	MenuItem,
	OutlinedInput,
	TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

interface ProductEditProps {
	open: boolean;
	handleClose: () => void;
}
const statuses = [
	{
		value: "published",
		label: "Published",
	},
	{
		value: "draft",
		label: "Draft",
	},
];

export default function ProductEdit({ open, handleClose }: ProductEditProps) {
	return (
		<>
			<Dialog open={open} onClose={handleClose} maxWidth="xs">
				<DialogTitle>Edit Product</DialogTitle>
				<DialogContent>
					<Box component="form">
						<Grid2
							container
							rowSpacing={2}
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						>
							<Grid2 xs={12}>
								<TextField
									autoFocus
									margin="dense"
									id="name"
									label="Quantity"
									type="number"
									fullWidth
									variant="outlined"
								/>
							</Grid2>

							<Grid2 xs={12}>
								<TextField
									autoFocus
									margin="dense"
									id="price"
									label="Price"
									type="number"
									fullWidth
									variant="outlined"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">₮</InputAdornment>
										),
									}}
								/>
							</Grid2>

							<Grid2 xs={12}>
								<TextField
									autoFocus
									margin="dense"
									multiline
									rows={4}
									id="description"
									label="Description"
									type="text"
									fullWidth
									variant="outlined"
								/>
							</Grid2>

							<Grid2 xs={12}>
								<TextField
									autoFocus
									select
									margin="dense"
									id="publish"
									label="Publish"
									variant="outlined"
									fullWidth
									helperText="Select status"
								>
									{statuses.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid2>
						</Grid2>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Update</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
