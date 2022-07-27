import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const url = `${newUrl}/supplies-analytics`
const getGroupedSupplies= (setData:any) => {
  reqInstance.get(`${url}/grouped-supplies`)
  .then ((data) => setData(data.data.rows))
}

const getTotalSupplies= (setData:any) => {
    reqInstance.get(`${url}/total-supplies`)
    .then ((data) => setData(data.data.rows))
  }

  export {
    getGroupedSupplies,
    getTotalSupplies
  }