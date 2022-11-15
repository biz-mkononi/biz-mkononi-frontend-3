import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { useNavigate } from "react-router-dom"
import { getIncomes } from '../../Data/Incomes/Data'
import CircularProgress from '@mui/material/CircularProgress';


const Income = () => {
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
        getIncomes(setData, setIsLoading)
    }, [])

    console.log(data)
    const onClick = (id: any) => {
        navigate(`/income/${id}/details`)
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
                                    <th scope="col">Date</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>

                                </tr>
                            </thead>
                            {
                                currentPosts.map((income) => (
                                    <tbody>
                                        <tr>
                                            <td>{new Date(income.txDate).toLocaleDateString(undefined, options)}</td>
                                            <td>{income.title}</td>
                                            <td>{income.amount}</td>
                                            <td>{income.description}</td>

                                            <td>
                                                <button className="btn btn-warning btn-sm ml-2" onClick={(() => { onClick(income.id) })}>View</button>
                                                <button className="btn btn-success btn-sm ml-2" onClick={(() => navigate(`/income/${income.id}/update-details`))}>Edit</button>
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

export default Income