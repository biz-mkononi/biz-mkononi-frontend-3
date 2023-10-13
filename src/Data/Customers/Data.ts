import {reqInstance, reqInstance2} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
// eslint-disable-next-line
const addCustomer = (post: any, navigate: any, setIsLoading: any, id: any) => {
  setIsLoading(true);
  reqInstance
    .post(`${newUrl}/${id}/customers`, post)
    .then(() => navigate('/customers/list'));
};
// eslint-disable-next-line
const getCustomers = async (id: any) => {
  const response = await reqInstance.get(`${newUrl}/${id}/customers`);
  return response.data.rows;
};

const sendCustomersSms = (
  // eslint-disable-next-line
  post: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  navigate: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  handleClose: any
) => {
  setIsLoading(true);
  reqInstance2
    .post(`${newUrl}/${id}/customers/sms`, post)
    .then(() => handleClose())
    .then(() => setIsLoading(false));
};

const getSingleCustomer = async (
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
  // eslint-disable-next-line
  post: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  navigate: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  businessid: any
) => {
  setIsLoading(true);
  await reqInstance
    .put(`${newUrl}/${businessid}/customers/${id}`, post)
    .then(() => navigate('/customers/list'));
};

const deleteCustomer = async (
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
