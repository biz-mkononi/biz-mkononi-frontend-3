import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { reqInstance3 } from '../common/axiosInstance';

interface InitiatePaymentParams {
  amount: number;
  method: 'card' | 'mpesa';
  userId: string;
}

interface PaystackResponse {
  status: boolean;
  authorizationUrl: string;
  access_code: string;
  reference: string;
}

const initiatePayment = async (
  data: InitiatePaymentParams,
): Promise<PaystackResponse> => {
  const response = await reqInstance3.post<PaystackResponse>(
    'auth/initiate',
    data,
  );
  return response.data;
};

const useInitiatePayment = (): UseMutationResult<
  PaystackResponse,
  Error,
  InitiatePaymentParams
> => {
  const queryClient = useQueryClient();

  return useMutation(initiatePayment, {
    onSuccess: (data) => {
      window.location.href = data.authorizationUrl;
      queryClient.invalidateQueries(['payments']);
    },
    onError: (error) => {
      console.error('Error initializing payment:', error);
    },
  });
};

export default useInitiatePayment;
