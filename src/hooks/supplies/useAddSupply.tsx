import {useMutation, UseMutationResult, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import { reqInstance3 } from '../common/axiosInstance';

type SupplyItems = {
  productId:string;
  supplyPrice:number;
  quantity:number;
  product:string;

}


interface AddSupplyParams {
  supplyItems: SupplyItems [];
  amountCharged:number;
  amountPaid:number;
  supplierId:string;
  businessId:string;

}

const createSupply = async (data: AddSupplyParams) => {
  const response = await reqInstance3.post(`businesses/${data.businessId}/supplies`, data);

  return response;
};

const useAddSupply = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  AddSupplyParams
> => {
  const navigate = useNavigate();
const queryClient = useQueryClient();
  return useMutation(createSupply, {
    onSuccess: () => {
     queryClient
        .invalidateQueries(['supplies','totalsupplies','totalprofits'])
        .then(() => navigate('/supplies/list'))
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default useAddSupply;
