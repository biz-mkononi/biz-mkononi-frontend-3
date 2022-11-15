import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"


const getCategory = (setData:any,setIsLoading:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/categories`)
  .then ((data) => setData(data.data.rows))
  .then(() => setIsLoading(false))
}
const addCategory = (post:any,navigate:any,setLoading:any) => {
  setLoading(true)
  reqInstance.post(`${newUrl}/categories`,post)
    .then(() => navigate('/categories/list'))
}

const getSingleCategory = async (setData:any,id:any,setIsLoading:any,setFormData:any) => {
  setIsLoading(true)
  await reqInstance.get(`${newUrl}/categories/${id}`)
  .then ((data) => {
    setFormData({
      name:data.data.name,
      description:data.data.description
    })
    setData(data.data)
  } )
  .then(() => setIsLoading(false))
}
const updateSingleCategory  = async (post:any,navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.put(`${newUrl}/categories/${id}`,post)
  .then (() => navigate('/categories/list'))
}
const deleteCategory  = async (navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.delete(`${newUrl}/categories/${id}`)
  .then (() => navigate('/categories/list'))
  .then(() => setIsLoading(false))
}

export {
    addCategory,
    getCategory,
    getSingleCategory,
    deleteCategory,
    updateSingleCategory
}