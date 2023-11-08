import React, {useState} from 'react';
import {Alert} from '@mui/material';
import {verifyPhone} from '../../Data/Auth/Data';
import {useNavigate} from 'react-router-dom';
import './Login.css';
import AuthLayout from '../../Layout/AuthLayout';

const VerifyPhone = () => {
  const navigate = useNavigate();

  const initialState = {code: '', password: '', phone: '', password2: ''};
  const [formData, setFormData] = useState(initialState);
  const [dataErrors,setDataErrors] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const phoneVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    verifyPhone(formData,setIsLoading,setDataErrors,navigate);
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
      <div className="flex flex-col justify-center items-center login">
        <h3 className="mt-2 mb-5 text-center font-bold">Verify Phone</h3>
        <form onSubmit={phoneVerification}>
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
      <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="code">
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
        <div className="mt-3 text-center sign-button">
          <button
            className="btn btn-primary btn-md" disabled={isLoading?true:false} >
           {isLoading?"Verifying":" Verify Phone"}
          </button>
        </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default VerifyPhone;
