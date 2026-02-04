import {reqInstance, reqInstance2} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
// eslint-disable-next-line
const addSupply = (post: any, navigate: any, setIsLoading: any, id: any) => {
  setIsLoading(true);
  reqInstance2
    .post(`${newUrl}/${id}/supplies`, post)
    .then(() => navigate('/supplies/list'));
};
// eslint-disable-next-line
const getSupplies = async (id: any) => {
  const response = await reqInstance.get(`${newUrl}/${id}/supplies`);
  return response.data.rows;
};

const getSingleSupply = async (
  // eslint-disable-next-line
  setData: any,
  // eslint-disable-next-line
  setSupplier: any,
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
    .get(`${newUrl}/${businessid}/supplies/${id}`)
    .then((data) => {
      setData(data.data);
      setSupplier(data.data.supplier);
      setProduct(data.data.supplyItems);
    })
    .then(() => setIsLoading(false));
};
const deleteSupplies = async (
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
    .delete(`${newUrl}/${businessid}/supplies/${id}`)
    .then(() => navigate('/supplies/list'))
    .then(() => setIsLoading(false));
};

export {addSupply, getSupplies, getSingleSupply, deleteSupplies};
