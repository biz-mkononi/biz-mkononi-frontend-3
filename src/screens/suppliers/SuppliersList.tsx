import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { getSuppliers } from "../../Data/Suppliers/Data"
import { useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';


const SuppliersList = ({ id }: any) => {
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
    useEffect(() => {
        getSuppliers(setData, setIsLoading, id)
    }, [])

    console.log(data)
    const onClick = (id: any) => {
        navigate(`/suppliers/${id}/details`)

    }

    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
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
                                currentPosts.map((supplier) => (
                                    <tbody>
                                        <tr>
                                            <th scope="row" >{supplier.name}</th>
                                            <td>{supplier.email}</td>
                                            <td>{supplier.phone}</td>
                                            <td>
                                                <div style={{ display: "flex" }}>
                                                    <button className="btn btn-warning btn-sm ml-2" onClick={(() => { onClick(supplier.id) })}>View</button>
                                                    <button className="btn btn-success btn-sm ml-2" onClick={(() => navigate(`/suppliers/${supplier.id}/update-details`))}>Edit</button>
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

export default SuppliersList