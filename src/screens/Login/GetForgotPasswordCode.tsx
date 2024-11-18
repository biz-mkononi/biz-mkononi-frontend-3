import React from 'react';
import AuthLayout from '../../Layout/AuthLayout';
import './Login.css';
import useForgotPassword from '../../hooks/Auth/useForgotPassword';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resendCodeSchema } from '../../utils/schemas/LoginValidation';

type ForgotPasswordFormInputs = {
  phone: string;
};
const GetForgotPasswordCode = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useForgotPassword();
  const methods = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(resendCodeSchema),
    defaultValues: {
      phone: '',
    },
  });
  const { handleSubmit } = methods;

  const onForgotPassword = async (data: ForgotPasswordFormInputs) => {
    await mutateAsync(data)
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
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onForgotPassword)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-3 mt-3"
                  htmlFor="phone"
                >
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
              <div className="mt-3 sign-button flex items-center justify-center">
                <button className="btn btn-primary btn-md" disabled={isLoading}>
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
            </form>
          </FormProvider>
        </div>
      </AuthLayout>
    </React.Fragment>
  );
};

export default GetForgotPasswordCode;
