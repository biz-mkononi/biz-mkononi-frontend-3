import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import { reqInstance } from '../common/axiosInstance';

interface ResetPasswordParams {
  phone:string;
  code:string;
  password:string;
}

const resetPassword = async (data: ResetPasswordParams) => {
  const response = await reqInstance.post('/auth/reset-password', data);

  return response;
};

const useResetPassword = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  ResetPasswordParams
> => {
  const navigate = useNavigate();

  return useMutation(resetPassword, {
    onSuccess: () => {
     navigate('/auth/login')
    },
  });
};

export default useResetPassword;
