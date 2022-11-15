import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const getSalesTrend = (setData:any,setIsLoading:any) => {
    setIsLoading(true)
    reqInstance.get(`${newUrl}/customer-analytics/total-customers`)
    .then ((data) => setData(data))
    .then(() => setIsLoading(false))
  }

export {
getSalesTrend
}