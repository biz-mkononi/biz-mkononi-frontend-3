import React, { useEffect, useState } from 'react'
import "./AddBusiness.css"
import { Pagination } from '@mui/material'
import { deleteBusiness, getBusiness } from "../../Data/Businesses/Data"
import { useNavigate } from "react-router-dom"
import image2 from "../../Assets/placeholder.jpg"
import CircularProgress from '@mui/material/CircularProgress';


const BusinessList = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)

    useEffect(() => {
        getBusiness(setData, setIsLoading)
    }, [])

    const onDelete = (id: any) => {
        deleteBusiness(setData, id, setIsLoading)
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
    const onClick = (id: any) => {
        localStorage.setItem("businessId", JSON.stringify({ id }));
        navigate(`/business/${id}/details`)
    }
    console.log(data)
    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className='container p-3'>
                        <div className='row padding'>
                            <div className="col-lg-6">
                                <input className="form-control search mb-3" type="search" placeholder="Search by location" aria-label="Search"></input>
                            </div>
                            <div className="col-lg-6">
                                <div className="text-right">
                                    <button className='btn btn-primary active-button btn-md m-2 mb-3' >Manage</button>
                                </div>
                            </div>


                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Admin</th>
                                    <th scope="col">ProductType</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Actions</th>

                                </tr>
                            </thead>
                            {
                                currentPosts.map((business) => (
                                    <tbody>
                                        <tr>

                                            <th scope="row" style={{ display: "flex" }}  ><img className='business-image' src={image2} />{business.name} </th>
                                            <td>{business.owner.name}</td>
                                            <td>{business.productType}</td>
                                            <td>{business.businessEmail}</td>
                                            <td>{business.businessPhone}</td>
                                            <td>
                                                <div style={{ display: "flex" }}>
                                                    <button className="btn btn-warning btn-sm ml-2" onClick={(() => { onClick(business.id) })}>View</button>
                                                    <button className="btn btn-success btn-sm ml-2" onClick={(() => navigate(`/business/${business.id}/update-details`))}>Edit</button>
                                                </div>

                                            </td>


                                        </tr>

                                    </tbody>
                                ))
                            }

                        </table>
                        <div className="mt-5 text-center">
                            <Pagination className='text-center' count={Math.floor(data.length / 3)} onChange={handleChange} color="secondary" />
                        </div>
                    </div>
            }
        </>
    )
}

export default BusinessList