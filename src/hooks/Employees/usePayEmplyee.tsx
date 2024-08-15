import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { reqInstance3 } from '../common/axiosInstance';
interface AddPayEmployeeParams {
  employeeId: string;
  amount: string;
  txDate: string;
  description: string;
  businessId: string;
}

const payEmployee = async (data: AddPayEmployeeParams) => {
  const response = await reqInstance3.post(
    `businesses/${data.businessId}/salaries`,
    data,
  );

  return response;
};

const usePayEmployee = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  AddPayEmployeeParams
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(payEmployee, {
    onSuccess: () => {
      queryClient
        .invalidateQueries(['salaries', 'totalsupplies', 'totalprofits'])
        .then(() => navigate('/employees/salaries'))
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default usePayEmployee;
