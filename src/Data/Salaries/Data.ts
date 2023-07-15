import { reqInstance } from '../Auth/authHelper'
import { newUrl } from '../Sales/Data'
const addSalary = (post: any, navigate: any, setIsLoading: any, id: any) => {
  setIsLoading(true)
  reqInstance
    .post(`${newUrl}/${id}/salaries`, post)
    .then(() => navigate('/employees/salaries'))
    .then(() => setIsLoading(false))
}
const getSalaries = (setData: any, setIsLoading: any, id: any) => {
  setIsLoading(true)
  reqInstance
    .get(`${newUrl}/${id}/salaries`)
    .then((data) => setData(data.data.rows))
    .then(() => setIsLoading(false))
}
const getSingleSalary = async (
  setData: any,
  id: any,
  setIsLoading: any,
  setEmployee: any,
  setFormData: any,
  businessid: any,
) => {
  setIsLoading(true)
  await reqInstance
    .get(`${newUrl}/${businessid}/salaries/${id}`)
    .then((data) => {
      setData(data.data)
      setEmployee(data.data.employee)
      setFormData({
        amount: data.data.amount,
        txDate: data.data.txDate,
        description: data.data.description,
        employeeId: data.data.employee.id,
      })
    })
    .then(() => setIsLoading(false))
}

const updateSingleSalary = async (
  post: any,
  navigate: any,
  id: any,
  setIsLoading: any,
  businessid: any,
) => {
  setIsLoading(true)
  await reqInstance
    .put(`${newUrl}/${businessid}/salaries/${id}`, post)
    .then(() => navigate('/employees/salaries'))
    .then(() => setIsLoading(false))
}
const deleteSalary = async (
  navigate: any,
  id: any,
  setIsLoading: any,
  businessid: any,
) => {
  setIsLoading(true)
  await reqInstance
    .delete(`${newUrl}/${businessid}/salaries/${id}`)
    .then(() => navigate('/employees/salaries'))
    .then(() => setIsLoading(false))
}

export {
  addSalary,
  getSalaries,
  getSingleSalary,
  deleteSalary,
  updateSingleSalary,
}
