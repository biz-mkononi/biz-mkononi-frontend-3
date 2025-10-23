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
  data: {
    authorizationUrl: string;
    access_code: string;
    reference: string;
  };
}

const initiatePayment = async (
  data: InitiatePaymentParams,
): Promise<PaystackResponse> => {
  const response = await reqInstance3.post('auth/initiate', data);

  return response;
};

const useInitiatePayment = (): UseMutationResult<
  PaystackResponse,
  Error,
  InitiatePaymentParams
> => {
  const queryClient = useQueryClient();

  return useMutation(initiatePayment, {
    onSuccess: (data) => {
      // Redirect to Paystack payment page
      window.location.href = data.data.authorizationUrl;

      // Optionally invalidate any payment-related queries
      queryClient.invalidateQueries(['payments']);
    },
    onError: (error) => {
      console.error('Error initializing payment:', error);
    },
  });
};

export default useInitiatePayment;
