import React, { useContext, useState } from 'react'
import './Login.css'
import {
  TextField,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material'
import { login } from '../../Data/Auth/Data'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/ContextProvider'
import AuthLayout from '../../Layout/AuthLayout'

const LoginPage = () => {
  const navigate = useNavigate()
  const initialState = { code: '', password: '', phone: '', password2: '' }
  const [showPassword, setShowPassword] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)


  const { setLoggedUser } = useContext(DataContext)
  const [formData, setFormData] = useState(initialState)
  const [dataErrors, setDataErrors] = useState('')

  const handleShowPassword = () => setShowPassword(!showPassword)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmitLoginData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(setDataErrors, formData, navigate, setIsSigningIn, setLoggedUser)
  }


  const forgotPassword = () => navigate('/auth/get-forgot-password')
  return (
    <AuthLayout>
        <div className='login flex flex-col justify-center items-center'>
          {dataErrors !== '' && (
            <Alert
              variant="filled"
              onClose={() => setDataErrors('')}
              severity="error"
            >
              {dataErrors}
            </Alert>
          )}
          <h5 className="mt-5 mb-3  font-bold" >
            Sign In
          </h5>

          <form onSubmit={onSubmitLoginData}>
            <div className=" mb-3">
              <TextField
                size="small"
                id="standard-basic"
                label="Phone"
                name="phone"
                onChange={handleChange}
                variant="standard"
                className="w-64 mb-3"
                required
              />
            </div>

            <div className="mb-3 ">
              <TextField
                size="small"
                id="standard-basic"
                label="Password"
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
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
              />
            </div>
            <div className="text-center mb-2">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
              <p className="mt-3">
                {' '}
                <button className='bg-transparent' onClick={forgotPassword}>
                  Forgot password?
                </button>{' '}
              </p>
            </div>
            <div className="mt-3 text-center sign-button">
              {isSigningIn ? (
                <button className="btn btn-primary btn-md" disabled>
                  Signing In
                </button>
              ) : (
                <button className="btn btn-primary btn-md">Sign In</button>
              )}
            </div>
          </form>
          <div className="text-center mt-3">
            <p>
              Don't have an account yet?{' '}
              <button className='bg-transparent' onClick={(() => navigate('/auth/sign-up'))}>
                Sign Up
              </button>
            </p>
          </div>
        </div>
    </AuthLayout>
  )
}

export default LoginPage
