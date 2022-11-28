import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addSale = (post:any,navigate:any) => {
    reqInstance.post(`${newUrl}/sales`, JSON.stringify (post))
    .then((data) => console.log(data))
    .then (() => navigate('/sales/list'))
}
const getSales = (setData:any,setIsLoading:any) => {
  setIsLoading(true)
  reqInstance.get(`${newUrl}/sales`)
  .then ((data) => setData(data.data.rows))
  .then(() => setIsLoading(false))
}
const getSingleSale  = async (setData:any,setCustomer:any,setProduct:any, id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.get(`${newUrl}/sales/${id}`)
  .then ((data) =>{
    setData(data.data)
    setCustomer(data.data.customer)
    data.data.saleItems.map((product:any) => {
      setProduct(product.product)

    })
  })
  .then(() => setIsLoading(false))
}

const deleteSale  = async (navigate:any,id:any,setIsLoading:any) => {
  setIsLoading(true)
  await reqInstance.delete(`${newUrl}/sales/${id}`)
  .then (() => navigate('/sales/list'))
  .then(() => setIsLoading(false))
}

export {
    addSale,
    getSales,
    getSingleSale,
    deleteSale
}