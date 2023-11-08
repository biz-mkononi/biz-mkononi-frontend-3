import React, {useState} from 'react';
import AuthLayout from '../../Layout/AuthLayout';
import {useNavigate} from 'react-router-dom';
import {resendVerification} from '../../Data/Auth/Data';
import Alert from '@mui/material/Alert';
import './Login.css';

const ResendCode = () => {
  const navigate = useNavigate();
  const [dataErrors, setDataErrors] = useState('');

  const initialState = {code: '', password: '', phone: '', password2: ''};
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const resendCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true);
    resendVerification(formData, setIsLoading, setDataErrors, navigate);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  return (
    <AuthLayout>
      <div className="login flex flex-col justify-center items-center">
        <h5 className="mt-3 mb-5 text-center font-bold">Resend Code</h5>
        {dataErrors !== '' && (
          <Alert
            variant="filled"
            onClose={() => setDataErrors('')}
            severity="error">
            {dataErrors}
          </Alert>
        )}
        <form onSubmit={resendCode}>
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
        <div className="mt-3 text-center sign-button">

            <button className="btn btn-primary btn-md" disabled = {isLoading?true:false}>
              {isLoading?"Resending":"Resend"}
            </button>
        </div>
            </form>

      </div>
    </AuthLayout>
  );
};

export default ResendCode;
