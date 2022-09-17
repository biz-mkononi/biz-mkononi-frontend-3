import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { getSalaries } from "../../Data/Salaries/Data"
import { useNavigate } from "react-router-dom"

const EmployeesSalaries = () => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        getSalaries(setData)
    }, [])

    console.log(data)
    const onClick = (id: any) => {
        localStorage.setItem("employeeSalaryId", JSON.stringify({ id }));
        navigate(0)
    }
    return (
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
                    data.map((salary) => (
                        <tbody>
                            <tr>
                                <td>{new Date(salary.createdAt).toLocaleDateString(undefined, options)}</td>
                                <td>{salary.employee.name}</td>
                                <td>{salary.amount}</td>
                                <td>{salary.description}</td>

                                <td>
                                    <button className="btn btn-warning btn-sm ml-2" onClick={(() => { onClick(salary.id) })}>View</button>
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

export default EmployeesSalaries