import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { reqInstance3 } from '../common/axiosInstance';
interface AddIncomeParams {
  title: string;
  amount: string;
  txDate: string;
  description: string;
  businessId: string;
}

const createIncome = async (data: AddIncomeParams) => {
  const response = await reqInstance3.post(
    `businesses/${data.businessId}/incomes`,
    data,
  );

  return response;
};

const useAddIncome = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  AddIncomeParams
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(createIncome, {
    onSuccess: () => {
      queryClient
        .invalidateQueries(['incomes', 'totalsupplies', 'totalprofits'])
        .then(() => navigate('/income/list'))
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default useAddIncome;
