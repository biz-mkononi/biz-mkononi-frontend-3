import {reqInstance} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
const addProduct = (post: any, navigate: any, setIsLoading: any, id: any) => {
  setIsLoading(true);
  reqInstance
    .post(`${newUrl}/${id}/products`, post)
    .then(() => navigate('/products/list'))
    .then(() => setIsLoading(false));
};
const getProducts = async (id: any) => {
  const response = await reqInstance.get(`${newUrl}/${id}/products`);
  return response.data.rows;
};
const getSingleProduct = async (
  setData: any,
  id: any,
  setIsLoading: any,
  setCategory: any,
  setFormData: any,
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
  post: any,
  navigate: any,
  id: any,
  setIsLoading: any,
  businessid: any
) => {
  setIsLoading(true);
  await reqInstance
    .put(`${newUrl}/${businessid}/products/${id}`, post)
    .then(() => navigate('/products/list'))
    .then(() => setIsLoading(false));
};
const deleteProduct = async (
  navigate: any,
  id: any,
  setIsLoading: any,
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
