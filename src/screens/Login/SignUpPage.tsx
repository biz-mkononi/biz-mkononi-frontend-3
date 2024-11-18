import React, { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import { DataContext } from '../../context/ContextProvider';
import useCreateUser from '../../hooks/Auth/useRegisterUser';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupSchema } from '../../utils/schemas/LoginValidation';
type SignUpFormInputs = {
  name: string;
  email: string;
  phone: string;
  password: string;
  password2: string;
};
const SignUpPage = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useCreateUser();
  const methods = useForm<SignUpFormInputs>({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      phone: '',
      password: '',
      Email: '',
      password: '',
      password2: '',
    },
  });

  const { handleSubmit } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const { formData } = useContext(DataContext);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const verifyPhoneNumber = () => navigate('/auth/verify-phone');
  const resendVerificationCode = () => navigate('/auth/resend-code');

  const onSubmit = async (data: SignUpFormInputs) => {
    const post = {
      ...data,
      subscriptionType: formData.subscriptionType,
    };
    await mutateAsync(post)
      .then(() => {
        toast.success('signed up successfully', {
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
          'There was an error signing up, the phone number used already exists',
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
        <h5 className="mt-2 mb-3 text-center " style={{ fontWeight: 'bold' }}>
          Create an Account
        </h5>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="name"
                {...methods.register('name')}
              />
              {methods.formState.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {methods.formState.errors.name.message}
                </p>
              )}
            </div>
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
                {...methods.register('phone')}
              />
              {methods.formState.errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {methods.formState.errors.phone.message}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="email"
                {...methods.register('email')}
              />
              {methods.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {methods.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  {...methods.register('password')}
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
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password2"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  {...methods.register('password2')}
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              {methods.formState.errors.password2 && (
                <p className="text-red-500 text-xs mt-1">
                  {methods.formState.errors.password2.message}
                </p>
              )}
            </div>
            <div className="text-center mt-3 sign-button">
              <button className="btn btn-primary btn-md" disabled={isLoading}>
                {isLoading ? 'Registering' : 'Register'}
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
                  onClick={resendVerificationCode}
                >
                  Resend
                </button>
              </p>
            </div>
            <div className=" text-center mt-2">
              <p>
                Verify Phone?{' '}
                <button className="bg-transparent" onClick={verifyPhoneNumber}>
                  Verify Phone
                </button>
              </p>
            </div>
          </form>
        </FormProvider>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
