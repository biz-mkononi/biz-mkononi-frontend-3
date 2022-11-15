import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addSupplier = (post:any,navigate:any,setIsLoading:any) => {
  setIsLoading(true)
    reqInstance.post(`${newUrl}/suppliers`,post)
    .then(() => navigate('/suppliers/list'))
}
const getSuppliers = (setData:any,setIsLoading:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/suppliers`)
  .then ((data) => setData(data.data.rows))
  .then (() => setIsLoading(false))
}

const getSingleSupplier = async (setData:any,id:any,setIsLoading:any,setFormData:any) => {
  setIsLoading(true)
  await reqInstance.get(`${newUrl}/suppliers/${id}`)
  .then ((data) => {
    setFormData({
      name:data.data.name,email:data.data.email,description:data.data.description,phone:data.data.phone
    })
    setData(data.data)
  } )
  .then(() => setIsLoading(false))
}
const updateSingleSupplier  = async (post:any,navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.put(`${newUrl}/suppliers/${id}`,post)
  .then (() => navigate('/suppliers/list'))
}
const deleteSupplier  = async (navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.delete(`${newUrl}/suppliers/${id}`)
  .then (() => navigate('/suppliers/list'))
  .then(() => setIsLoading(false))
}

export {
    addSupplier,
    getSuppliers,
    getSingleSupplier,
    deleteSupplier,
    updateSingleSupplier
}