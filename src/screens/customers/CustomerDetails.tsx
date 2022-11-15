import React, { useState, useEffect } from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import image2 from "../../Assets/placeholder.jpg"
import "../Businesses/AddBusiness.css"
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCustomer, getSingleCustomer } from '../../Data/Customers/Data';
import CircularProgress from '@mui/material/CircularProgress';
import AlertDialog from '../Dialog/Dialog'


interface data {
    name: "",
    description: "",
    date: ""
}
const CustomerDetails = () => {
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const [data, setData] = useState<data | any>({})
    const [isLoading, setIsloading] = useState(false)
    const [formData, setFormData] = useState({})


    const params = useParams()
    const handleDelete = () => {
        deleteCustomer(navigate, params.id, setIsloading)
        setOpen(false)
    }
    useEffect(() => {
        getSingleCustomer(setData, params.id, setIsloading, setFormData)


    }, [location]);
    const onDelete = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    console.log(data)
    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className="container p-3">

                        {
                            open ? <AlertDialog open={open} handleClose={handleClose} title={data.name} handleDelete={handleDelete} /> : ""
                        }
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
                                    <button className='btn btn-warning btn-md' onClick={(() => navigate(`/customers/${params.id}/update-details`))}> Update</button>
                                    <button className='btn btn-danger btn-md' onClick={onDelete}> Delete</button>

                                </div>


                            </div>

                        </div>
                        <div className="row padding">
                            <div className="col-lg-6">
                                <img className='business-details-image ' src={image2} />
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
                                                <th>Email</th>
                                                <td>{data.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone</th>
                                                <td>{data.phone}</td>
                                            </tr>
                                            <tr>
                                                <th>Gender</th>
                                                <td>{data.gender}</td>
                                            </tr>
                                            <tr>
                                                <th>Gender</th>
                                                <td>{data.yearOfBirth}</td>
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

export default CustomerDetails