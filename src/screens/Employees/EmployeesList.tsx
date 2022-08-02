import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { getEmployees } from "../../Data/Employees/Data"
import { useNavigate } from "react-router-dom"

const EmployeesList = () => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        getEmployees(setData)
    }, [])

    console.log(data)
    const onClick = (id: any) => {
        localStorage.setItem("employeeId", JSON.stringify({ id }));
        navigate(0)
    }
    return (
        <div className='container p-3'>
            <input className="form-control search mb-3" type="search" placeholder="Search by location" aria-label="Search"></input>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date Added</th>
                        <th scope="col">Position</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">ID Number</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                {
                    data.map((employee) => (
                        <tbody>
                            <tr>
                                <th scope="row" >{employee.name}</th>
                                <td>{new Date(employee.createdAt).toLocaleDateString(undefined, options)}</td>
                                <td>{employee.position}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.idNumber}</td>

                                <td>
                                    <button className="btn btn-warning btn-sm ml-2" onClick={(() => { onClick(employee.id) })}>View</button>
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

export default EmployeesList