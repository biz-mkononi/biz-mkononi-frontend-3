import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addExpense = (post:any) => {
    reqInstance.post(`${newUrl}/expenses`,post)
    .then((data) => console.log(data))
}
const getExpenses = (setData:any) => {
  reqInstance.get(`${newUrl}/expenses`)
  .then ((data) => setData(data.data.rows))
}

export {
    addExpense,
    getExpenses
}