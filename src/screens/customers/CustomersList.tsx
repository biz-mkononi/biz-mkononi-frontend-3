import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { getCustomers } from "../../Data/Customers/Data"
import { useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';


const CustomersList = () => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' }
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState()
    const [data, setData] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)

    useEffect(() => {
        getCustomers(setData, setIsLoading)
    }, [])




    const onClick = (id: any) => {
        navigate(`/customers/${id}/details`)
    }
    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className='container p-3'>
                        <input className="form-control search mb-3" type="search" placeholder="Search by location" aria-label="Search"></input>
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
                                            <td>{customer.gender}</td>
                                            <td>{customer.yearOfBirth}</td>
                                            <td>{customer.phone}</td>
                                            <td>{customer.email}</td>

                                            <td>
                                                <button className="btn btn-warning btn-sm ml-2" onClick={(() => { onClick(customer.id) })}>View</button>
                                                <button className="btn btn-success btn-sm ml-2" onClick={(() => navigate(`/customers/${customer.id}/update-details`))} >Edit</button>
                                            </td>


                                        </tr>

                                    </tbody>

                                ))
                            }

                        </table>
                        <div className="mt-5 text-center">
                            <Pagination className='text-center' count={Math.floor(data.length / postsPerPage)} onChange={handleChange} color="secondary" />
                        </div>
                    </div>
            }
        </>

    )
}

export default CustomersList