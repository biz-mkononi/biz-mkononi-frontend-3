import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addExpense = (post:any,setIsLoading:any,navigate:any) => {
  setIsLoading(true)
    reqInstance.post(`${newUrl}/expenses`,post)
    .then(() => navigate("/expense/list"))
}
const getExpenses = (setData:any,setIsLoading:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/expenses`)
  .then ((data) => setData(data.data.rows))
  .then(() => setIsLoading(false))
}
const getSingleExpense = (setData:any,id:any,setIsLoading:any,setFormData:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/expenses/${id}`)
  .then ((data) => {
    setFormData({
      title:data.data.title,amount:data.data.amount,description:data.data.description,txDate:data.data.txDate
    })
    setData(data.data)
  } )
  .then(() => setIsLoading(false))
}
const updateSingleExpense = (post:any,id:any,navigate:any,setIsLoading:any) => {
  setIsLoading(true)
  reqInstance.put(`${newUrl}/expenses/${id}`,post)
  .then (() => navigate("/expense/list"))
}
const deleteExpense  = async (navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.delete(`${newUrl}/expenses/${id}`)
  .then (() => navigate('/expense/list'))
  .then(() => setIsLoading(false))
}

export {
    addExpense,
    getExpenses,
    getSingleExpense,
    updateSingleExpense,
    deleteExpense
}