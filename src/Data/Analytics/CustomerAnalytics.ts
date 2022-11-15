import { reqInstance } from "../Auth/authHelper";
import {newUrl,businessId} from "../Employees/Data"
import { data } from "./SalesAnalytics";

const url = `${newUrl}/customer-analytics`
const getTotalCustomers= (setData:any) => {
  reqInstance.get(`${url}/total-customers`,{params:businessId})
  .then ((data) => setData(data))
}

const getTotalDateSales= (setData:any) => {
    reqInstance.get(`${url}/total-date-part-sales`)
    .then ((data) => setData(data.data.rows))
  }

const getNewCustomers= (setData:any) => {
    reqInstance.get(`${url}/new-customers`,{params:data})
    .then ((data) => setData(data.data.total))
}

const getGenderStats= (setData:any) => {
    reqInstance.get(`${url}/gender-stats`,{params:data})
    .then ((data) => setData(data.data))
    }

const getAgeStats= (setData:any) => {
    reqInstance.get(`${url}/age-stats`)
    .then ((data) => setData(data.data.rows))
    }
const getRepeatCustomerRate= (setData:any) => {
    reqInstance.get(`${url}/repeat-customer-rate`,{params:data})
    .then ((data) => setData(data.data.rate))
    }
const getChurnCustomerRate= (setData:any) => {
    reqInstance.get(`${url}/churn-customer-rate`,{params:data})
    .then ((data) => setData(data.data.rate))
    }
const getMostActiveCustomers= (setData:any) => {
    reqInstance.get(`${url}/most-active-customers`)
    .then ((data) => setData(data.data.rows))
    }

export {
    getTotalCustomers,
    getTotalDateSales,
    getNewCustomers,
    getGenderStats,
    getAgeStats,
    getRepeatCustomerRate,
    getChurnCustomerRate,
    getMostActiveCustomers
}