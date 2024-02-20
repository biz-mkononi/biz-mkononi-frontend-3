import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  handleClose: () => void;
  open:boolean;
  content:string;
}

export default function ErrorDialog({
  handleClose,
  open,
  content
}: Props) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          An error occurred
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className="text-center"
            id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <div className="text-center" style={{marginRight: '150px'}}>
          <DialogActions>
            <button
              onClick={handleClose}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Close
            </button>

          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
