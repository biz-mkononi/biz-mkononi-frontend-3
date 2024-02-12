import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import { reqInstance } from '../common/axiosInstance';

interface ResendVerificationParams {
  phone:string;
}

const resendVerification = async (data: ResendVerificationParams) => {
  const response = await reqInstance.post('/auth/verify/resend', data);

  return response;
};

const useResendVerification = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  ResendVerificationParams
> => {
  const navigate = useNavigate();

  return useMutation(resendVerification, {
    onSuccess: () => {
     navigate('/auth/verify-phone')
    },
  });
};

export default useResendVerification;
