import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { getCategory } from "../../Data/Categories/Data"
import { useNavigate } from "react-router-dom"

const CategoriesList = () => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' }
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        getCategory(setData)
    }, [])

    console.log(data)
    const onClick = (id: any) => {
        localStorage.setItem("categoryId", JSON.stringify({ id }));
        navigate(0)
    }
    return (
        <div className='container p-3'>
            <input className="form-control search mb-3" type="search" placeholder="Search by location" aria-label="Search"></input>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date Added</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                {
                    data.map((category) => (
                        <tbody>
                            <tr>
                                <th scope="row" >{category.name}</th>
                                <td>{category.description}</td>
                                <td>{new Date(category.createdAt).toLocaleDateString(undefined, options)}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm ml-2" onClick={(() => { onClick(category.id) })}>View</button>
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

export default CategoriesList