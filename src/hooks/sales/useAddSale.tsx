import {useMutation, UseMutationResult, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import { reqInstance3 } from '../common/axiosInstance';

type SaleItems = {
  productId:string;
  salePrice:number;
  quantity:number;
  product:string;

}
type Data = {
  message:string
}
type Response = {
  data:Data;
}
type Error = {
  response:Response;
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
        .invalidateQueries(['sales','repeatpurchaserate','churnrate','mostactive','totalsales','salestrend','totalprofits','monthsalestrend','hourlysales'])
        .then(() => navigate('/sales/list'))
        .catch((error:Response) => {
          throw new Error(error.data.message);
        });
    },
  });
};

export default useAddSale;
