import React, {useContext, useState} from 'react';
import {Alert} from '@mui/material';
import {registerUser} from '../../Data/Auth/Data';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.css';
import {useNavigate} from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import { DataContext } from '../../context/ContextProvider';


const SignUpPage = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [dataErrors, setDataErrors] = useState('');
  const [showPassword, setShowPassword] = useState(false);


const {formData,setFormData} = useContext(DataContext)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
 const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setPasswordsMatch(e.target.value === confirmPassword);
    setFormData({...formData, ['password']: e.target.value});
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, ['password2']: e.target.value});
  };


  const handleShowPassword = () => setShowPassword(!showPassword);
  const verifyPhoneNumber = () => navigate('/auth/verify-phone');
  const resendVerificationCode = () => navigate('/auth/resend-code');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  setIsRegistering(true);
    registerUser(setDataErrors, formData, setIsRegistering,navigate);
  };

console.log(formData)
  return (
    <AuthLayout>
      {dataErrors !== '' && (
        <Alert
            variant="filled"
            onClose={() => setDataErrors('')}
            severity="error">
            {dataErrors}
          </Alert>
      )}
      <div className="login flex flex-col justify-center items-center">
        <h5 className="mt-2 mb-3 text-center " style={{fontWeight: 'bold'}}>
          Create an Account
        </h5>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
      <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="name">
        Name
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="name"
        required
        name='name'
        onChange={handleChange}
      />
    </div>
     <div className="mb-3">
      <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="phone">
        Phone
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="phone"
        type="text"
        placeholder="phone"
        required
        name='phone'
        onChange={handleChange}
      />
    </div>
 <div className="mb-3">
      <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="email">
        Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        placeholder="email"
        required
        name='email'
        onChange={handleChange}
      />
    </div>
          <div className="mb-3">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
        <div className="relative">
        <input
          className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="password"
          name='password'
          required
          onChange={handlePasswordChange}
        />
        <button
        type='button'
          className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4"
          onClick={handleShowPassword}
        >
          {showPassword ? (
            <VisibilityOff  />
          ) : (
            <Visibility  />
          )}
        </button>
      </div>
      </div>
       <div className="mb-3">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
        Confirm Password
      </label>
        <div className="relative">
        <input
          className="shadow appearance-none border bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password2"
          type={showPassword ? 'text' : 'password'}
          placeholder="password"
          name='password2'
          required
          onChange={handleConfirmPasswordChange}
        />
        <button
        type='button'
          className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4"
          onClick={handleShowPassword}
        >
          {showPassword ? (
            <VisibilityOff  />
          ) : (
            <Visibility  />
          )}
        </button>
      </div>
      </div>
          <div className="text-center mt-3 sign-button">
            <button className="btn btn-primary btn-md"  >
              {isRegistering?'Registering':'Register'}
            </button>
          </div>
          <div className="text-center mt-3">
            <p>
              Already have an account yet?{' '}
              <button
                className="bg-transparent"
                onClick={() => navigate('/auth/login')}>
                Sign In
              </button>
            </p>
          </div>
          <div className="text-center mt-2">
            <p>
              Resend Verification SMS?{' '}
              <button
                className="bg-transparent"
                onClick={resendVerificationCode}>
                Resend
              </button>
            </p>
          </div>
          <div className=" text-center mt-2">
            <p>
              Verify Phone?{' '}
              <button className="bg-transparent" onClick={verifyPhoneNumber}>
                Verify Phone
              </button>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
