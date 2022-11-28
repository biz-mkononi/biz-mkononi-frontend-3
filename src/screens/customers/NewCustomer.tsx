import React, { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card } from '@mui/material';
import { addCustomer } from '../../Data/Customers/Data';
import { useNavigate } from 'react-router-dom';
import image from "../../Assets/placeholder.jpg"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import "../Businesses/AddBusiness.css"
import PersonIcon from '@mui/icons-material/Person';



const AddCustomer = () => {
    const initialState = { name: "", gender: "", yearOfBirth: "", phone: "", email: "", description: "" }

    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addCustomer(formData, navigate, setIsLoading)
        console.log(formData)

    }
    console.log(formData)

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
                                <span className="input-group-text" id="basic-addon1"><PersonIcon /></span>
                                <input type="text" onChange={handleChange} name="name" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label">Year of Birth</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><PersonIcon /></span>
                                <input type="text" onChange={handleChange} name="yearOfBirth" className="form-control" placeholder="year of birth" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <FormControl>
                                <label htmlFor="basic-url" className="form-label">Gender</label>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="male"
                                    name="gender"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                                    <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
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
                                <input type="text" onChange={handleChange} name="phone" className="form-control" placeholder="phone number" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>

                    </div>
                    <div className="row padding">
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label ">Description</label>
                            <div className="input-group mb-3">
                                <textarea className="form-control" onChange={handleDescriptionChange} name='description' aria-label="With textarea"></textarea>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="mb-3 image-upload">


                                <label htmlFor="formFile" className="form-label">
                                    Click to set business image
                                    <img src={image} alt="" className='business-form-image' />
                                </label>
                                <input className="form-control file " name='image' type="file" id="formFile" />


                            </div>
                        </div>

                    </div>
                    <div className="text-center mt-3">
                        {
                            isLoading ? <button className="btn btn-success btn-md" disabled>Adding</button> :
                                <button className="btn btn-success btn-md">Add Customer</button>
                        }

                    </div>

                </form>
            </Card>
        </div>
    )
}

export default AddCustomer