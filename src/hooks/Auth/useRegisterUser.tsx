import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import { reqInstance } from '../common/axiosInstance';

interface CreateUserParams {
  name: string;
  subscriptionType: string;
  email: string;
  password: string;
  password2:string;
  phone:string;
}

const createUser = async (data: CreateUserParams) => {
  const response = await reqInstance.post('/auth/register', data);

  return response;
};

const useCreateUser = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  CreateUserParams
> => {
  const navigate = useNavigate();

  return useMutation(createUser, {
    onSuccess: () => {
     navigate('/auth/verify-phone')
    },
  });
};

export default useCreateUser;
