import React, { useEffect, useState } from 'react'
import '../Businesses/AddBusiness.css'
import { Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getIncomes } from '../../Data/Incomes/Data'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '../../components/Table/Table'

const Income = ({ id }: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    getIncomes(setData, setIsLoading, id)
  }, [])

  const onView = (id: string | undefined) => {
    navigate(`/income/${id}/details`)
  }
  const onEdit = (id: string | undefined) => {
    navigate(`/income/${id}/update-details`)
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
        <Table columns={columns} data={data} onEdit={onEdit} onView={onView}/>
      )}
    </>
  )
}

export default Income
