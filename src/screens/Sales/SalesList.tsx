import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import { getSales } from '../../Data/Sales/Data'


const SalesList = ({ id }: any) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
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
        getSales(setData, setIsLoading, id)
    }, [])

    console.log(data)
    const onClick = (id: any) => {
        navigate(`/sales/${id}/details`)
    }
    console.log(data)
    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className='container p-3'>
                        <input className="form-control search mb-3" type="search" placeholder="Search by location" aria-label="Search"></input>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Amount Charged</th>
                                    <th scope="col">Amount Paid</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col">Actions</th>

                                </tr>
                            </thead>
                            {
                                currentPosts.map((sale) => (
                                    <tbody>
                                        <tr>
                                            <td>{new Date(sale.createdAt).toLocaleDateString(undefined, options)}</td>
                                            <td>{sale.customer.name}</td>
                                            <td>{sale.amountCharged}</td>
                                            <td>{sale.amountPaid}</td>
                                            <td>{sale.amountCharged - sale.amountPaid}</td>
                                            <td>
                                                <div style={{ display: "flex" }}>
                                                    <button className="btn btn-warning btn-sm ml-2" onClick={(() => { onClick(sale.id) })}>View</button>
                                                    <button className="btn btn-success btn-sm ml-2" onClick={(() => navigate(`/sales/${sale.id}/update-details`))}>Edit</button>
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

export default SalesList