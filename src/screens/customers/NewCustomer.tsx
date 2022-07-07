import React, { useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card } from '@mui/material';
const AddCustomer = () => {
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
            <h2 className='mb-3'>Add Customer</h2>

            <hr className="light mb-3" />
            <p className="mb-4">Add a new customer to your business</p>
            <Card className='p-3'>
                <form onSubmit={onSubmit}>
                    <div className="row padding mt-3">
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label ">Name</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><BusinessIcon /></span>
                                <input type="text" onChange={handleChange} name="name" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label">Estimate Age</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><EmailIcon /></span>
                                <input type="text" onChange={handleChange} name="age" className="form-control" placeholder="age" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label">Gender</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><PhoneIcon /></span>
                                <input type="text" onChange={handleChange} name="gender" className="form-control" placeholder="gender" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="row padding">
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label ">Email</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><EmailIcon /></span>
                                <input type="email" onChange={handleChange} name="email" className="form-control" placeholder="email" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label">Phone</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><PhoneIcon /></span>
                                <input type="text" onChange={handleChange} name="locationDetails" className="form-control" placeholder="phone number" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label ">Description</label>
                            <div className="input-group mb-3">
                                <textarea className="form-control" onChange={handleDescriptionChange} name='description' aria-label="With textarea"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="text-center row padding">

                        <div className="col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Click below to upload business image</label>
                                <input className="form-control file mt-5" name='image' type="file" id="formFile" />
                            </div>
                        </div>

                    </div>
                    <div className="text-center mt-3">
                        <button className="btn btn-success btn-md">Add Customer</button>
                    </div>

                </form>
            </Card>
        </div>
    )
}

export default AddCustomer