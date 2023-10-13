import {reqInstance} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
// eslint-disable-next-line
const addProduct = (post: any, navigate: any, setIsLoading: any, id: any) => {
  setIsLoading(true);
  reqInstance
    .post(`${newUrl}/${id}/products`, post)
    .then(() => navigate('/products/list'))
    .then(() => setIsLoading(false));
};
// eslint-disable-next-line
const getProducts = async (id: any) => {
  const response = await reqInstance.get(`${newUrl}/${id}/products`);
  return response.data.rows;
};
const getSingleProduct = async (
  // eslint-disable-next-line
  setData: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  setCategory: any,
  // eslint-disable-next-line
  setFormData: any,
  // eslint-disable-next-line
  businessid: any
) => {
  setIsLoading(true);
  await reqInstance
    .get(`${newUrl}/${businessid}/products/${id}`)
    .then((data) => {
      setData(data.data);
      setCategory(data.data.category);
      setFormData({
        name: data.data.name,
        categoryId: data.data.category.id,
        productType: data.data.productType,
        size: data.data.size,
        unit: data.data.unit,
        buyingPrice: data.data.buyingPrice,
        sellingPrice: data.data.sellingPrice,
        description: data.data.description,
        tags: data.data.tags,
      });
    })
    .then(() => setIsLoading(false));
};
const updateSingleProduct = async (
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
    .put(`${newUrl}/${businessid}/products/${id}`, post)
    .then(() => navigate('/products/list'))
    .then(() => setIsLoading(false));
};
const deleteProduct = async (
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
    .delete(`${newUrl}/${businessid}/products/${id}`)
    .then(() => navigate('/products/list'))
    .then(() => setIsLoading(false));
};

export {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateSingleProduct,
};
