import React, { useState, useEffect } from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import image2 from "../../Assets/placeholder.jpg"
import "./AddBusiness.css"
import { getSingleBusiness } from '../../Data/Businesses/Data';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


interface data {
    name: "",
    location: "",
    owner: {
        name: ""
    },
    productType: "",
    businessEmail: "",
    businessPhone: "",
    description: ""
}

const BusinessDetails = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<data | any>({})
    const [isLoading, setIsloading] = useState(false)
    const [formData, setFormData] = useState(false)
    const params = useParams()



    useEffect(() => {
        getSingleBusiness(setData, params.id, setIsloading, setFormData)


    }, [location]);


    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className="container p-2">


                        <div className="row padding">
                            <div className="col-lg-6">
                                <h2 className='mb-4'>{data.name}</h2>

                            </div>
                            <div className="col-lg-6">

                            </div>
                        </div>
                        <div className="row padding">
                            <div className="col-lg-6">
                                <div className='details-button' style={{ display: "flex" }}>
                                    <button className='btn btn-secondary btn-md' onClick={(() => navigate(-1))}> Back</button>
                                    <button className='btn btn-warning btn-md' onClick={(() => navigate(`/business/${params.id}/update-details`))}> Update</button>
                                </div>


                            </div>

                        </div>
                        <div className="row padding">
                            <div className="col-lg-6">
                                <img className='business-details-image ' src={data.imageUrl ===null?image2:data.imageUrl} />
                            </div>

                            <div className="col-lg-6">
                                <table className="table mt-3">

                                    <>
                                        <tbody >
                                            <tr >
                                                <th>Name</th>
                                                <td>{data.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Location</th>
                                                <td>{data.location}</td>
                                            </tr>
                                            {/* <tr>
                                                <th>Admin</th>
                                                <td>{data.owner.name}</td>
                                            </tr> */}
                                            <tr>
                                                <th>Product Type</th>
                                                <td>{data.productType}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{data.businessEmail}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone</th>
                                                <td>{data.businessPhone}</td>
                                            </tr>
                                            <tr>
                                                <th>Description</th>
                                                <td>{data.description}</td>
                                            </tr>
                                        </tbody>
                                    </>


                                </table>
                            </div>
                        </div>
                    </div>
            }
        </>

    )
}

export default BusinessDetails