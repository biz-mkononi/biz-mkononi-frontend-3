import React, { useEffect, useMemo, useState } from 'react'
import '../Businesses/AddBusiness.css'
import { getSuppliers } from '../../Data/Suppliers/Data'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '../../components/Table/Table'

const SuppliersList = ({ id }: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const memoizedSuppliers = useMemo(() => {
    return data;
  },[data])
  useEffect(() => {
    getSuppliers(setData, setIsLoading, id)
  }, [])
  const onView = (id: string | undefined) => {
    navigate(`/suppliers/${id}/details`)
  }
  const onEdit = (id: string | undefined) => {
    navigate(`/suppliers/${id}/update-details`)
  }
  const columns = [
    { header: 'Name', dataKey: 'name' },
    { header: 'Email', dataKey: 'email' },
    { header: 'Phone', dataKey: 'phone' },
  ]

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <Table columns={columns} onEdit={onEdit} onView={onView} data={memoizedSuppliers} />
      )}
    </>
  )
}

export default SuppliersList
