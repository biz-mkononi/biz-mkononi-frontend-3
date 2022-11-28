import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addSupply = (post:any,navigate:any,setIsLoading:any) => {
  console.log(post)
  setIsLoading(true)
    reqInstance.post(`${newUrl}/supplies`, post)
    .then (() => navigate('/supplies/list'))
}
const getSupplies = (setData:any,setIsLoading:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/supplies`)
  .then ((data) => setData(data.data.rows))
  setIsLoading(false)
}

const getSingleSupply  = async (setData:any,setSupplier:any,setProduct:any, id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.get(`${newUrl}/supplies/${id}`)
  .then ((data) =>{
    setData(data.data)
    setSupplier(data.data.supplier)
    data.data.supplyItems.map((product:any) => {
      setProduct(product.product)

    })
  })
  .then(() => setIsLoading(false))
}
const deleteSupplies  = async (navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.delete(`${newUrl}/supplies/${id}`)
  .then (() => navigate('/supplies/list'))
  .then(() => setIsLoading(false))
}

export {
    addSupply,
    getSupplies,
    getSingleSupply,
    deleteSupplies
}