import {reqInstance, reqInstance2} from '../Auth/authHelper';
import {url} from '../Auth/Data';

const newUrl = `${url}/businesses`;

const addSale = (
  post: any,
  navigate: any,
  setIsLoading: any,
  id: any,
  setErrors: any
) => {
  setIsLoading(true);
  reqInstance2
    .post(`${newUrl}/${id}/sales`, post)
    .then((data) => {
      if (data.data.statusCode !== 201) {
        setErrors(data.data.message);
        setIsLoading(false);
      }
    })
    .then(() => navigate('/sales/list'));
};
const getSales = async (id: any) => {
  const response = await reqInstance.get(`${newUrl}/${id}/sales`);
  return response.data.rows;
};
const getSingleSale = async (
  setData: any,
  setCustomer: any,
  setProduct: any,
  id: any,
  setIsLoading: any,
  businessid: any
) => {
  setIsLoading(true);
  await reqInstance
    .get(`${newUrl}/${businessid}/sales/${id}`)
    .then((data) => {
      setData(data.data);
      setCustomer(data.data.customer);
      setProduct(data.data.saleItems);
    })
    .then(() => setIsLoading(false));
};

const deleteSale = async (
  navigate: any,
  id: any,
  setIsLoading: any,
  businessid: any
) => {
  setIsLoading(true);
  await reqInstance
    .delete(`${newUrl}/${businessid}/sales/${id}`)
    .then(() => navigate('/sales/list'))
    .then(() => setIsLoading(false));
};

export {addSale, getSales, getSingleSale, deleteSale, newUrl};
