import { reqInstance } from '../Auth/authHelper'
import { newUrl } from '../Sales/Data'
import { now, d, prevDate } from './SalesAnalytics'
const getGroupedSupplies = (setData: any, id: any) => {
  reqInstance
    .get(`${newUrl}/${id}/supplies-analytics/grouped-supplies`)
    .then((data) => setData(data.data.rows))
}

const getTotalSupplies = (setData: any, setIsLoading: any, id: any,data:any) => {
 
  setIsLoading(true)
  reqInstance
    .get(`${newUrl}/${id}/supplies-analytics/total-supplies`, { params: data })
    .then((data) => setData(data.data.total))
    .then(() => setIsLoading(false))
}

const getTodayTotalSupplies = (setData: any, setIsLoading: any, id: any,data:any) => {
  
  setIsLoading(true)
  reqInstance
    .get(`${newUrl}/${id}/supplies-analytics/total-supplies`, { params: data })
    .then((data) => setData(data.data.total))
    .then(() => setIsLoading(false))
}

export { getGroupedSupplies, getTotalSupplies, getTodayTotalSupplies }
