import {reqInstance, reqInstance2} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
const addCustomer = (post: any, navigate: any, setIsLoading: any, id: any) => {
  setIsLoading(true);
  reqInstance
    .post(`${newUrl}/${id}/customers`, post)
    .then(() => navigate('/customers/list'));
};
const getCustomers = async (id: any) => {
  const response = await reqInstance.get(`${newUrl}/${id}/customers`);
  return response.data.rows;
};

const sendCustomersSms = (
  post: any,
  setIsLoading: any,
  navigate: any,
  id: any,
  handleClose: any
) => {
  setIsLoading(true);
  reqInstance2
    .post(`${newUrl}/${id}/customers/sms`, post)
    .then(() => handleClose())
    .then(() => setIsLoading(false));
};

const getSingleCustomer = async (
  setData: any,
  id: any,
  setIsLoading: any,
  setFormData: any,
  businessid: any
) => {
  setIsLoading(true);
  await reqInstance
    .get(`${newUrl}/${businessid}/customers/${id}`)
    .then((data) => {
      setFormData({
        name: data.data.name,
        email: data.data.email,
        phone: data.data.phone,
        description: data.data.description,
        yearOfBirth: data.data.yearOfBirth,
        gender: data.data.gender,
      });
      setData(data.data);
    })
    .then(() => setIsLoading(false));
};
const updateSingleCustomer = async (
  post: any,
  id: any,
  navigate: any,
  setIsLoading: any,
  businessid: any
) => {
  setIsLoading(true);
  await reqInstance
    .put(`${newUrl}/${businessid}/customers/${id}`, post)
    .then(() => navigate('/customers/list'));
};

const deleteCustomer = async (
  navigate: any,
  id: any,
  setIsLoading: any,
  businessid: any
) => {
  setIsLoading(true);
  await reqInstance
    .delete(`${newUrl}/${businessid}/customers/${id}`)
    .then(() => navigate('/customers/list'))
    .then(() => setIsLoading(false));
};

export {
  addCustomer,
  getCustomers,
  getSingleCustomer,
  deleteCustomer,
  updateSingleCustomer,
  sendCustomersSms,
};
