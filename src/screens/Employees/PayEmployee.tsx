import React, { useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Card } from '@mui/material';
const PayEmployee = () => {
    const initialState = { name: "", age: "", gender: "", phone: "", email: "", description: "" }


    const [formData, setFormData] = useState(initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    return (
        <div className='add-business container p-4 '>
            <h2 className='mb-3'>Add Salary</h2>

            <hr className="light mb-3" />
            <p className="mb-4">Add a new salary to your business</p>
            <Card className='p-3'>
                <form onSubmit={onSubmit}>
                    <label htmlFor="basic-url" className="form-label ">Employee Name</label>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon1"><BusinessIcon /></span>
                        <input type="text" onChange={handleChange} name="name" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <Stack component="form" className='mb-5' noValidate spacing={0}>
                        <label htmlFor="basic-url" className="form-label ">Salary for this date</label>

                        <TextField

                            id="date"
                            label="salary"
                            type="date"
                            defaultValue={Date.now()}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Stack>

                    <label htmlFor="basic-url" className="form-label ">Amount (Ksh)</label>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon1"><BusinessIcon /></span>
                        <input type="text" onChange={handleChange} name="name" className="form-control" placeholder="amount" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <label htmlFor="basic-url" className="form-label ">Description</label>
                    <div className="input-group mb-3">
                        <textarea className="form-control" onChange={handleDescriptionChange} name='description' aria-label="With textarea"></textarea>
                    </div>

                    <div className="text-center mt-3">
                        <button className="btn btn-success btn-md">Add Salary</button>
                    </div>

                </form>
            </Card>
        </div>
    )
}

export default PayEmployee