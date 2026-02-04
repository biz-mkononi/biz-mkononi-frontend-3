import { reqInstance } from '../Auth/authHelper';
import { newUrl } from '../Sales/Data';
// eslint-disable-next-line
const addEmployee = (post: any, navigate: any, setIsLoading: any, id: any) => {
  setIsLoading(true);
  reqInstance
    .post(`${newUrl}/${id}/employees`, post)
    .then(() => navigate('/employees/list'));
};

// eslint-disable-next-line
const getEmployees = async (id: any) => {
  const response = await reqInstance.get(`${newUrl}/${id}/employees`);
  return response.data.rows;
};

const getSingleEmployee = (
  // eslint-disable-next-line
  setData: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  setFormData: any,
  // eslint-disable-next-line
  businessid: any,
) => {
  setIsLoading(true);
  reqInstance
    .get(`${newUrl}/${businessid}/employees/${id}`)
    .then((data) => {
      setFormData({
        name: data.data.name,
        phone: data.data.phone,
        email: data.data.email,
        idNumber: data.data.idNumber,
        position: data.data.position,
      });
      setData(data.data);
    })
    .then(() => setIsLoading(false));
};
const updateSingleEmployee = (
  // eslint-disable-next-line
  post: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  navigate: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  businessid: any,
) => {
  setIsLoading(true);
  reqInstance
    .put(`${newUrl}/${businessid}/employees/${id}`, post)
    .then((err) => console.log(err))
    .then(() => navigate('/employees/list'));
};
const deleteEmployee = async (
  // eslint-disable-next-line
  navigate: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  businessid: any,
) => {
  setIsLoading(true);
  await reqInstance
    .delete(`${newUrl}/${businessid}/employees/${id}`)
    .then(() => navigate('/employees/list'))
    .then(() => setIsLoading(false));
};

export {
  addEmployee,
  getEmployees,
  deleteEmployee,
  getSingleEmployee,
  updateSingleEmployee,
};
