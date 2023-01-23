import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { getCustomers } from "../../Data/Customers/Data"
import { useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import SmsDialog from './SmsDialog';


const CustomersList = ({ id }: any) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' }
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState()
    const [data, setData] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const [open, setOpen] = useState(false)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)

    useEffect(() => {
        getCustomers(setData, setIsLoading, id)
    }, [])




    const onClick = (id: any) => {
        navigate(`/customers/${id}/details`)
    }
    const d = new Date();
    let year = d.getFullYear();
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className='container p-3'>
                        {
                            open ? <SmsDialog open={open} id={id} handleClose={handleClose} /> : ""
                        }
                        <div className="row padding">
                            <div className="col-lg-6 col-sm-12 mb-3 mt-3">
                                <h2 className='mb-4'>Customers List</h2>
                            </div>
                            <div className="col-lg-6 col-sm-12 text-right mb-3 mt-3">
                                <div className='details-button float-right' style={{ display: "flex" }}>
                                    <button className='btn btn-secondary btn-md' onClick={handleOpen}> Sms</button>
                                    <button className='btn btn-info btn-md' onClick={(() => navigate(`/customers/new`))}> Add New</button>

                                </div>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    {/* <th scope="col">Date Added</th> */}
                                    <th scope="col">Gender</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Actions</th>

                                </tr>
                            </thead>
                            {
                                currentPosts.map((customer) => (
                                    <tbody>
                                        <tr>
                                            <th scope="row" >{customer.name}</th>
                                            {/* <td>{new Date(customer.createdAt).toLocaleDateString(undefined, options)}</td> */}
                                            <td>{customer.gender.toLowerCase()}</td>
                                            <td>{year - customer.yearOfBirth}</td>
                                            <td>{customer.phone}</td>
                                            <td>{customer.email}</td>

                                            <td>
                                                <div style={{ display: "flex" }}>
                                                    <button className="btn btn-warning btn-sm m-2" onClick={(() => { onClick(customer.id) })}>View</button>
                                                    <button className="btn btn-success btn-sm m-2" onClick={(() => navigate(`/customers/${customer.id}/update-details`))} >Edit</button>
                                                </div>

                                            </td>


                                        </tr>

                                    </tbody>

                                ))
                            }

                        </table>
                        <div className="mt-5 text-center">
                            <Pagination className='text-center' count={Math.ceil(data.length / postsPerPage)} onChange={handleChange} color="secondary" />
                        </div>
                    </div>
            }
        </>

    )
}

export default CustomersList