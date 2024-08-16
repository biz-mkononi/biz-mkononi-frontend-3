import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { reqInstance3 } from '../common/axiosInstance';
interface AddCategoryParams {
  name: string;
  description: string;
  businessId: string;
}

const createCategory = async (data: AddCategoryParams) => {
  const response = await reqInstance3.post(
    `businesses/${data.businessId}/categories`,
    data,
  );

  return response;
};

const useAddCategory = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  AddCategoryParams
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(createCategory, {
    onSuccess: () => {
      queryClient
        .invalidateQueries(['categories'])
        .then(() => navigate('/categories/list'))
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default useAddCategory;
