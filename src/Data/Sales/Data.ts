import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addSale = (post:any) => {
    reqInstance.post(`${newUrl}/sales`,post)
    .then((data) => console.log(data))
}
const getSales = (setData:any) => {
  reqInstance.get(`${newUrl}/sales`)
  .then ((data) => setData(data.data.rows))
}

export {
    addSale,
    getSales
}