import React, { useEffect, useMemo, useState } from 'react'
import '../Businesses/AddBusiness.css'
import { getProducts } from '../../Data/Products/Data'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '../../components/Table/Table'

const ProductsList = ({ id }: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const memoizedProducts = useMemo(() => {
    return data;
  },[data])
  useEffect(() => {
    getProducts(setData, setIsLoading, id)
  }, [])

  const onView = (id: string | undefined) => {
    navigate(`/products/${id}/details`)
  }
  const onEdit = (id: string | undefined) => {
    navigate(`/products/${id}/update-details`)
  }
  const columns = [
    { header: 'Name', dataKey: 'name' },
    { header: 'Category', dataKey: 'category.name' },
    { header: 'Size', dataKey: 'size' },
    { header: 'Stock', dataKey: 'stock' },
  ]
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <Table columns={columns} data={memoizedProducts} onEdit={onEdit} onView={onView} />
      )}
    </>
  )
}

export default ProductsList
