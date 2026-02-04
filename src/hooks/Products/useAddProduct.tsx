import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { reqInstance3 } from '../common/axiosInstance';
interface AddProductParams {
  categoryId: string;
  productType: string;
  size: string;
  unit: string;
  buyingPrice: string;
  sellingPrice: string;
  tags: string;
  description: string;
  businessId: string;
}

const createProduct = async (data: AddProductParams) => {
  const response = await reqInstance3.post(
    `businesses/${data.businessId}/products`,
    data,
  );

  return response;
};

const useAddProduct = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  AddProductParams
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(createProduct, {
    onSuccess: () => {
      queryClient
        .invalidateQueries(['products'])
        .then(() => navigate('/products/list'))
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default useAddProduct;
