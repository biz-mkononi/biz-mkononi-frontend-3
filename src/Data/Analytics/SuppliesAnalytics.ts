import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"
import { data } from "./SalesAnalytics";
const url = `${newUrl}/supplies-analytics`
const getGroupedSupplies= (setData:any) => {
  reqInstance.get(`${url}/grouped-supplies`)
  .then ((data) => setData(data.data.rows))
}

const getTotalSupplies= (setData:any) => {
    reqInstance.get(`${url}/total-supplies`,{params:data})
    .then ((data) => setData(data.data.total))
  }

  export {
    getGroupedSupplies,
    getTotalSupplies
  }