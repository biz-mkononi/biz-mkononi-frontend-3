import { reqInstance } from '../Auth/authHelper'
import { newUrl } from '../Sales/Data'

const addEmployee = (post: any, navigate: any, setIsLoading: any, id: any) => {
  setIsLoading(true)
  reqInstance
    .post(`${newUrl}/${id}/employees`, post)
    .then(() => navigate('/employees/list'))
}
const getEmployees = (setData: any, setIsLoading: any, id: any) => {
  setIsLoading(true)
  reqInstance
    .get(`${newUrl}/${id}/employees`)
    .then((data) => {
      setData(data.data.rows)
    })
    .then(() => setIsLoading(false))
}

const getSingleEmployee = (
  setData: any,
  id: any,
  setIsLoading: any,
  setFormData: any,
  businessid: any,
) => {
  setIsLoading(true)
  reqInstance
    .get(`${newUrl}/${businessid}/employees/${id}`)
    .then((data) => {
      setFormData({
        name: data.data.name,
        phone: data.data.phone,
        email: data.data.email,
        idNumber: data.data.idNumber,
        position: data.data.position,
      })
      setData(data.data)
    })
    .then(() => setIsLoading(false))
}
const updateSingleEmployee = (
  post: any,
  id: any,
  navigate: any,
  setIsLoading: any,
  businessid: any,
) => {
  setIsLoading(true)
  reqInstance
    .put(`${newUrl}/${businessid}/employees/${id}`, post)
    .then((err) => console.log(err))
    .then(() => navigate('/employees/list'))
}
const deleteEmployee = async (
  navigate: any,
  id: any,
  setIsLoading: any,
  businessid: any,
) => {
  setIsLoading(true)
  await reqInstance
    .delete(`${newUrl}/${businessid}/employees/${id}`)
    .then(() => navigate('/employees/list'))
    .then(() => setIsLoading(false))
}

export {
  addEmployee,
  getEmployees,
  deleteEmployee,
  getSingleEmployee,
  updateSingleEmployee,
}
