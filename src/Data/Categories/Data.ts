import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addCategory = (post:any) => {
    reqInstance.post(`${newUrl}/categories`,post)
    .then((data) => console.log(data))
}
const getCategory = (setData:any) => {
  reqInstance.get(`${newUrl}/categories`)
  .then ((data) => setData(data.data.rows))
}

export {
    addCategory,
    getCategory
}