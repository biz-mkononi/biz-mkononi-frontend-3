import { reqInstance } from "../Auth/authHelper";
import { url } from "../Auth/Data";

const newUrl = `${url}/businesses`
import { now,d, prevDate } from "./SalesAnalytics";
const getGroupedSupplies= (setData:any,id:any) => {
  reqInstance.get(`${newUrl}/${id}/supplies-analytics/grouped-supplies`)
  .then ((data) => setData(data.data.rows))
}

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const getTotalSupplies= (setData:any,setIsLoading:any,id:any) => {
  const data = {
    from:d.toISOString(),
to:now.toISOString(),
}
setIsLoading(true)
    reqInstance.get(`${newUrl}/${id}/supplies-analytics/total-supplies`,{params:data})
    .then ((data) => setData(data.data.total))
    .then(() => setIsLoading(false))
  }

  const getTodayTotalSupplies= (setData:any,setIsLoading:any,id:any) => {
    const data = {
      from:prevDate.toISOString(),
  to:now.toISOString(),
  }
  setIsLoading(true)
      reqInstance.get(`${newUrl}/${id}/supplies-analytics/total-supplies`,{params:data})
      .then ((data) => setData(data.data.total))
      .then(() => setIsLoading(false))
    }
  

  export {
    getGroupedSupplies,
    getTotalSupplies,
    getTodayTotalSupplies,
    months
  }