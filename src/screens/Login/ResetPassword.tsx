import React, { useState } from 'react'
import { TextField, InputAdornment, IconButton, Alert } from '@mui/material'
import { changePassword } from '../../Data/Auth/Data'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../Layout/AuthLayout'
import './Login.css'

const ResetPassword = () => {
  const navigate = useNavigate()
  const initialState = { code: '', password: '', phone: '', password2: '' }
  const [formData, setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dataErrors, setDataErrors] = useState('')

  const handleShowPassword = () => setShowPassword(!showPassword)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const changingPassword = () => {
    setIsLoading(true)
    changePassword(setDataErrors, formData, setIsLoading, navigate)
  }

  return (
    <AuthLayout>
      {dataErrors !== '' && (
        <Alert
          variant="standard"
          onClose={() => setDataErrors('')}
          severity="error"
        >
          {dataErrors}
        </Alert>
      )}
      <div className="flex flex-col justify-center items-center login  ">
      <h5 className="mt-3 mb-5 font-bold" >
        Reset Password
      </h5>
      <div className="mb-3">
        <TextField
          id="standard-basic"
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          variant="standard"
          className="w-64 mb-3"
        />
      </div>
      <div className="mb-3">
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
      <div className="mb-2 ">
        <TextField
          id="standard-basic"
          label="new password"
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          name="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  {showPassword ? (
                    <VisibilityOff onClick={handleShowPassword} />
                  ) : (
                    <Visibility onClick={handleShowPassword} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="standard"
          className="w-64 mb-3"
          required
        />
      </div>
      <div className="mb-2 ">
        <TextField
          id="standard-basic"
          label="Confirm Password"
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          name="password2"
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  {showPassword ? (
                    <VisibilityOff onClick={handleShowPassword} />
                  ) : (
                    <Visibility onClick={handleShowPassword} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="w-64 mb-3"
          required
        />
      </div>
      <div className="mt-3 text-center sign-button">
        {isLoading ? (
          <button className="btn btn-primary btn-md" disabled>
            Resetting Password
          </button>
        ) : (
          <button className="btn btn-primary btn-md" onClick={changingPassword}>
            Reset Password
          </button>
        )}
      </div>
      </div>
    </AuthLayout>
  )
}

export default ResetPassword
