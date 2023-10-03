import * as React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

export default function ProductEdit() {
  return (
    <>
      <Dialog open>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Name
          </DialogContentText>
          <TextField 
            autoFocus
            margin="dense"
            id="name"
            label="Edit Product"
            type='text'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
