import React from 'react';
import AuthLayout from '../../Layout/AuthLayout';
import './Login.css';
import useResendVerification from '../../hooks/Auth/useResendVerification';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resendCodeSchema } from '../../utils/schemas/LoginValidation';
import { useNavigate } from 'react-router-dom';

type ResendFormInputs = {
  phone: string;
};
const ResendCode = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useResendVerification();
  const methods = useForm<ResendFormInputs>({
    resolver: yupResolver(resendCodeSchema),
    defaultValues: {
      phone: '',
    },
  });
  const { handleSubmit } = methods;

  const resendCode = async (data: ResendFormInputs) => {
    await mutateAsync(data)
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

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(resendCode)}>
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

            <div className="mt-3 text-center sign-button">
              <button
                type="submit"
                className="btn btn-primary btn-md"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
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
        </FormProvider>
      </div>
    </AuthLayout>
  );
};

export default ResendCode;
