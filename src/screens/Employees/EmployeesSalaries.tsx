import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { getSalaries } from "../../Data/Salaries/Data"
import { useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';

const EmployeesSalaries = ({ id }: any) => {
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
        getSalaries(setData, setIsLoading, id)
    }, [])

    console.log(data)
    const onClick = (id: any) => {
        navigate(`/employees/salaries/${id}/details`)
    }
    return (<>
        {
            isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                <div className='container p-3'>
                    <input className="form-control search mb-3" type="search" placeholder="Search by location" aria-label="Search"></input>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Payment Date</th>
                                <th scope="col">Employee</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Details</th>
                                <th scope="col">Actions</th>

                            </tr>
                        </thead>
                        {
                            currentPosts.map((salary) => (
                                <tbody>
                                    <tr>
                                        <td>{new Date(salary.createdAt).toLocaleDateString(undefined, options)}</td>
                                        <td>{salary.employee.name}</td>
                                        <td>{salary.amount}</td>
                                        <td>{salary.description}</td>

                                        <td>
                                            <div style={{ display: "flex" }}>
                                                <button className="btn btn-warning btn-sm m-2" onClick={(() => { onClick(salary.id) })}>View</button>
                                                <button className="btn btn-success btn-sm m-2" onClick={(() => navigate(`/employees/salaries/${salary.id}/update-details`))}>Edit</button>
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

export default EmployeesSalaries