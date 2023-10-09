import React, { useEffect, useMemo, useState } from 'react'
import './AddBusiness.css'
import { getBusiness } from '../../Data/Businesses/Data'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import NotFound from '../NotFoundPage/NotFound'
import BusinessIcon from '@mui/icons-material/Business'
import Table from '../../components/Table/Table'

const BusinessList = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const memoizedBusinesses = useMemo(() => {
    return data;
  },[data])
  useEffect(() => {
    getBusiness(setData, setIsLoading)
  }, [])

  const onView = (id: string | undefined) => {
    navigate(`/business/${id}/details`)
  }

  const onEdit = (id: string | undefined) => {
    navigate(`/business/${id}/update-details`)
  }

  const columns = [
    { header: 'Name', dataKey: 'name' },
    { header: 'Admin', dataKey: 'owner.name' },
    { header: 'Phone', dataKey: 'businessPhone' },
  ]

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          {data.length === 0 ? (
            <NotFound
              icon={<BusinessIcon />}
              title="business"
              link="/businesses/add"
            />
          ) : (
            <Table
              columns={columns}
              onEdit={onEdit}
              onView={onView}
              Business
              data={memoizedBusinesses}
            />
          )}
        </>
      )}
    </>
  )
}

export default BusinessList
