import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import "./sms.css"
import { sendCustomersSms } from '../../Data/Customers/Data';
import { useNavigate } from 'react-router-dom';

export default function SmsDialog({ handleClose, open }: any) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState(false)
    const [showTips, setShowTips] = React.useState(false)
    const [diasbled, setDisabled] = React.useState(true)
    const initialState = { message: "" }
    const [formData, setFormData] = React.useState(initialState)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setDisabled(false)
        }
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const clickShowTips = () => {
        setShowTips(true)
    }
    const hideTips = () => {
        setShowTips(false)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendCustomersSms(formData, setIsLoading, navigate)

    }
    console.log(formData)
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    <h3>Send Bulk Sms</h3>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="text-center">
                            {
                                showTips ? <button className='btn btn-md btn-danger mt-3 mb-3' onClick={hideTips}>Hide Tips</button> :
                                    <button className='btn btn-md btn-info mt-3 mb-3' onClick={clickShowTips}>Show Tips</button>
                            }

                            {
                                showTips ?
                                    <>
                                        <p className='mb-3'>Use <b>:name</b> wherever you want it replaced with the contact's name</p>
                                        <p className='mb-3'>Use <b>\n</b> wherever you want to move to a new line</p>
                                        <hr className='light mb-3' />
                                        <h5 className='mb-3'>Example 1</h5>
                                        <p className='mb-2'>Hello <b>:name</b>, offer for you</p>
                                        <h5 className='mb-2'>Will result to</h5>
                                        <p className='mb-3'>Hello kevin, offer for you</p>
                                        <h5 className='mb-3'>Example 2</h5>
                                        <p className='mb-2'>Hello <b>:name</b>, <b>\n</b> offer for you</p>
                                        <h5 className='mb-2'>Will result to</h5>
                                        <p className='mb-2'>Hello kevin, <br />
                                            offer for you</p>
                                        <hr className='light mb-3' />
                                    </> : ""
                            }

                        </div>
                        <form onSubmit={onSubmit}>
                            <TextField
                                name='message'
                                onChange={handleChange}
                                id="outlined-multiline-flexible"
                                label="Message"
                                fullWidth
                                multiline
                                rows={4}
                            />
                            <div className="text-center mt-2">
                                {
                                    diasbled ?
                                        <button className="btn btn-warning btn-md" disabled>
                                            Send SMS
                                        </button> :
                                        <>
                                            {
                                                isLoading ?
                                                    <button className="btn btn-warning btn-md">
                                                        Sending
                                                    </button> :
                                                    <button className="btn btn-warning btn-md">
                                                        Send SMS
                                                    </button>
                                            }
                                        </>

                                }

                            </div>
                        </form>


                    </DialogContentText>
                </DialogContent>
                <div className="text-center" style={{ marginRight: "150px" }}>

                    <DialogActions >


                    </DialogActions>
                </div>

            </Dialog >
        </div >
    );
}
