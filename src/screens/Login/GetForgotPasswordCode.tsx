import React, {useState} from 'react';
import {Alert} from '@mui/material';
import {forgotPassword} from '../../Data/Auth/Data';
import AuthLayout from '../../Layout/AuthLayout';
import './Login.css';
import {useNavigate} from 'react-router-dom';

const GetForgotPasswordCode = () => {
  const initialState = {code: '', password: '', phone: '', password2: ''};
  const navigate = useNavigate();
  const [dataErrors, setDataErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onForgotPassword = () => {
    setIsLoading(true);
    forgotPassword(setDataErrors, formData, setIsLoading, navigate);
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
            {isLoading ? (
              <button className="btn btn-primary btn-md" disabled>
                Submitting
              </button>
            ) : (
              <button
                className="btn btn-primary btn-md"
                onClick={onForgotPassword}>
                Submit
              </button>
            )}
          </div>
        </div>
      </AuthLayout>
    </React.Fragment>
  );
};

export default GetForgotPasswordCode;
