import React, { useState } from 'react'
import CategoryIcon from '@mui/icons-material/Category'
import { Card } from '@mui/material'
import '../Businesses/AddBusiness.css'
import image from '../../Assets/placeholder.jpg'
import { addCategory } from '../../Data/Categories/Data'
import { useNavigate } from 'react-router-dom'

const NewCategory = ({ id }: any) => {
  const initialState = { name: '', description: '', image: {} }

  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [displayImage, setDisplayImage] = useState('')

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
    addCategory(formData, navigate, setIsLoading, id)
  }

  return (
    <div className="add-business container p-4 ">
      <h2 className="mb-3">Add Category</h2>

      <hr className="light mb-3" />
      <p className="mb-4">Add a new category to your business</p>
      <Card className="p-3">
        <form onSubmit={onSubmit}>
          <label htmlFor="basic-url" className="form-label ">
            Name
          </label>
          <div className="input-group mb-5">
            <span className="input-group-text" id="basic-addon1">
              <CategoryIcon />
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
          <label htmlFor="basic-url" className="form-label ">
            Description
          </label>
          <div className="input-group mb-3">
            <textarea
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
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'Adding' : 'Add Category'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default NewCategory
