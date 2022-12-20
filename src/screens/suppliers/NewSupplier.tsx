import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card } from '@mui/material';
import { addSupplier } from '../../Data/Suppliers/Data';
import { useNavigate } from 'react-router-dom';
import image from "../../Assets/placeholder.jpg"
import "../Businesses/AddBusiness.css"


const AddSupplier = ({ id }: any) => {
    const initialState = { name: "", phone: "", email: "", description: "", image:{} }
    const navigate = useNavigate()
    const [displayImage, setDisplayImage] = useState ("")
    const [formData, setFormData] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                setFormData({...formData,[e.target.name]:e.target.files[0]})
                setDisplayImage(URL.createObjectURL(e.target.files[0]));
            }
    
    }



    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addSupplier(formData, navigate, setIsLoading, id)

    }

    return (
        <div className='add-business container p-4 '>
            <h2 className='mb-3'>Add Supplier</h2>

            <hr className="light mb-3" />
            <p className="mb-4">Add a new supplier to your business</p>
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
                                    <img src={displayImage === ''?image:displayImage} alt="" className='business-form-image' />
                                </label>
                                <input className="form-control file " onChange={handleFileChange} name='image' type="file" id="formFile" />


                            </div>
                        </div>

                    </div>
                    <div className="text-center mt-3">
                        {
                            isLoading ? <button className="btn btn-success btn-md" disabled>Adding</button> :
                                <button className="btn btn-success btn-md">Add Supplier</button>
                        }

                    </div>

                </form>
            </Card>
        </div>
    )
}

export default AddSupplier