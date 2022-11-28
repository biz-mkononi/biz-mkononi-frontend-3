import { reqInstance } from "../Auth/authHelper";
import { url } from "../Auth/Data";

const newUrl = `${url}/businesses`
import { d,now, prevDate } from "./SalesAnalytics";
const getGroupedProfits= (setData:any,id:any) => {
  reqInstance.get(`${newUrl}/${id}/profits-analytics/grouped-profits`)
  .then ((data) => setData(data.data.rows))
}

const getTotalProfits= (setData:any,setIsLoading:any,id:any) => {
  const data = {
    from:d.toISOString(),
to:now.toISOString(),
}
setIsLoading(true)
    reqInstance.get(`${newUrl}/${id}/profits-analytics/total-profits`, {params:data})
    .then ((data) => setData(data.data.total))
    .then(() => setIsLoading(false))
  }

  const getTodayTotalProfits= (setData:any,setIsLoading:any,id:any) => {
    const data = {
      from:prevDate.toISOString(),
  to:now.toISOString(),
  }
  setIsLoading(true)
      reqInstance.get(`${newUrl}/${id}/profits-analytics/total-profits`, {params:data})
      .then ((data) => setData(data.data.total))
      .then(() => setIsLoading(false))
    }
  
  export {
    getGroupedProfits,
    getTotalProfits,
    getTodayTotalProfits
  }