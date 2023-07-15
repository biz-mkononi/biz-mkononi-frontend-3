import React, { useEffect, useState } from 'react'
import BusinessIcon from '@mui/icons-material/Business'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd'
import { Card } from '@mui/material'
import '../Businesses/AddBusiness.css'
import image from '../../Assets/placeholder.jpg'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleProduct } from '../../Data/Products/Data'
import CircularProgress from '@mui/material/CircularProgress'
import {
  getSingleCategory,
  updateSingleCategory,
} from '../../Data/Categories/Data'

interface data {
  name: ''
  description: ''
}

const UpdateCategories = ({ id }: any) => {
  const [data, setData] = useState<data | any>({})
  const [isLoading, setIsloading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [displayImage, setDisplayImage] = useState('')

  const navigate = useNavigate()

  const [formData, setFormData] = useState({})

  const params = useParams()

  useEffect(() => {
    getSingleCategory(setData, params.id, setIsloading, setFormData, id)
  }, [location])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] })
      setDisplayImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateSingleCategory(formData, navigate, params.id, setIsUpdating, id)
  }
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="add-business container p-4 ">
          <h2 className="mb-3">Update Category Details</h2>
          <div className="row padding">
            <div className="col-lg-6">
              <div className="details-button" style={{ display: 'flex' }}>
                <button
                  className="btn btn-secondary btn-md"
                  onClick={() => navigate(-1)}
                >
                  {' '}
                  Back
                </button>
              </div>
            </div>
          </div>
          <Card className="p-3">
            <form onSubmit={onSubmit}>
              <label htmlFor="basic-url" className="form-label ">
                Name
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <BusinessIcon />
                </span>
                <input
                  defaultValue={data.name}
                  type="text"
                  onChange={handleChange}
                  name="name"
                  className="form-control"
                  placeholder="name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <label htmlFor="basic-url" className="form-label ">
                Description
              </label>
              <div className="input-group mb-3">
                <textarea
                  defaultValue={data.description}
                  className="form-control"
                  onChange={handleDescriptionChange}
                  name="description"
                  aria-label="With textarea"
                ></textarea>
              </div>
              <div className="mb-3 image-upload">
                <label htmlFor="formFile" className="form-label">
                  Click to set category image
                  <img
                    src={
                      displayImage === ''
                        ? data.imageUrl === null
                          ? image
                          : data.imageUrl
                        : displayImage
                    }
                    alt=""
                    className="business-form-image"
                  />
                </label>
                <input
                  className="form-control file "
                  onChange={handleFileChange}
                  name="image"
                  type="file"
                  id="formFile"
                />
              </div>
              <div className="text-center mt-3">
                {isUpdating ? (
                  <button className="btn btn-success btn-md" disabled>
                    updating
                  </button>
                ) : (
                  <button className="btn btn-success btn-md">
                    Update Category
                  </button>
                )}
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  )
}

export default UpdateCategories
