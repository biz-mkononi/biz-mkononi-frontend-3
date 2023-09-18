import React, { useState } from 'react'
import { TextField, Alert } from '@mui/material'
import { forgotPassword } from '../../Data/Auth/Data'
import AuthLayout from '../../Layout/AuthLayout'
import "./Login.css"
import { useNavigate } from 'react-router-dom'

const GetForgotPasswordCode = () => {
  const initialState = { code: '', password: '', phone: '', password2: '' }
  const navigate = useNavigate()
  const [dataErrors, setDataErrors] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onForgotPassword = () => {
    setIsLoading(true)
    forgotPassword(setDataErrors, formData, setIsLoading, navigate)
  }
  return (
    <React.Fragment>
      
        <AuthLayout>
          {dataErrors !== '' && (
            <Alert
              variant="filled"
              onClose={() => setDataErrors('')}
              severity="error"
            >
              {dataErrors}
            </Alert>
          )}
          <div className="flex flex-col justify-center items-center login  ">
<h5 className="mt-3 mb-3 font-bold " >
            Forgot Password
          </h5>
          <div className=" mb-3">
            <TextField
              id="standard-basic"
              label="Phone"
              name="phone"
              onChange={handleChange}
              variant="standard"
              className=" mb-3"
            />
          </div>
          <div className="mt-3 sign-button">
            {isLoading ? (
              <button className="btn btn-primary btn-md" disabled>
                Submitting
              </button>
            ) : (
              <button
                className="btn btn-primary btn-md"
                onClick={onForgotPassword}
              >
                Submit
              </button>
            )}
          </div>
          </div>
          
        </AuthLayout>
    </React.Fragment>
  )
}

export default GetForgotPasswordCode
