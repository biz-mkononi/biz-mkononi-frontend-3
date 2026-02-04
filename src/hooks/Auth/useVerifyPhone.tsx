import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import { reqInstance } from '../common/axiosInstance';

interface VerifyPhoneParams {
  phone:string;
  code:string;
}

const verifyPhone = async (data: VerifyPhoneParams) => {
  const response = await reqInstance.post('/auth/verify', data);

  return response;
};

const useVerifyPhone = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  VerifyPhoneParams
> => {
  const navigate = useNavigate();

  return useMutation(verifyPhone, {
    onSuccess: () => {
     navigate('/auth/login')
    },
  });
};

export default useVerifyPhone;
