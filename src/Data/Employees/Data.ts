import { url } from "../Auth/Data";
import { reqInstance } from "../Auth/authHelper";
const businessId = JSON.parse(localStorage.getItem("businessId")!)

const newUrl = `${url}/businesses/${businessId.id}`

const addEmployee = (post:any,navigate:any,setIsLoading:any) => {
  setIsLoading(true)
    reqInstance.post(`${newUrl}/employees`,post)
    .then(() => navigate ('/employees/list'))
}
const getEmployees = (setData:any,setIsLoading:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/employees`)
  .then ((data) => {
    setData(data.data.rows)
  } )
  .then(() => setIsLoading(false))
}

const getSingleEmployee = (setData:any,id:any,setIsLoading:any,setFormData:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/employees/${id}`)
  .then ((data) =>{
    setFormData({ name: data.data.name, phone: data.data.phone, email: data.data.email, idNumber: data.data.idNumber, position: data.data.position }
      )
      setData(data.data)
  } )
  .then(() => setIsLoading(false))
}
const updateSingleEmployee = (post:any,id:any,navigate:any,setIsLoading:any) => {
  setIsLoading(true)
  reqInstance.put(`${newUrl}/employees/${id}`,post)
  .then((err) => console.log(err))
  .then(() => navigate('/employees/list'))
}
const deleteEmployee  = async (navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.delete(`${newUrl}/employees/${id}`)
  .then (() => navigate('/employees/list'))
  .then(() => setIsLoading(false))
}

export {
    addEmployee,
    getEmployees,
    deleteEmployee,
    getSingleEmployee,
  updateSingleEmployee,
    newUrl,
    businessId
}