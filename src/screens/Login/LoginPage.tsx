import React, { useState } from 'react';
import './Login.css';
import { FormControlLabel, Checkbox } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import useLoginUser from '../../hooks/Auth/useLogin';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '../../utils/schemas/LoginValidation';
type LoginFormInputs = {
  phone: string;
  password: string;
};
const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync, isLoading } = useLoginUser();
  const methods = useForm<LoginFormInputs>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await mutateAsync(data);
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error('You are unauthorized, check your details and try again');
    }
  };

  const forgotPassword = () => navigate('/auth/get-forgot-password');
  return (
    <AuthLayout>
      <div className="login flex flex-col justify-center items-center">
        <h5 className="mt-5 mb-3  font-bold">Sign In</h5>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-3">
                Phone Number
              </label>
              <input
                {...methods.register('phone')}
                type="text"
                placeholder="Enter your phone number"
                className={`shadow bg-transparent appearance-none border   rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {methods.formState.errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {methods.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  {...methods.register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`shadow bg-transparent appearance-none border   rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/3 transform -translate-y-1/2 mr-4"
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
            <div className="text-center mb-2">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
              <p className="mt-3">
                <button
                  type="button"
                  className="bg-transparent"
                  onClick={forgotPassword}
                >
                  Forgot password?
                </button>
              </p>
            </div>
            <div className="mt-3 text-center sign-button">
              <button
                type="submit"
                className="btn btn-primary btn-md"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
        </FormProvider>
        <div className="text-center mt-3">
          <p>
            Dont have an account yet?{' '}
            <button
              className="bg-transparent"
              onClick={() => navigate('/auth/sign-up')}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
