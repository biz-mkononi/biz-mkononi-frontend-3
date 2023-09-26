import React, { useEffect, useState } from 'react'
import '../Businesses/AddBusiness.css'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { getSupplies } from '../../Data/Supplies/Data'
import Table from '../../components/Table/Table'

const SuppliesList = ({ id }: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    getSupplies(setData, setIsLoading, id)
  }, [])

  const onView = (id: string |undefined) => {
    navigate(`/supplies/${id}/details`)
  }
  const onEdit = (id: string |undefined) => {
    navigate(`/supplies/${id}/update-details`)
  }
  const columns = [
    { header: 'Date', dataKey: 'createdAt' },
    { header: 'Supplier Name', dataKey: 'supplier.name' },
    { header: 'Supplier Phone', dataKey: 'supplier.phone' },
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
        <Table columns={columns} data={data} onEdit={onEdit} onView={onView}/>
      )}
    </>
  )
}

export default SuppliesList
