import React, {useState} from 'react';
import {Alert} from '@mui/material';
import AuthLayout from '../../Layout/AuthLayout';
import './Login.css';
import useForgotPassword from '../../hooks/Auth/useForgotPassword';

const GetForgotPasswordCode = () => {
  const {mutate,isLoading} = useForgotPassword()
  const [dataErrors, setDataErrors] = useState('');
  const [formData, setFormData] = useState({phone:''});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onForgotPassword = () => {
    mutate(formData)
  };
  return (
    <React.Fragment>
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
          <h5 className="mt-3 mb-3 font-bold ">Forgot Password</h5>
          <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-3 mt-3" htmlFor="phone">
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
          <div className="mt-3 sign-button">
            <button
                className="btn btn-primary btn-md"
                disabled={isLoading}
                onClick={onForgotPassword}>
                {isLoading?'Submitting..':'Submit'}
              </button>
          </div>
        </div>
      </AuthLayout>
    </React.Fragment>
  );
};

export default GetForgotPasswordCode;
