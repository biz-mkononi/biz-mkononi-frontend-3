import {reqInstance} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
// eslint-disable-next-line
const getCategory = async (id: any) => {
  const response = reqInstance.get(`${newUrl}/${id}/categories`);
  return (await response).data.rows;
};
// eslint-disable-next-line
const addCategory = (post: any, navigate: any, setLoading: any, id: any) => {
  setLoading(true);
  reqInstance
    .post(`${newUrl}/${id}/categories`, post)
    .then(() => navigate('/categories/list'));
};

const getSingleCategory = async (
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
    .get(`${newUrl}/${businessid}/categories/${id}`)
    .then((data) => {
      setFormData({
        name: data.data.name,
        description: data.data.description,
      });
      setData(data.data);
    })
    .then(() => setIsLoading(false));
};
const updateSingleCategory = async (
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
    .put(`${newUrl}/${businessid}/categories/${id}`, post)
    .then(() => navigate('/categories/list'));
};
const deleteCategory = async (
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
    .delete(`${newUrl}/${businessid}/categories/${id}`)
    .then(() => navigate('/categories/list'))
    .then(() => setIsLoading(false));
};

export {
  addCategory,
  getCategory,
  getSingleCategory,
  deleteCategory,
  updateSingleCategory,
};
