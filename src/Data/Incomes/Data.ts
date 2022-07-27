import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const addIncome = (post:any) => {
    reqInstance.post(`${newUrl}/incomes`,post)
    .then((data) => console.log(data))
}
const getIncomes = (setData:any) => {
  reqInstance.get(`${newUrl}/incomes`)
  .then ((data) => setData(data.data.rows))
}

export {
    addIncome,
    getIncomes
}