import {reqInstance} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
// eslint-disable-next-line
const addExpense = (post: any, setIsLoading: any, navigate: any, id: any) => {
  setIsLoading(true);
  reqInstance
    .post(`${newUrl}/${id}/expenses`, post)
    .then(() => navigate('/expense/list'));
};
// eslint-disable-next-line
const getExpenses = async (id: any) => {
  const response = await reqInstance.get(`${newUrl}/${id}/expenses`);
  return response.data.rows;
};

const getSingleExpense = (
  // eslint-disable-next-line
  setData: any,id: any,setIsLoading: any,setFormData: any,businessid: any
) => {
  setIsLoading(true);
  reqInstance
    .get(`${newUrl}/${businessid}/expenses/${id}`)
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
const updateSingleExpense = (
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
  reqInstance
    .put(`${newUrl}/${businessid}/expenses/${id}`, post)
    .then(() => navigate('/expense/list'));
};
const deleteExpense = async (
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
    .delete(`${newUrl}/${businessid}//expenses/${id}`)
    .then(() => navigate('/expense/list'))
    .then(() => setIsLoading(false));
};

export {
  addExpense,
  getExpenses,
  getSingleExpense,
  updateSingleExpense,
  deleteExpense,
};
