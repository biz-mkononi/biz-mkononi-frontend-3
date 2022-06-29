import React, { useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Card } from '@mui/material';
import "./AddBusiness.css"
import BusinessList from './BusinessList';
const AddBusiness = () => {

    const [isActive, setIsActive] = useState(true)
    const [isActive2, setIsActive2] = useState(false)

    const onClickActive = () => {
        setIsActive(true)
        setIsActive2(false)
    }
    const onClickActive2 = () => {
        setIsActive(false)
        setIsActive2(true)
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
                <div className="col-lg-6  ">
                </div>
            </div>

            <hr className="light mb-3" />
            {
                isActive ?
                    <BusinessList /> :
                    <>
                        <p className="mb-4">Add a new business to start managing it now</p>
                        <Card className='p-3'>
                            <form >
                                <div className="row padding mt-3">
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">Business Name</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><BusinessIcon /></span>
                                            <input type="text" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Business Email</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><EmailIcon /></span>
                                            <input type="text" className="form-control" placeholder="email" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Business Phone</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><PhoneIcon /></span>
                                            <input type="text" className="form-control" placeholder="phone" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row padding">
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">Location</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><LocationOnIcon /></span>
                                            <input type="text" className="form-control" placeholder="location" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Location Details</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><LocationOnIcon /></span>
                                            <input type="text" className="form-control" placeholder="details" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Product Type</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><ProductionQuantityLimitsIcon /></span>
                                            <input type="text" className="form-control" placeholder="type" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row padding">
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">Description</label>
                                        <div className="input-group mb-3">
                                            <textarea className="form-control" aria-label="With textarea"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">Click below to upload business image</label>
                                            <input className="form-control file mt-5" type="file" id="formFile" />
                                        </div>
                                    </div>

                                </div>
                                <div className="text-center mt-3">
                                    <button className="btn btn-success btn-md">Add Business</button>
                                </div>

                            </form>
                        </Card>
                    </>
            }
        </div>
    )
}

export default AddBusiness