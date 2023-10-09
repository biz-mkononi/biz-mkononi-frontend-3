import React, { useState, useEffect } from 'react'
import BusinessIcon from '@mui/icons-material/Business'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import { Card } from '@mui/material'
import './AddBusiness.css'
import {
  getSingleBusiness,
  updateSingleBusiness,
} from '../../Data/Businesses/Data'
import image from '../../Assets/placeholder.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import Image from '../../components/FormFields/Image'
import FormsLayout from '../../Layout/FormsLayout'

interface data {
  name: ''
  location: ''
  owner: {
    name: ''
  }
  productType: ''
  businessEmail: ''
  businessPhone: ''
  description: ''
  locationDetails: ''
}

const UpdateBusinessDetails = () => {
  const locationLabel = { label: '' }

  const [location, selectLocation] = useState(locationLabel)
  const [data, setData] = useState<data | any>({})
  const [isLoading, setIsloading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [displayImage, setDisplayImage] = useState('')
  const navigate = useNavigate()

  const [formData, setFormData] = useState({})

  const params = useParams()

  useEffect(() => {
    getSingleBusiness(setData, params.id, setIsloading, setFormData)
  }, [location])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] })
      setDisplayImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newData = new FormData()

    updateSingleBusiness(formData, navigate, params.id, setIsUpdating)
  }
  console.log(formData)
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <FormsLayout title="Business" update>
          <Card className="p-3">
            <form onSubmit={onSubmit}>
              <div className="row padding mt-3">
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label ">
                    Business Name
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
                </div>
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label">
                    Business Email
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <EmailIcon />
                    </span>
                    <input
                      defaultValue={data.businessEmail}
                      type="text"
                      onChange={handleChange}
                      name="businessEmail"
                      className="form-control"
                      placeholder="email"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label">
                    Business Phone
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <PhoneIcon />
                    </span>
                    <input
                      defaultValue={data.businessPhone}
                      type="text"
                      onChange={handleChange}
                      name="businessPhone"
                      className="form-control"
                      placeholder="phone"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div className="row padding">
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label ">
                    Location
                  </label>
                  <div className="input-group mb-5">
                    {/* <GooglePlacesAutocomplete
                      selectProps={{
                        location,
                        onChange: selectLocation,
                        placeholder: data.location,
                        className: 'places',
                      }}
                    /> */}
                  </div>
                </div>
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label">
                    Location Details
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <LocationOnIcon />
                    </span>
                    <input
                      defaultValue={data.locationDetails}
                      type="text"
                      onChange={handleChange}
                      name="locationDetails"
                      className="form-control"
                      placeholder="details"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label">
                    Product Type
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <ProductionQuantityLimitsIcon />
                    </span>
                    <select
                      className="form-select"
                      value={data.productType}
                      onChange={handleTypeChange}
                      name="productType"
                      aria-label="Default select example"
                      id="basic-addon1"
                    >
                      <option value="PRODUCT">Product</option>
                      <option value="SERVICE">Service</option>
                      <option value="SERVICE_PRODUCT">Service_product</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row padding">
                <div className="col-lg-4">
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
                </div>
                <div className="col-lg-4">
                  <Image
                    handleFileChange={handleImageChange}
                    update
                    displayImage={displayImage}
                    label="Business"
                    data={data}
                  />
                </div>
              </div>
              <div className="text-center mt-3">
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  disabled={isUpdating ? true : false}
                >
                  {isUpdating ? 'updating' : 'Update Business'}
                </button>
              </div>
            </form>
          </Card>
        </FormsLayout>
      )}
    </>
  )
}

export default UpdateBusinessDetails
