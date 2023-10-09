import React, { useEffect, useMemo, useState } from 'react'
import '../Businesses/AddBusiness.css'
import { useNavigate } from 'react-router-dom'
import { getExpenses } from '../../Data/Expenses/Data'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '../../components/Table/Table'

const Expense = ({ id }: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const memoizedExpenses = useMemo(() => {
    return data;
  },[data])
  useEffect(() => {
    getExpenses(setData, setIsLoading, id)
  }, [])

  const onView = (id: string | undefined) => {
    navigate(`/expense/${id}/details`)
  }
  const onEdit = (id: string | undefined) => {
    navigate(`/expense/${id}/update-details`)
  }
  const columns = [
    { header: 'Title', dataKey: 'title' },
    { header: 'Transaction Date', dataKey: 'txDate' },
    { header: 'Amount', dataKey: 'amount' },
  ]
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <Table columns={columns} data={memoizedExpenses} onEdit={onEdit} onView={onView} />
      )}
    </>
  )
}

export default Expense
