import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addCustomer = (post:any) => {
    reqInstance.post(`${newUrl}/customers`,post)
    .then((data) => console.log(data))
}
const getCustomers = (setData:any) => {
  reqInstance.get(`${newUrl}/customers`)
  .then ((data) => setData(data.data.rows))
}

export {
    addCustomer,
    getCustomers
}