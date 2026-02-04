import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { reqInstance3 } from '../common/axiosInstance';
interface AddExpenseParams {
  title: string;
  amount: string;
  txDate: string;
  description: string;
  businessId: string;
}

const createExpense = async (data: AddExpenseParams) => {
  const response = await reqInstance3.post(
    `businesses/${data.businessId}/expenses`,
    data,
  );

  return response;
};

const useAddExpense = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  AddExpenseParams
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(createExpense, {
    onSuccess: () => {
      queryClient
        .invalidateQueries(['expenses', 'totalsupplies', 'totalprofits'])
        .then(() => navigate('/expense/list'))
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default useAddExpense;
