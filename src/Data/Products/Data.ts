import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addProduct = (post:any) => {
    reqInstance.post(`${newUrl}/products`,post)
    .then((data) => console.log(data))
}
const getProducts = (setData:any) => {
  reqInstance.get(`${newUrl}/products`)
  .then ((data) => setData(data.data.rows))
}

export {
    addProduct,
    getProducts
}