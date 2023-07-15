import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { useNavigate } from "react-router-dom"
import { getExpenses } from '../../Data/Expenses/Data'
import CircularProgress from '@mui/material/CircularProgress';


const Expense = ({ id }: any) => {
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
        getExpenses(setData, setIsLoading, id)
    }, [])

    console.log(data)
    const onClick = (id: any) => {
        navigate(`/expense/${id}/details`)
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
                                currentPosts.map((expense) => (
                                    <tbody>
                                        <tr>
                                            <td>{new Date(expense.txDate).toLocaleDateString(undefined, options)}</td>
                                            <td>{expense.title}</td>
                                            <td>{expense.amount}</td>
                                            <td>{expense.description}</td>

                                            <td>
                                                <div style={{ display: "flex" }}>
                                                    <button className="btn btn-warning btn-sm m-2" onClick={(() => { onClick(expense.id) })}>View</button>
                                                    <button className="btn btn-success btn-sm m;-2" onClick={(() => navigate(`/expense/${expense.id}/update-details`))}>Edit</button>
                                                </div>

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

export default Expense