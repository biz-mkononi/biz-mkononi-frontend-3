import React, {useState} from 'react';
import {Alert} from '@mui/material';
import {changePassword} from '../../Data/Auth/Data';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useNavigate} from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import './Login.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const initialState = {code: '', password: '', phone: '', password2: ''};
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataErrors, setDataErrors] = useState('');

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const changingPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true);
    changePassword(setDataErrors, formData, setIsLoading, navigate);
  };

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
      <div className="flex flex-col justify-center items-center login  ">
        <h5 className="mt-3 mb-5 font-bold">Reset Password</h5>
        <form onSubmit={changingPassword}>
        <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="phone">
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
        <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="code">
        Code
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="code"
        type="text"
        placeholder="code"
        required
        name='code'
        onChange={handleChange}
      />
    </div>
     <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="password">
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
          onChange={handleChange}
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
       <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="password2">
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
          onChange={handleChange}
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
        <div className="mt-3 text-center sign-button">
            <button className="btn btn-primary btn-md" disabled ={isLoading ? true:false}>
              {isLoading?"Resetting password":"Reset password"}
            </button>
        </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
