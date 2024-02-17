import {useMutation, UseMutationResult, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import { reqInstance3 } from '../common/axiosInstance';

type SaleItems = {
  productId:string;
  salePrice:number;
  quantity:number;
  product:string;

}


interface AddSaleParams {
  saleItems: SaleItems [];
  amountCharged:number;
  amountPaid:number;
  customerId:string;
  businessId:string;

}

const createBusiness = async (data: AddSaleParams) => {
  const response = await reqInstance3.post(`businesses/${data.businessId}/sales`, data);

  return response;
};

const useAddSale = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  AddSaleParams
> => {
  const navigate = useNavigate();
const queryClient = useQueryClient();
  return useMutation(createBusiness, {
    onSuccess: () => {
     queryClient
        .invalidateQueries(['sales'])
        .then(() => navigate('/sales/list'))
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default useAddSale;
