import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { reqInstance3 } from '../common/axiosInstance';
interface AddEmployeeParams {
  name: string;
  phone: string;
  email: string;
  idNumber: string;
  position: string;
  businessId: string;
}

const createEmployee = async (data: AddEmployeeParams) => {
  const response = await reqInstance3.post(
    `businesses/${data.businessId}/employees`,
    data,
  );

  return response;
};

const useAddEmployee = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  AddEmployeeParams
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(createEmployee, {
    onSuccess: () => {
      queryClient
        .invalidateQueries(['employees', 'totalsupplies', 'totalprofits'])
        .then(() => navigate('/employees/list'))
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default useAddEmployee;
