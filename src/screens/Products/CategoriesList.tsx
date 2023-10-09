import React, { useEffect, useMemo, useState } from 'react'
import '../Businesses/AddBusiness.css'
import { getCategory } from '../../Data/Categories/Data'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '../../components/Table/Table'

const CategoriesList = ({ id }: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const memoizedCategories = useMemo(() => {
    return data;
  },[data])
  useEffect(() => {
    getCategory(setData, setIsLoading, id)
  }, [])
  const onView = (id: string | undefined) => {
    navigate(`/categories/${id}/details`)
  }
  const onEdit = (id: string | undefined) => {
    navigate(`/categories/${id}/update-details`)
  }
  const columns = [{ header: 'Name', dataKey: 'name' }]
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <Table columns={columns} data={memoizedCategories} onEdit={onEdit} onView={onView} />
      )}
    </>
  )
}

export default CategoriesList
