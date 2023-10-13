import {reqInstance, reqInstance2} from '../Auth/authHelper';
import {url} from '../Auth/Data';

const newUrl = `${url}/businesses`;

const addSale = (
  // eslint-disable-next-line
  post: any,
  // eslint-disable-next-line
  navigate: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
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
// eslint-disable-next-line
const getSales = async (id: any) => {
  const response = await reqInstance.get(`${newUrl}/${id}/sales`);
  return response.data.rows;
};
const getSingleSale = async (
  // eslint-disable-next-line
  setData: any,
  // eslint-disable-next-line
  setCustomer: any,
  // eslint-disable-next-line
  setProduct: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
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
  // eslint-disable-next-line
  navigate: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  businessid: any
) => {
  setIsLoading(true);
  await reqInstance
    .delete(`${newUrl}/${businessid}/sales/${id}`)
    .then(() => navigate('/sales/list'))
    .then(() => setIsLoading(false));
};

export {addSale, getSales, getSingleSale, deleteSale, newUrl};
