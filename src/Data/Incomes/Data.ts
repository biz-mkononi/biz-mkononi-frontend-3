import {reqInstance} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
// eslint-disable-next-line
const addIncome = (post: any, setIsLoading: any, navigate: any, id: any) => {
  setIsLoading(true);
  reqInstance
    .post(`${newUrl}/${id}/incomes`, post)
    .then((data) => console.log(data))
    .then(() => navigate('/income/list'));
};
// eslint-disable-next-line
const getIncomes = async (id: any) => {
  const response = reqInstance.get(`${newUrl}/${id}/incomes`);
  return (await response).data.rows;
};
const getSingleIncome = (
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
  reqInstance
    .get(`${newUrl}/${businessid}/incomes/${id}`)
    .then((data) => {
      setFormData({
        title: data.data.title,
        amount: data.data.amount,
        description: data.data.description,
        txDate: data.data.txDate,
      });
      setData(data.data);
    })
    .then(() => setIsLoading(false));
};
const updateSingleIncome = async (
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
    .put(`${newUrl}/${businessid}/incomes/${id}`, post)
    .then(() => navigate('/income/list'));
};
const deleteIncome = async (
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
    .delete(`${newUrl}/${businessid}/incomes/${id}`)
    .then(() => navigate('/income/list'))
    .then(() => setIsLoading(false));
};

export {
  addIncome,
  getIncomes,
  getSingleIncome,
  deleteIncome,
  updateSingleIncome,
};
