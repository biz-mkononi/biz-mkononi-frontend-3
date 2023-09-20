import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { verifyPhone } from '../../Data/Auth/Data'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import AuthLayout from '../../Layout/AuthLayout'

const VerifyPhone = () => {
  const navigate = useNavigate()

  const initialState = { code: '', password: '', phone: '', password2: '' }
  const [formData, setFormData] = useState(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const phoneVerification = () => {
    verifyPhone(formData)
    navigate('/auth/login')
  }
  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center login">
        <h3 className="mt-2 mb-5 text-center font-bold">Verify Phone</h3>
        <div className="mb-2 ">
          <TextField
            id="standard-basic"
            name="phone"
            label="phone"
            required
            onChange={handleChange}
            variant="standard"
            className="w-64 mb-3"
          />
        </div>
        <div className="mb-2 ">
          <TextField
            id="standard-basic"
            label="Code"
            name="code"
            onChange={handleChange}
            variant="standard"
            className="w-64 mb-3"
            required
          />
        </div>
        <div className="mt-3 text-center sign-button">
          <button
            className="btn btn-primary btn-md"
            onClick={phoneVerification}
          >
            Verify Phone
          </button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default VerifyPhone
