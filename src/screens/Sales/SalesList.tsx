import React, { useEffect, useState } from 'react'
import '../Businesses/AddBusiness.css'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { getSales } from '../../Data/Sales/Data'
import Table from '../../components/Table/Table'

const SalesList = ({ id }: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    getSales(setData, setIsLoading, id)
  }, [])
  const onView = (id: string | undefined) => {
    navigate(`/sales/${id}/details`)
  }
  const onEdit = (id: string | undefined) => {
    navigate(`/sales/${id}/update-details`)
  }
  const columns = [
    { header: 'Date', dataKey: 'createdAt' },
    { header: 'Customer Name', dataKey: 'customer.name' },
    { header: 'Customer Phone', dataKey: 'customer.phone' },
    { header: 'Amount Charged', dataKey: 'amountPaid' },
    { header: 'Amount Paid', dataKey: 'amountCharged' },
  ]
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <Table columns={columns} data={data} onEdit={onEdit} onView={onView} />
      )}
    </>
  )
}

export default SalesList
