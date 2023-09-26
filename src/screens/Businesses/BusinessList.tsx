import React, { useContext, useEffect, useState } from 'react'
import './AddBusiness.css'
import { getBusiness } from '../../Data/Businesses/Data'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { DataContext } from '../../context/ContextProvider'
import NotFound from '../NotFoundPage/NotFound'
import BusinessIcon from '@mui/icons-material/Business'
import Table from '../../components/Table/Table'

const BusinessList = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { setBusiness, setBusinessId } = useContext(DataContext)
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
              data={data}
            />
          )}
        </>
      )}
    </>
  )
}

export default BusinessList
