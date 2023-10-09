import React, { useEffect, useMemo, useState } from 'react'
import '../Businesses/AddBusiness.css'
import { getSalaries } from '../../Data/Salaries/Data'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '../../components/Table/Table'

const EmployeesSalaries = ({ id }: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const memoizedSalaries = useMemo(() => {
    return data;
  },[data])
  useEffect(() => {
    getSalaries(setData, setIsLoading, id)
  }, [])

  const onView = (id: string | undefined) => {
    navigate(`/employees/salaries/${id}/details`)
  }
  const onEdit = (id: string | undefined) => {
    navigate(`/employees/salaries/${id}/update-details`)
  }
  const columns = [
    { header: 'Employee', dataKey: 'employee.name' },
    { header: 'Payment Date', dataKey: 'txDate' },
    { header: 'Amount', dataKey: 'amount' },
    { header: 'Position', dataKey: 'employee.position' },
  ]
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <Table columns={columns} onEdit={onEdit} onView={onView} data={memoizedSalaries} />
      )}
    </>
  )
}

export default EmployeesSalaries
