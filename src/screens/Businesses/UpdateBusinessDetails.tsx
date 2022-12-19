import React, { useState, useEffect } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Card } from '@mui/material';
import "./AddBusiness.css"
import { addBusiness, getSingleBusiness, updateSingleBusiness } from '../../Data/Businesses/Data';
import image from "../../Assets/placeholder.jpg"
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";



interface data {
    name: "",
    location: "",
    owner: {
        name: ""
    },
    productType: "",
    businessEmail: "",
    businessPhone: "",
    description: "",
    locationDetails: ""
}

const UpdateBusinessDetails = () => {
    const locationLabel = { label: "" }

    const [location, selectLocation] = useState(locationLabel);
    const [data, setData] = useState<data | any>({})
    const [isLoading, setIsloading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})

    const params = useParams()

    useEffect(() => {
        getSingleBusiness(setData, params.id, setIsloading, setFormData)

    }, [location]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({...formData,[e.target.name]:e.target.files[0]})
        }
    }


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newData = new FormData ()
        
        updateSingleBusiness(formData, navigate, params.id, setIsUpdating)

    }
    console.log(formData)
    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className='add-business container p-4 '>
                        <h2 className='mb-3'>Update Business</h2>
                        <div className="row padding">
                            <div className="col-lg-6">
                                <div className='details-button' style={{ display: "flex" }}>
                                    <button className='btn btn-secondary btn-md' onClick={(() => navigate(-1))}> Back</button>
                                    <button className='btn btn-primary btn-md' onClick={(() => navigate(`/business/${params.id}/details`))}>Manage</button>
                                </div>
                            </div>

                        </div>


                        <hr className="light mt-3 mb-3" />


                        <p className="mb-4">Update your business</p>


                        <Card className='p-3'>
                            <form onSubmit={onSubmit}>
                                <div className="row padding mt-3">
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">Business Name</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"  ><BusinessIcon /></span>
                                            <input defaultValue={data.name} type="text" onChange={handleChange} name="name" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Business Email</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><EmailIcon /></span>
                                            <input defaultValue={data.businessEmail} type="text" onChange={handleChange} name="businessEmail" className="form-control" placeholder="email" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Business Phone</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><PhoneIcon /></span>
                                            <input defaultValue={data.businessPhone} type="text" onChange={handleChange} name="businessPhone" className="form-control" placeholder="phone" aria-label="Username" aria-describedby="basic-addon1" />
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
                                                    placeholder: data.location,
                                                    className: "places",

                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Location Details</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><LocationOnIcon /></span>
                                            <input defaultValue={data.locationDetails} type="text" onChange={handleChange} name="locationDetails" className="form-control" placeholder="details" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Product Type</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><ProductionQuantityLimitsIcon /></span>
                                            <select className="form-select" value={data.productType} onChange={handleTypeChange} name="productType" aria-label="Default select example" id="basic-addon1">
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
                                            <textarea defaultValue={data.description} className="form-control" onChange={handleDescriptionChange} name='description' aria-label="With textarea"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mb-3 image-upload">


                                            <label htmlFor="formFile" className="form-label">
                                                Click to set business image
                                                <img src={image} alt="" className='business-form-image' />
                                            </label>
                                            <input className="form-control file " name='image' type="file" id="formFile" onChange={handleImageChange} />


                                        </div>
                                    </div>

                                </div>
                                <div className="text-center mt-3">
                                    {
                                        isUpdating ? <button className="btn btn-success btn-md" disabled>Updating</button> :
                                            <button className="btn btn-success btn-md">Update Business</button>
                                    }

                                </div>

                            </form>
                        </Card>

                    </div>
            }
        </>
    )
}

export default UpdateBusinessDetails