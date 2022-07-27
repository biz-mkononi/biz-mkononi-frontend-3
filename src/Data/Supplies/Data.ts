import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addSupply = (post:any) => {
    reqInstance.post(`${newUrl}/supplies`,post)
    .then((data) => console.log(data))
}
const getSupplies = (setData:any) => {
  reqInstance.get(`${newUrl}/supplies`)
  .then ((data) => setData(data.data.rows))
}

export {
    addSupply,
    getSupplies
}