import React, { useEffect, useState } from 'react'
import "./AddBusiness.css"
import { Pagination } from '@mui/material'
import { getBusiness } from "../../Data/Businesses/Data"
import { useNavigate } from "react-router-dom"

const BusinessList = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        getBusiness(setData)
    }, [])

    console.log(data)
    const onClick = (id: any) => {
        localStorage.setItem("businessId", JSON.stringify({ id }));
        navigate(0)
    }
    return (
        <div className='container p-3'>
            <input className="form-control search mb-3" type="search" placeholder="Search by location" aria-label="Search"></input>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Admin</th>
                        <th scope="col">Product Type</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                {
                    data.map((business) => (
                        <tbody>
                            <tr>
                                <th scope="row" >{business.name}</th>
                                <td>{business.location}</td>
                                <td>{business.owner.name}</td>
                                <td>{business.productType}</td>
                                <td>{business.businessEmail}</td>
                                <td>{business.businessPhone}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm" onClick={(() => { onClick(business.id) })}>Manage</button>
                                </td>
                                <td>
                                    <button className="btn btn-success btn-sm">Details</button>
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

export default BusinessList