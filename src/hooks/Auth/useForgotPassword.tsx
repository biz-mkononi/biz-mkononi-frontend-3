import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import { reqInstance } from '../common/axiosInstance';

interface ForgotPasswordParams {
  phone:string;
}

const forgotPassword = async (data: ForgotPasswordParams) => {
  const response = await reqInstance.post('/auth/forgot-password', data);

  return response;
};

const useForgotPassword = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  ForgotPasswordParams
> => {
  const navigate = useNavigate();

  return useMutation(forgotPassword, {
    onSuccess: () => {
     navigate('/auth/reset-password')
    },
  });
};

export default useForgotPassword;
