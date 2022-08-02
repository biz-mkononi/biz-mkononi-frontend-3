import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { getCustomers } from "../../Data/Customers/Data"
import { useNavigate } from "react-router-dom"

const CustomersList = () => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' }
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        getCustomers(setData)
    }, [])

    console.log(data)
    const onClick = (id: any) => {
        localStorage.setItem("customerId", JSON.stringify({ id }));
        navigate(0)
    }
    return (
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
                    data.map((customer) => (
                        <tbody>
                            <tr>
                                <th scope="row" >{customer.name}</th>
                                {/* <td>{new Date(customer.createdAt).toLocaleDateString(undefined, options)}</td> */}
                                <td>{customer.gender}</td>
                                <td>{customer.age}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.email}</td>

                                <td>
                                    <button className="btn btn-warning btn-sm ml-2" onClick={(() => { onClick(customer.id) })}>View</button>
                                    <button className="btn btn-success btn-sm ml-2">Edit</button>
                                    <button className="btn btn-danger btn-sm ml-2">Delete</button>
                                </td>


                            </tr>

                        </tbody>
                    ))
                }

            </table>
            <div className="mt-5 text-center">
                <Pagination className='text-center' count={5} color="secondary" />
            </div>
        </div>
    )
}

export default CustomersList