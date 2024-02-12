import React, {useState} from 'react';
import './Login.css';
import {
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useNavigate} from 'react-router-dom';
import AuthLayout from '../../Layout/AuthLayout';
import useLoginUser from '../../hooks/Auth/useLogin';

const LoginPage = () => {
  const navigate = useNavigate();
  const initialState = {password: '', phone: ''};
  const [showPassword, setShowPassword] = useState(false);
  const {mutate,isLoading} = useLoginUser()

  const [formData, setFormData] = useState(initialState);
  const [dataErrors, setDataErrors] = useState('');

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onSubmitLoginData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // login(setDataErrors, formData, setIsSigningIn, setLoggedUser,setUser);
    mutate(formData)

  };

  const forgotPassword = () => navigate('/auth/get-forgot-password');
  return (
    <AuthLayout>
      <div className="login flex flex-col justify-center items-center">
        {dataErrors !== '' && (
          <Alert
            variant="filled"
            onClose={() => setDataErrors('')}
            severity="error">
            {dataErrors}
          </Alert>
        )}
        <h5 className="mt-5 mb-3  font-bold">Sign In</h5>

        <form onSubmit={onSubmitLoginData}>
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
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="password">
        Password
      </label>
      <div className="relative">
        <input
          className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="password"
          name='password'
          required
          onChange={handleChange}
        />
        <button
        type='button'
          className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4"
          onClick={handleShowPassword}
        >
          {showPassword ? (
            <VisibilityOff  />
          ) : (
            <Visibility  />
          )}
        </button>
      </div>
    </div>

          <div className="text-center mb-2">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember me"
            />
            <p className="mt-3">
              {' '}
              <button className="bg-transparent" onClick={forgotPassword}>
                Forgot password?
              </button>{' '}
            </p>
          </div>
          <div className="mt-3 text-center sign-button">
            <button className="btn btn-primary btn-md" disabled={isLoading}>{isLoading?'signing..':'sign in'}</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p>
            Dont have an account yet?{' '}
            <button
              className="bg-transparent"
              onClick={() => navigate('/payment/plans')}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
