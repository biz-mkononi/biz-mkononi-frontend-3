import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addProduct = (post:any,navigate:any,setIsLoading:any) => {
  setIsLoading(true)
    reqInstance.post(`${newUrl}/products`,post)
    .then(() => navigate('/products/list'))
    .then(() => setIsLoading(false))
}
const getProducts = (setData:any,setIsLoading:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/products`)
  .then ((data) => setData(data.data.rows))
  .then(() => setIsLoading(false))
}
const getSingleProduct = async (setData:any,id:any,setIsLoading:any,setCategory:any,setFormData:any) => {
  setIsLoading(true)
  await reqInstance.get(`${newUrl}/products/${id}`)
  .then ((data) => {
    setData(data.data)
    setCategory(data.data.category)
    setFormData({name: data.data.name, categoryId: data.data.category.id, productType: data.data.productType, size: data.data.size, unit: data.data.unit, buyingPrice: data.data.buyingPrice, sellingPrice: data.data.sellingPrice, description: data.data.description, tags: data.data.tags})
  } )
  .then(() => setIsLoading(false))
}
const updateSingleProduct  = async (post:any,navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.put(`${newUrl}/products/${id}`,post)
  .then (() => navigate('/products/list'))
  .then(() => setIsLoading(false))
}
const deleteProduct  = async (navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.delete(`${newUrl}/products/${id}`)
  .then (() => navigate('/products/list'))
  .then(() => setIsLoading(false))
}




export {
    addProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateSingleProduct
}