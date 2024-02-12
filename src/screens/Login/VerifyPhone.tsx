import React, {useState} from 'react';
import {Alert} from '@mui/material';
import './Login.css';
import AuthLayout from '../../Layout/AuthLayout';
import useVerifyPhone from '../../hooks/Auth/useVerifyPhone';

const VerifyPhone = () => {
  const {mutate,isLoading} = useVerifyPhone();
  const initialState = {code: '', phone: ''};
  const [formData, setFormData] = useState(initialState);
  const [dataErrors,setDataErrors] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const phoneVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(formData)

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
            className="btn btn-primary btn-md" disabled={isLoading} >
           {isLoading?"Verifying..":" Verify Phone"}
          </button>
        </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default VerifyPhone;
