import React from 'react';
import './Login.css';
import AuthLayout from '../../Layout/AuthLayout';
import useVerifyPhone from '../../hooks/Auth/useVerifyPhone';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { VerifyPhoneSchema } from '../../utils/schemas/LoginValidation';

type VerifyPhoneFormInputs = {
  phone: string;
  code: string;
};
const VerifyPhone = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useVerifyPhone();
  const methods = useForm<VerifyPhoneFormInputs>({
    resolver: yupResolver(VerifyPhoneSchema),
    defaultValues: {
      phone: '',
      code: '',
    },
  });
  const { handleSubmit } = methods;

  const phoneVerification = async (data: VerifyPhoneFormInputs) => {
    await mutateAsync(data)
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(phoneVerification)}>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="phone"
              >
                Phone
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
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="code"
              >
                Code
              </label>
              <input
                {...methods.register('code')}
                type="text"
                placeholder="Enter your code"
                className={`shadow bg-transparent appearance-none border   rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {methods.formState.errors.code && (
                <p className="text-red-500 text-xs mt-1">
                  {methods.formState.errors.code.message}
                </p>
              )}
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
        </FormProvider>
      </div>
    </AuthLayout>
  );
};

export default VerifyPhone;
