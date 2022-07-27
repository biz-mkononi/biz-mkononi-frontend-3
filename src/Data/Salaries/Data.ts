import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addSalary = (post:any) => {
    reqInstance.post(`${newUrl}/salaries`,post)
    .then((data) => console.log(data))
}
const getSalaries = (setData:any) => {
  reqInstance.get(`${newUrl}/salaries`)
  .then ((data) => setData(data.data.rows))
}

export {
    addSalary ,
    getSalaries
}