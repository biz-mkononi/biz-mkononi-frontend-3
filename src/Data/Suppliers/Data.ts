import {reqInstance} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
// eslint-disable-next-line
const addSupplier = (post: any, navigate: any, setIsLoading: any, id: any) => {
  setIsLoading(true);
  reqInstance
    .post(`${newUrl}/${id}/suppliers`, post)
    .then(() => navigate('/suppliers/list'));
};
// eslint-disable-next-line
const getSuppliers = async (id: any) => {
  const response = await reqInstance.get(`${newUrl}/${id}/suppliers`);
  return response.data.rows;
};

const getSingleSupplier = async (
  // eslint-disable-next-line
  setData: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  setFormData: any,
  // eslint-disable-next-line
  businessid: any
) => {
  setIsLoading(true);
  await reqInstance
    .get(`${newUrl}/${businessid}/suppliers/${id}`)
    .then((data) => {
      setFormData({
        name: data.data.name,
        email: data.data.email,
        description: data.data.description,
        phone: data.data.phone,
      });
      setData(data.data);
    })
    .then(() => setIsLoading(false));
};
const updateSingleSupplier = async (
  // eslint-disable-next-line
  post: any,
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
    .put(`${newUrl}/${businessid}/suppliers/${id}`, post)
    .then(() => navigate('/suppliers/list'));
};
const deleteSupplier = async (
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
    .delete(`${newUrl}/${businessid}/suppliers/${id}`)
    .then(() => navigate('/suppliers/list'))
    .then(() => setIsLoading(false));
};

export {
  addSupplier,
  getSuppliers,
  getSingleSupplier,
  deleteSupplier,
  updateSingleSupplier,
};
