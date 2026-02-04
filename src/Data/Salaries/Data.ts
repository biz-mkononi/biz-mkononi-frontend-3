import { reqInstance } from '../Auth/authHelper';
import { newUrl } from '../Sales/Data';
// eslint-disable-next-line
const addSalary = (post: any, navigate: any, setIsLoading: any, id: any) => {
  setIsLoading(true);
  reqInstance
    .post(`${newUrl}/${id}/salaries`, post)
    .then(() => navigate('/employees/salaries'))
    .then(() => setIsLoading(false));
};
// eslint-disable-next-line
const getSalaries = async (id: any) => {
  const response = reqInstance.get(`${newUrl}/${id}/salaries`);
  return (await response).data.rows;
};
const getSingleSalary = async (
  // eslint-disable-next-line
  setData: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  setEmployee: any,
  // eslint-disable-next-line
  setFormData: any,
  // eslint-disable-next-line
  businessid: any,
) => {
  setIsLoading(true);
  await reqInstance
    .get(`${newUrl}/${businessid}/salaries/${id}`)
    .then((data) => {
      setData(data.data);
      setEmployee(data.data.employee);
      setFormData({
        amount: data.data.amount,
        txDate: data.data.txDate,
        description: data.data.description,
        employeeId: data.data.employee.id,
      });
    })
    .then(() => setIsLoading(false));
};

const updateSingleSalary = async (
  // eslint-disable-next-line
  post: any,
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
    .put(`${newUrl}/${businessid}/salaries/${id}`, post)
    .then(() => navigate('/employees/salaries'))
    .then(() => setIsLoading(false));
};
const deleteSalary = async (
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
    .delete(`${newUrl}/${businessid}/salaries/${id}`)
    .then(() => navigate('/employees/salaries'))
    .then(() => setIsLoading(false));
};

export {
  addSalary,
  getSalaries,
  getSingleSalary,
  deleteSalary,
  updateSingleSalary,
};
