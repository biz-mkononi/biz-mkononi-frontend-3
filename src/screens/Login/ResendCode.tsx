import React, { useState } from 'react'
import AuthLayout from '../../Layout/AuthLayout'
import { useNavigate } from 'react-router-dom'
import { resendVerification } from '../../Data/Auth/Data'
import { TextField } from '@mui/material'
import './Login.css'

const ResendCode = () => {
  const navigate = useNavigate()
  const [dataErrors, setDataErrors] = useState('')

  const initialState = { code: '', password: '', phone: '', password2: '' }
  const [formData, setFormData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const resendCode = () => {
    setIsLoading(true)
    resendVerification(formData, setIsLoading, setDataErrors, navigate)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <AuthLayout>
      <div className="login flex flex-col justify-center items-center">
        <h5 className="mt-3 mb-5 text-center font-bold">Resend Code</h5>
        {dataErrors && (
          <p className="text-center text-danger mb-3">{dataErrors}</p>
        )}
        <div className=" mb-3">
          <TextField
            size="small"
            id="standard-basic"
            label="Phone"
            name="phone"
            onChange={handleChange}
            variant="standard"
            className="w-64 mb-3 focus:border-none focus:outline-none focus:ring-none"
          />
        </div>
        <div className="mt-3 text-center sign-button">
          {isLoading ? (
            <button className="btn btn-primary btn-md" disabled>
              resending
            </button>
          ) : (
            <button className="btn btn-primary btn-md" onClick={resendCode}>
              Resend
            </button>
          )}
        </div>
      </div>
    </AuthLayout>
  )
}

export default ResendCode
