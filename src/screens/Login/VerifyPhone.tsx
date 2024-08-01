import React, { useState } from 'react';
import './Login.css';
import AuthLayout from '../../Layout/AuthLayout';
import useVerifyPhone from '../../hooks/Auth/useVerifyPhone';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VerifyPhone = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useVerifyPhone();
  const initialState = { code: '', phone: '' };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const phoneVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync(formData)
      .then(() => {
        toast.success('Phone verification successful', {
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
          'There was an error during verification, the code entered is invalid or the number has already been verified',
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
      <div className="flex flex-col justify-center items-center login">
        <h3 className="mt-2 mb-5 text-center font-bold">Verify Phone</h3>
        <form onSubmit={phoneVerification}>
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
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 "
              htmlFor="code"
            >
              Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="code"
              type="text"
              placeholder="code"
              required
              name="code"
              onChange={handleChange}
            />
          </div>
          <div className="mt-3 text-center sign-button">
            <button className="btn btn-primary btn-md" disabled={isLoading}>
              {isLoading ? 'Verifying..' : ' Verify Phone'}
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
          <div className="text-center mt-2">
            <p>
              Resend Verification SMS?{' '}
              <button
                className="bg-transparent"
                onClick={() => navigate('/auth/resend-code')}
              >
                Resend
              </button>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default VerifyPhone;
