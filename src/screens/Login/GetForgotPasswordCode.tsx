import React, { useState } from 'react';
import AuthLayout from '../../Layout/AuthLayout';
import './Login.css';
import useForgotPassword from '../../hooks/Auth/useForgotPassword';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const GetForgotPasswordCode = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useForgotPassword();
  const [formData, setFormData] = useState({ phone: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onForgotPassword = async () => {
    await mutateAsync(formData)
      .then(() => {
        toast.success('Reset code sent successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch(() => {
        toast.error(
          'There was an error sending the code, is the phone number registered?',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          },
        );
      });
  };
  return (
    <React.Fragment>
      <AuthLayout>
        <div className="flex flex-col justify-center items-center login  ">
          <h5 className="mt-3 mb-3 font-bold ">Forgot Password</h5>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-3 mt-3"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="phone"
              required
              name="phone"
              onChange={handleChange}
            />
          </div>
          <div className="mt-3 sign-button">
            <button
              className="btn btn-primary btn-md"
              disabled={isLoading}
              onClick={onForgotPassword}
            >
              {isLoading ? 'Submitting..' : 'Submit'}
            </button>
          </div>
          <div className="text-center mt-3">
            <p>
              Already have an account?{' '}
              <button
                className="bg-transparent"
                onClick={() => navigate('/auth/login')}
              >
                Sign In
              </button>
            </p>
          </div>
          <div className="text-center mt-3">
            <p>
              Dont have an account yet?{' '}
              <button
                className="bg-transparent"
                onClick={() => navigate('/payment/plans')}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </AuthLayout>
    </React.Fragment>
  );
};

export default GetForgotPasswordCode;
