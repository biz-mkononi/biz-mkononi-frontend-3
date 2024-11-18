import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AuthLayout from '../../Layout/AuthLayout';
import './Login.css';
import useResetPassword from '../../hooks/Auth/useResetPassword';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordSchema } from '../../utils/schemas/LoginValidation';
type ResetPasswordFormInputs = {
  phone: string;
  code: string;
  password: string;
  password2: string;
};
const ResetPassword = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useResetPassword();
  const methods = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      phone: '',
    },
  });
  const { handleSubmit } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const changingPassword = async (data: ResetPasswordFormInputs) => {
    await mutateAsync(data)
      .then(() => {
        toast.success('Password changed successfully', {
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
          'There was an error changing the password, the code or the phone number is invalid',
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
      <div className="flex flex-col justify-center items-center login  ">
        <h5 className="mt-3 mb-5 font-bold">Reset Password</h5>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(changingPassword)}>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-3"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                {...methods.register('phone')}
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                placeholder="phone"
              />
              {methods.formState.errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {methods.formState.errors.phone.message}
                </p>
              )}
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-3"
                htmlFor="code"
              >
                Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...methods.register('code')}
                type="text"
                placeholder="code"
              />
              {methods.formState.errors.code && (
                <p className="text-red-500 text-xs mt-1">
                  {methods.formState.errors.code.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-3"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...methods.register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
                {methods.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {methods.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-3"
                htmlFor="password2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...methods.register('password2')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
                {methods.formState.errors.password2 && (
                  <p className="text-red-500 text-xs mt-1">
                    {methods.formState.errors.password2.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 text-center sign-button">
              <button className="btn btn-primary btn-md" disabled={isLoading}>
                {isLoading ? 'Resetting...' : 'Reset password'}
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
          </form>
        </FormProvider>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
