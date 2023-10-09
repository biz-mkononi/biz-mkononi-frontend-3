import React, { useEffect, useMemo, useState } from 'react'
import '../Businesses/AddBusiness.css'
import { getEmployees } from '../../Data/Employees/Data'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '../../components/Table/Table'

const EmployeesList = ({ id }: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const memoizedEmployees = useMemo(() => {
    return data;
  },[data])
  useEffect(() => {
    getEmployees(setData, setIsLoading, id)
  }, [])

  const columns = [
    { header: 'Name', dataKey: 'name' },
    { header: 'Position', dataKey: 'position' },
    { header: 'Email', dataKey: 'email' },
    { header: 'Phone', dataKey: 'phone' },
    { header: 'ID number', dataKey: 'idNumber' },
  ]
  const onView = (id: string | undefined) => {
    navigate(`/employee/${id}/details`)
  }
  const onEdit = (id: string | undefined) => {
    navigate(`/employee/${id}/update-details`)
  }
  console.log(data)
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <Table columns={columns} onEdit={onEdit} onView={onView} data={memoizedEmployees} />
      )}
    </>
  )
}

export default EmployeesList
