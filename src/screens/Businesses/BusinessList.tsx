import React, { useContext, useEffect, useState } from 'react'
import "./AddBusiness.css"
import { Pagination } from '@mui/material'
import { deleteBusiness, getBusiness } from "../../Data/Businesses/Data"
import { useNavigate } from "react-router-dom"
import image2 from "../../Assets/placeholder.jpg"
import CircularProgress from '@mui/material/CircularProgress';
import { DataContext } from '../../context/ContextProvider'
import NotFound from '../NotFoundPage/NotFound'
import BusinessIcon from '@mui/icons-material/Business';


const BusinessList = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const { user, loggedUser, setBusiness, setBusinessId } = useContext(DataContext)
    useEffect(() => {
        getBusiness(setData, setIsLoading)
    }, [])


    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
    const onClick = (id: any) => {
        navigate(`/business/${id}/details`)
    }
    const onManage = (id: any) => {
        setBusiness(true)
        setBusinessId(id)
        navigate('/insights/overview')
    }
    console.log(data)
    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <>
                        {
                            data.length === 0 ? <NotFound icon={<BusinessIcon />} title="business" link="/businesses/add" /> :
                                <div className='container p-3'>
                                    <div className='row padding'>
                                        <div className="col-lg-6">
                                            <input className="form-control search mb-3" type="search" placeholder="Search by location" aria-label="Search"></input>
                                        </div>
                                        <div className="col-lg-6">

                                        </div>


                                    </div>

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Admin</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Actions</th>

                                            </tr>
                                        </thead>
                                        {
                                            currentPosts.map((business) => (
                                                <tbody>
                                                    <tr>

                                                        <th scope="row" style={{ display: "flex" }}  ><img className='business-image' src={business.imageUrl === null ? image2 : business.imageUrl} />{business.name} </th>
                                                        <td>{business.owner.name}</td>
                                                        <td>{business.businessPhone}</td>
                                                        <td>
                                                            <div className='m-2' style={{ display: "flex" }}>
                                                                <button className='btn btn-primary btn-sm m-1 active-button ' onClick={(() => onManage(business.id))} >Manage</button>
                                                                <button className="btn btn-warning btn-sm m-1" onClick={(() => { onClick(business.id) })}>View</button>
                                                                <button className="btn btn-success btn-sm m-1" onClick={(() => navigate(`/business/${business.id}/update-details`))}>Edit</button>
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


            }
        </>
    )
}

export default BusinessList