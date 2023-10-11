import {reqInstance} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
const addIncome = (post: any, setIsLoading: any, navigate: any, id: any) => {
  setIsLoading(true);
  reqInstance
    .post(`${newUrl}/${id}/incomes`, post)
    .then((data) => console.log(data))
    .then(() => navigate('/income/list'));
};
const getIncomes = async (id: any) => {
  const response = reqInstance.get(`${newUrl}/${id}/incomes`);
  return (await response).data.rows;
};
const getSingleIncome = (
  setData: any,
  id: any,
  setIsLoading: any,
  setFormData: any,
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
  post: any,
  navigate: any,
  id: any,
  setIsLoading: any,
  businessid: any
) => {
  setIsLoading(true);
  await reqInstance
    .put(`${newUrl}/${businessid}/incomes/${id}`, post)
    .then(() => navigate('/income/list'));
};
const deleteIncome = async (
  navigate: any,
  id: any,
  setIsLoading: any,
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
