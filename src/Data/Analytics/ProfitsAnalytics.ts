import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const url = `${newUrl}/profits-analytics`
const getGroupedProfits= (setData:any) => {
  reqInstance.get(`${url}/grouped-profits`)
  .then ((data) => setData(data.data.rows))
}

const getTotalProfits= (setData:any) => {
    reqInstance.get(`${url}/total-profits`)
    .then ((data) => setData(data.data.rows))
  }

  export {
    getGroupedProfits,
    getTotalProfits
  }