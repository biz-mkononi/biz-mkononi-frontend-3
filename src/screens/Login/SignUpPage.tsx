import React, { useState } from 'react'
import { TextField, Alert, InputAdornment, IconButton } from '@mui/material'
import { registerUser, resendVerification } from '../../Data/Auth/Data'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import './Login.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../Layout/AuthLayout'

interface IFormInputs {
  name: string
  email: string
  code: string
  phone: string
  password: string
  password2: string
}
interface functions {
  switchmode: any
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('First Name is required')
    .min(3, 'First Name must be at least 3 characters')
    .max(112, 'First Name should not exceed 12 characters'),

  email: yup
    .string()
    .required('Email is required')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Email is invalid'),
  phone: yup.string().required('Phone Number is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'password should not exceed 16 characters'),
  password2: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must and should match'),
})

const SignUpPage = () => {
  const navigate = useNavigate()
  const [isRegistering, setIsRegistering] = useState(false)
  const [dataErrors, setDataErrors] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const initialState = { code: '', password: '', phone: '', password2: '' }
  const [formData, setFormData] = useState(initialState)



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  })

  const handleShowPassword = () => setShowPassword(!showPassword)
  const verifyPhoneNumber = () => navigate('/auth/verify-phone')
  const resendVerificationCode = () => navigate('/auth/resend-code')

  const onSubmit = () => {
    setIsRegistering(true)
    registerUser(setDataErrors, formData, setIsRegistering)
  }

  console.log(dataErrors)
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
              <div className='login flex flex-col justify-center items-center'>
              <h5
                className="mt-2 mb-5 text-center "
                style={{ fontWeight: 'bold' }}
              >
                Create an Account
              </h5>
              <form onSubmit={onSubmit}>
                <div className="mb-2">
                  <TextField
                    size="small"
                    id="standard-basic"
                    label="Name"
                    {...register('name')}
                    variant="standard"
                    className="w-64 mb-3"
                  />
                </div>

                <div className="mb-2">
                  <TextField
                    size="small"
                    id="standard-basic"
                    label="Phone"
                    {...register('phone')}
                    variant="standard"
                    className="w-64 mb-3"
                  />
                </div>
                <div className="mb-2">
                  <TextField
                    size="small"
                    id="standard-basic"
                    label="email"
                    {...register('email')}
                    variant="standard"
                    className="w-64 mb-3"
                  />
                </div>
                <div className="mb-2">
                  <TextField
                    size="small"
                    id="standard-basic"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
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
                <div className="mb-2">
                  <TextField
                    size="small"
                    id="standard-basic"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password2')}
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
                  />
                </div>
                <div className="text-center mt-3 sign-button">
                  {isRegistering ? (
                    <button className="btn btn-primary btn-md" disabled>
                      Registering
                    </button>
                  ) : (
                    <button className="btn btn-primary btn-md">Register</button>
                  )}
                </div>
                <div className="text-center mt-3">
                  <p>
                    Already have an account yet?{' '}
                    <button className='bg-transparent' onClick={(() => navigate('/auth/login'))}>
                      Sign In
                    </button>
                  </p>
                </div>
                <div className="text-center mt-2">
                  <p>
                    Resend Verification SMS?{' '}
                    <button className='bg-transparent' onClick={resendVerificationCode}>
                      Resend
                    </button>
                  </p>
                </div>
                <div className=" text-center mt-2">
                  <p>
                    Verify Phone?{' '}
                    <button className='bg-transparent' onClick={verifyPhoneNumber}>
                      Verify Phone
                    </button>
                  </p>
                </div>
              </form>
              </div>
    </AuthLayout>
  )
}

export default SignUpPage
