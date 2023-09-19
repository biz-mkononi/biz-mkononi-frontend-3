import React, { useState } from 'react'
import BusinessIcon from '@mui/icons-material/Business'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import { Card } from '@mui/material'
import { addEmployee } from '../../Data/Employees/Data'
import image from '../../Assets/placeholder.jpg'
import StarsIcon from '@mui/icons-material/Stars'
import '../Businesses/AddBusiness.css'
import { useNavigate } from 'react-router-dom'

const NewEmployee = ({ id }: any) => {
  const initialState = {
    name: '',
    phone: '',
    email: '',
    idNumber: '',
    position: '',
    image: {},
  }
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [displayImage, setDisplayImage] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    addEmployee(formData, navigate, setIsLoading, id)
  }

  return (
    <div className="add-business container p-4 ">
      <h2 className="mb-3">Add Employee</h2>

      <hr className="light mb-3" />
      <p className="mb-4">Add a new employee to your business</p>
      <Card className="p-3">
        <form onSubmit={onSubmit}>
          <div className="row padding mt-3">
            <div className="col-lg-4">
              <label htmlFor="basic-url" className="form-label ">
                Name
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <BusinessIcon />
                </span>
                <input
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
              <label htmlFor="basic-url" className="form-label ">
                Email
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <EmailIcon />
                </span>
                <input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  className="form-control"
                  placeholder="email"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <label htmlFor="basic-url" className="form-label">
                Phone
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <PhoneIcon />
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  name="phone"
                  className="form-control"
                  placeholder="phone number"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>
          <div className="row padding">
            <div className="col-lg-4">
              <label htmlFor="basic-url" className="form-label ">
                ID Number
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <EmailIcon />
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  name="idNumber"
                  className="form-control"
                  placeholder="id number"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <label htmlFor="basic-url" className="form-label">
                Position
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <StarsIcon />
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  name="position"
                  className="form-control"
                  placeholder="position"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>
          <div className="mb-3 image-upload">
            <label htmlFor="formFile" className="form-label">
              Click to set employee image
              <img
                src={displayImage === '' ? image : displayImage}
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
            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" disabled ={isLoading?true:false}>
                    {isLoading?"Adding":"Add Employee"}
                  </button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default NewEmployee
