import React, { useEffect, useState } from 'react'
import '../Businesses/AddBusiness.css'
import { Pagination } from '@mui/material'
import { getEmployees } from '../../Data/Employees/Data'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

const EmployeesList = ({ id }: any) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
  useEffect(() => {
    getEmployees(setData, setIsLoading, id)
  }, [])

  console.log(data)
  const onClick = (id: any) => {
    localStorage.setItem('employeeId', JSON.stringify({ id }))
    navigate(0)
  }
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="container p-3">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Position</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">ID Number</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {currentPosts.map((employee) => (
              <tbody>
                <tr>
                  <th scope="row">{employee.name}</th>
                  {/* <td>{new Date(employee.createdAt).toLocaleDateString(undefined, options)}</td> */}
                  <td>{employee.position}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.idNumber}</td>

                  <td>
                    <div style={{ display: 'flex' }}>
                      <button
                        className="btn btn-warning btn-sm m-2"
                        onClick={() =>
                          navigate(`/employee/${employee.id}/details`)
                        }
                      >
                        View
                      </button>
                      <button
                        className="btn btn-success btn-sm m-2"
                        onClick={() =>
                          navigate(`/employee/${employee.id}/update-details`)
                        }
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <div className="mt-5 text-center">
            <Pagination
              className="text-center"
              count={Math.ceil(data.length / postsPerPage)}
              onChange={handleChange}
              color="secondary"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default EmployeesList
