import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import { Card } from '@mui/material'
import { addCustomer } from '../../Data/Customers/Data'
import { useNavigate } from 'react-router-dom'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import '../Businesses/AddBusiness.css'
import PersonIcon from '@mui/icons-material/Person'
import FormsLayout from '../../Layout/FormsLayout'
import Image from '../../components/FormFields/Image'
import Input from '../../components/FormFields/Input'
import TextArea from '../../components/FormFields/TextArea'

const AddCustomer = ({ id }: any) => {
  const initialState = {
    name: '',
    gender: '',
    yearOfBirth: '',
    phone: '',
    email: '',
    description: '',
    image: {},
  }
  const [displayImage, setDisplayImage] = useState('')
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] })
      setDisplayImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addCustomer(formData, navigate, setIsLoading, id)
    console.log(formData)
  }
  console.log(formData)

  return (
    <FormsLayout title="Customer">
      <Card className="p-3">
        <form onSubmit={onSubmit}>
          <div className="row padding mt-3">
            <div className="col-lg-4">
              <Input
                icon={<PersonIcon />}
                label="Name"
                handleChange={handleChange}
                name="name"
                placeholder="name"
                type="text"
              />
            </div>
            <div className="col-lg-4">
              <Input
                icon={<PersonIcon />}
                label="year of Birth"
                handleChange={handleChange}
                name="yearOfBirth"
                placeholder="year of birth"
                type="text"
              />
            </div>
            <div className="col-lg-4">
              <FormControl>
                <label htmlFor="basic-url" className="form-label">
                  Gender
                </label>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="male"
                  name="gender"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="FEMALE"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="MALE"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="row padding">
            <div className="col-lg-4">
              <Input
                icon={<EmailIcon />}
                label="Email"
                handleChange={handleChange}
                name="email"
                placeholder="email"
                type="email"
              />
            </div>
            <div className="col-lg-4">
              <Input
                icon={<PhoneIcon />}
                label="Phone"
                handleChange={handleChange}
                name="phone"
                placeholder="phone number"
                type="text"
              />
            </div>
          </div>
          <div className="row padding">
            <div className="col-lg-4">
              <TextArea handleDescriptionChange={handleDescriptionChange} />
            </div>
            <div className="col-lg-4">
              <Image
                handleFileChange={handleFileChange}
                displayImage={displayImage}
                label="Customer"
              />
            </div>
          </div>
          <div className="text-center mt-3">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'Adding' : 'Add Customer'}
            </button>
          </div>
        </form>
      </Card>
    </FormsLayout>
  )
}

export default AddCustomer
