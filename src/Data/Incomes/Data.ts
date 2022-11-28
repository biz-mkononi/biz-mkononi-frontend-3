import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addIncome = (post:any,setIsLoading:any,navigate:any) => {
  setIsLoading(true)
    reqInstance.post(`${newUrl}/incomes`,post)
    .then((data) => console.log(data))
    .then(() => navigate ("/income/list"))
}
const getIncomes = (setData:any,setIsLoading:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/incomes`)
  .then ((data) => setData(data.data.rows))
  .then(() => setIsLoading(false))
}
const getSingleIncome = (setData:any,id:any,setIsLoading:any,setFormData:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/incomes/${id}`)
  .then ((data) => {
    setFormData({
      title:data.data.title,amount:data.data.amount,description:data.data.description,txDate:data.data.txDate
    })
    setData(data.data)
  } )
  .then(() => setIsLoading(false))
}
const updateSingleIncome  = async (post:any,navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.put(`${newUrl}/incomes/${id}`,post)
  .then (() => navigate('/income/list'))
}
const deleteIncome  = async (navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.delete(`${newUrl}/incomes/${id}`)
  .then (() => navigate('/income/list'))
  .then(() => setIsLoading(false))
}

export {
    addIncome,
    getIncomes,
    getSingleIncome,
    deleteIncome,
    updateSingleIncome
}