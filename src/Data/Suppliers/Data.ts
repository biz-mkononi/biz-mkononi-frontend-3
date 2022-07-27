import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addSupplier = (post:any) => {
    reqInstance.post(`${newUrl}/suppliers`,post)
    .then((data) => console.log(data))
}
const getSuppliers = (setData:any) => {
  reqInstance.get(`${newUrl}/suppliers`)
  .then ((data) => setData(data.data.rows))
}

export {
    addSupplier,
    getSuppliers
}