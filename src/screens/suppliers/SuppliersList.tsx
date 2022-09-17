import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { getSuppliers } from "../../Data/Suppliers/Data"
import { useNavigate } from "react-router-dom"

const SuppliersList = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        getSuppliers(setData)
    }, [])

    console.log(data)
    const onClick = (id: any) => {
        localStorage.setItem("supplierId", JSON.stringify({ id }));
        navigate(0)
    }
    return (
        <div className='container '>
            <input className="form-control search mb-3" type="search" placeholder="Search by location" aria-label="Search"></input>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                {
                    data.map((supplier) => (
                        <tbody>
                            <tr>
                                <th scope="row" >{supplier.name}</th>
                                <td>{supplier.email}</td>
                                <td>{supplier.phone}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm ml-2" onClick={(() => { onClick(supplier.id) })}>View</button>
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

export default SuppliersList