import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function AlertDialog({
  handleClose,
  open,
  handleDelete,
  title,
}: any) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete ${title}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className="text-center"
            id="alert-dialog-description"
          >
            This step cannot be reversed once you do it
          </DialogContentText>
        </DialogContent>
        <div className="text-center" style={{ marginRight: '150px' }}>
          <DialogActions>
            <button
              onClick={handleClose}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-md btn-danger"
              autoFocus
            >
              Delete
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}
