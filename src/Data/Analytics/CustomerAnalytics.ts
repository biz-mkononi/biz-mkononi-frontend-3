import { reqInstance } from "../Auth/authHelper";
import { now,d, prevDate, firstDay, prevMonth } from "./SalesAnalytics";
import { newUrl } from "../Sales/Data";

const getTotalCustomers= (setData:any,setIsLoading:any,id:any) => {
    setIsLoading(true)
  reqInstance.get(`${newUrl}/${id}/customer-analytics/total-customers`)
  .then ((data) => setData(data.data))
  .then(() => setIsLoading(false))
}


const getTotalDateSales= (setData:any,id:any) => {
    reqInstance.get(`${newUrl}/${id}/customer-analytics/total-date-part-sales`)
    .then ((data) => setData(data.data.rows))
  }

const getNewCustomers= (setData:any,setIsLoading:any,id:any) => {
    setIsLoading(true)
    const data = {
        from:d.toISOString(),
    to:now.toISOString(),
    }
    reqInstance.get(`${newUrl}/${id}/customer-analytics/new-customers`,{params:data})
    .then ((data) => setData(data.data))
    .then(() => setIsLoading(false))
}
const getCurrentMonthNewCustomers= (setData:any,setIsLoading:any,id:any) => {
    setIsLoading(true)
    const data = {
        from:firstDay.toISOString(),
    to:now.toISOString(),
    }
    reqInstance.get(`${newUrl}/${id}/customer-analytics/new-customers`,{params:data})
    .then ((data) => setData(data.data))
    .then(() => setIsLoading(false))
}
const getDailyNewCustomers= (setData:any,setIsLoading:any,id:any) => {
    setIsLoading(true)
    const data = {
        from:prevDate.toISOString(),
    to:now.toISOString(),
    }
    reqInstance.get(`${newUrl}/${id}/customer-analytics/new-customers`,{params:data})
    .then ((data) => setData(data.data))
    .then(() => setIsLoading(false))
}

const getGenderStats= (setData:any,setIsLoading:any,id:any) => {
    setIsLoading(true)
    const data = {
        from:d.toISOString(),
    to:now.toISOString(),
    }
    reqInstance.get(`${newUrl}/${id}/customer-analytics/gender-stats`,{params:data})
    .then ((data) => setData(data.data))
    .then(() => setIsLoading(false))
    }

const getAgeStats= (setData:any,setIsLoading:any,id:any) => {
    setIsLoading(true)
    const data = {
        from:d.toISOString(),
    to:now.toISOString(),
    }
    reqInstance.get(`${newUrl}/${id}/customer-analytics/age-stats`,{params:data})
    .then ((data) => setData(data.data))
    .then(() => setIsLoading(false))
    }
const getRepeatCustomerRate= (setData:any,setIsLoading:any,id:any) => {
    setIsLoading(true)
    const data = {
        from:d.toISOString(),
    to:now.toISOString(),
    }
    reqInstance.get(`${newUrl}/${id}/customer-analytics/repeat-customer-rate`,{params:data})
    .then ((data) => setData(data.data.rate))
    .then(() => setIsLoading(false))
    }
const getChurnCustomerRate= (setData:any,setIsLoading:any,id:any) => {
    setIsLoading(true)
    const data = {
        from:d.toISOString(),
    to:now.toISOString(),
    }
    reqInstance.get(`${newUrl}/${id}/customer-analytics/churn-customer-rate`,{params:data})
    .then ((data) => setData(data.data.rate))
    .then(() => setIsLoading(false))
    }
const getMostActiveCustomers= (setData:any,setIsLoading:any,id:any) => {
    setIsLoading(true)
    const data = {
        from:prevMonth.toISOString(),
    to:now.toISOString(),
    limit:10
    }
    reqInstance.get(`${newUrl}/${id}/customer-analytics/most-active-customers`,{params:data})
    .then ((data) => setData(data.data))
    .then(() => setIsLoading(false))
    }
    const getMostActiveInCurrentCustomers= (setData:any,setIsLoading:any,id:any) => {
        setIsLoading(true)
        const data = {
            from:firstDay.toISOString(),
        to:now.toISOString(),
        limit:10
        }
        reqInstance.get(`${newUrl}/${id}/customer-analytics/most-active-customers`,{params:data})
        .then ((data) => setData(data.data))
        .then(() => setIsLoading(false))
        }
 

export {
    getTotalCustomers,
    getTotalDateSales,
    getNewCustomers,
    getGenderStats,
    getAgeStats,
    getRepeatCustomerRate,
    getChurnCustomerRate,
    getMostActiveCustomers,
    getDailyNewCustomers,
    getCurrentMonthNewCustomers,
    getMostActiveInCurrentCustomers
}