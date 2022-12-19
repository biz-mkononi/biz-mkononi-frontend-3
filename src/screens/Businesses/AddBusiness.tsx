import React, { useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Card } from '@mui/material';
import "./AddBusiness.css"
import BusinessList from './BusinessList';
import { addBusiness } from '../../Data/Businesses/Data';
import image from "../../Assets/placeholder.jpg"
import { useNavigate } from 'react-router-dom';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";




const AddBusiness = () => {
    const data = { label: "" }

    const [location, selectLocation] = useState(data);
    const initialState = { name: "", businessEmail: "", businessPhone: "", location: location.label, locationDetails: "", productType: "", description: "", longitude: "12", latitude: "13",image:{} }
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false)
    const [isActive2, setIsActive2] = useState(true)
    const [formData, setFormData] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({...formData,[e.target.name]:e.target.files[0]})
        }
        
    }

    const onClickActive = () => {
        setIsActive(true)
        setIsActive2(false)
    }
    const onClickActive2 = () => {
        setIsActive(false)
        setIsActive2(true)
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addBusiness(formData, navigate, setIsLoading)
        console.log(formData)


    }

    return (
        <div className='add-business container p-4 '>
            <h2 className='mb-3'>Add Businesses</h2>
            <div className="row padding">
                <div className="col-lg-6">
                    <div>
                        <button className={isActive ? 'btn btn-primary active-button btn-md m-2 mb-3' : 'btn btn-outline btn-md m-2 mb-3'} onClick={onClickActive}>My Business List</button>
                        <button className={isActive2 ? 'btn btn-primary active-button btn-md m-2 mb-3' : 'btn btn-outline btn-md m-2 mb-3'} onClick={onClickActive2}>Add Business</button>

                    </div>
                </div>

            </div>


            <hr className="light mb-3" />

            {
                isActive ?
                    <BusinessList /> :
                    <>
                        <p className="mb-4">Add a new business to start managing it now</p>


                        <Card className='p-3'>
                            <form onSubmit={onSubmit}>
                                <div className="row padding mt-3">
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">Business Name</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"  ><BusinessIcon /></span>
                                            <input type="text" onChange={handleChange} name="name" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Business Email</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><EmailIcon /></span>
                                            <input type="text" onChange={handleChange} name="businessEmail" className="form-control" placeholder="email" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Business Phone</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><PhoneIcon /></span>
                                            <input type="text" onChange={handleChange} name="businessPhone" className="form-control" placeholder="phone" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row padding">
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">Location</label>
                                        <div className="input-group mb-5">
                                            <GooglePlacesAutocomplete

                                                selectProps={{
                                                    location,
                                                    onChange: selectLocation,
                                                    placeholder: "business location",
                                                    className: "places"

                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Location Details</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><LocationOnIcon /></span>
                                            <input type="text" onChange={handleChange} name="locationDetails" className="form-control" placeholder="details" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Product Type</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><ProductionQuantityLimitsIcon /></span>
                                            <select className="form-select" onChange={handleTypeChange} name="productType" aria-label="Default select example" id="basic-addon1">
                                                <option selected>select a product type</option>
                                                <option value="PRODUCT">Product</option>
                                                <option value="SERVICE">Service</option>
                                                <option value="SERVICE_PRODUCT">Service_product</option>
                                            </select>
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
                                            <input className="form-control file " name='image' type="file" id="formFile" onChange={handleFileChange} />


                                        </div>
                                    </div>

                                </div>
                                <div className="text-center mt-3">
                                    {
                                        isLoading ? <button className="btn btn-success btn-md" disabled >Adding</button> :
                                            <button className="btn btn-success btn-md">Add Business</button>
                                    }

                                </div>

                            </form>
                        </Card>
                    </>
            }
        </div>
    )
}

export default AddBusiness