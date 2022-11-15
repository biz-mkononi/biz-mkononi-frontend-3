import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addCustomer = (post:any,navigate:any,setIsLoading:any) => {
  setIsLoading(true)
    reqInstance.post(`${newUrl}/customers`,post)
    .then(() => navigate('/customers/list'))
}
const getCustomers = (setData:any,setIsLoading:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/customers`)
  .then ((data) => setData(data.data.rows))
  .then (() => setIsLoading(false))
}

const getSingleCustomer  = async (setData:any,id:any,setIsLoading:any,setFormData:any) => {
  setIsLoading(true)
  await reqInstance.get(`${newUrl}/customers/${id}`)
  .then ((data) => {
    setFormData({name: data.data.name, email: data.data.email, phone: data.data.phone, description: data.data.description, yearOfBirth: data.data.yearOfBirth, gender: data.data.gender})
    setData(data.data)
  } )
  .then(() => setIsLoading(false))
}
const updateSingleCustomer  = async (post:any,id:any,navigate:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.put(`${newUrl}/customers/${id}`,post)
  .then(() => navigate('/customers/list'))
}

const deleteCustomer  = async (navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.delete(`${newUrl}/customers/${id}`)
  .then (() => navigate('/customers/list'))
  .then(() => setIsLoading(false))
}


export {
    addCustomer,
    getCustomers,
    getSingleCustomer,
    deleteCustomer,
    updateSingleCustomer
}