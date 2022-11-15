import { reqInstance } from "../Auth/authHelper";
import {newUrl,businessId} from "../Employees/Data"
import { data } from "./SalesAnalytics";
const url = `${newUrl}/profits-analytics`
const getGroupedProfits= (setData:any) => {
  reqInstance.get(`${url}/grouped-profits`)
  .then ((data) => setData(data.data.rows))
}

const getTotalProfits= (setData:any) => {

    reqInstance.get(`${url}/total-profits`, {params:data})
    .then ((data) => setData(data.data.total))
  }

  export {
    getGroupedProfits,
    getTotalProfits
  }