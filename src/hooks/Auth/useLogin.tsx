import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { reqInstance } from '../common/axiosInstance';
import useAuthToken from '../common/useAuthToken';

interface LoginUserParams {
  phone: string;
  password: string;
}
type User = {
  email: string;
  phone: string;
  freeTrialStartDate: string;
  subscriptionType: string;
  name: string;
};
type Data = {
  jwt: string;
  user: User;
};
type Response = {
  data: Data;
};

const loginUser = async (data: LoginUserParams) => {
  const response = await reqInstance.post('/auth/login', data);

  return response;
};

const useLoginUser = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  LoginUserParams
> => {
  const { setAuthToken } = useAuthToken();
  const queryClient = useQueryClient();
  return useMutation(loginUser, {
    onSuccess: (response: Response) => {
      setAuthToken(response.data);
      console.log(response.data.user.email);
      queryClient
        .invalidateQueries()
        .then(() => window.location.assign('/'))
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default useLoginUser;
