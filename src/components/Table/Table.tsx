import React, { useContext, useState } from 'react'
import { commonProperties } from '../../utils/types/TableTypes'
import image2 from '../../Assets/placeholder.jpg'
import { Pagination } from '@mui/material'
import { DataContext } from '../../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import { renderCell } from '../../utils/ReusableFunctions/FormatTable'

interface Column {
  header: string
  dataKey: string
}

interface TableProps {
  columns: Column[]
  onView: (id: string | undefined) => void
  onEdit: (id: string | undefined) => void
  data: any[]
  Business?: boolean
}
const Table = ({ columns, onEdit, onView, data, Business }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)
  const { setBusiness, setBusinessId } = useContext(DataContext)
  const navigate = useNavigate()
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)

  const onManage = (id: string | undefined) => {
    setBusiness(true)
    setBusinessId(id)
    navigate('/insights/overview')
  }
  return (
    <div className="container p-3">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column, colIndex) => (
                <th key={colIndex} scope="col">
                  {column.header}
                </th>
              ))}
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {currentPosts.map((business: commonProperties, rowIndex) => (
            <tbody>
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <>
                    {column.dataKey === 'name' ? (
                      <td className="flex  space-x-2 ">
                        <img
                          className="w-6 h-6 mb-3 rounded-full mr-2"
                          src={
                            business?.imageUrl === null
                              ? image2
                              : business.imageUrl
                          }
                        />
                        <h1 className="font-semibold">{business.name}</h1>
                      </td>
                    ) : (
                      <td
                        className="flex-row items-center justify-center"
                        key={colIndex}
                      >
                        {renderCell(business, column)}
                      </td>
                    )}
                  </>
                ))}

                <td>
                  <div className="flex items-center space-x-2">
                    {Business && (
                      <button
                        className="btn btn-primary btn-sm m-1 active-button "
                        onClick={() => onManage(business.id)}
                      >
                        Manage
                      </button>
                    )}
                    <button
                      className="btn btn-warning btn-sm "
                      onClick={() => onView(business.id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-success btn-sm "
                      onClick={() => onEdit(business.id)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="mt-5 text-center">
        <Pagination
          className="text-center"
          count={Math.ceil(data.length / postsPerPage)}
          onChange={handleChange}
          color="secondary"
        />
      </div>
    </div>
  )
}

export default Table
