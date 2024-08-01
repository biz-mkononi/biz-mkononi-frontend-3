import React, { useState } from 'react';
import AuthLayout from '../../Layout/AuthLayout';
import './Login.css';
import useResendVerification from '../../hooks/Auth/useResendVerification';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResendCode = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useResendVerification();

  const [formData, setFormData] = useState({ phone: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const resendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync(formData)
      .then(() => {
        toast.success('Code resent successfully', {
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
          'There was an error resending the code, the number has already been verified, please login or try registering it.',
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
    <AuthLayout>
      <div className="login flex flex-col justify-center items-center">
        <h5 className="mt-3 mb-5 text-center font-bold">Resend Code</h5>

        <form onSubmit={resendCode}>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 "
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
          <div className="mt-3 text-center sign-button">
            <button
              className="btn btn-primary btn-md"
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'Resending' : 'Resend'}
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
          <div className=" text-center mt-2">
            <p>
              Verify Phone?{' '}
              <button
                className="bg-transparent"
                onClick={() => navigate('/auth/verify-phone')}
              >
                Verify Phone
              </button>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResendCode;
