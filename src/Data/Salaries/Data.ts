import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addSalary = (post:any,navigate:any,setIsLoading:any) => {
  setIsLoading(true)
    reqInstance.post(`${newUrl}/salaries`,post)
    .then (() => navigate ('/employees/salaries'))
    .then (() => setIsLoading(false))

}
const getSalaries = (setData:any,setIsLoading:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/salaries`)
  .then ((data) => setData(data.data.rows))
  .then (() => setIsLoading(false))
}
const getSingleSalary = async (setData:any,id:any,setIsLoading:any,setEmployee:any,setFormData:any) => {
  setIsLoading(true)
  await reqInstance.get(`${newUrl}/salaries/${id}`)
  .then ((data) =>{
    setData(data.data)
    setEmployee(data.data.employee)
    setFormData({amount:data.data.amount,txDate:data.data.txDate,description:data.data.description,employeeId:data.data.employee.id})
  } )
  .then(() => setIsLoading(false))
}

const updateSingleSalary  = async (post:any,navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.put(`${newUrl}/salaries/${id}`,post)
  .then (() => navigate('/employees/salaries'))
  .then(() => setIsLoading(false))
}
const deleteSalary  = async (navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.delete(`${newUrl}/salaries/${id}`)
  .then (() => navigate('/employees/salaries'))
  .then(() => setIsLoading(false))
}

export {
    addSalary ,
    getSalaries,
    getSingleSalary,
    deleteSalary,
    updateSingleSalary
}