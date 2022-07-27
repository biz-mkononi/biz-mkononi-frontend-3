import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const url = `${newUrl}/customer-analytics`
const getTotalCustomers= (setData:any) => {
  reqInstance.get(`${url}/total-customers`)
  .then ((data) => setData(data.data.rows))
}

const getTotalDateSales= (setData:any) => {
    reqInstance.get(`${url}/total-date-part-sales`)
    .then ((data) => setData(data.data.rows))
  }

const getNewCustomers= (setData:any) => {
    reqInstance.get(`${url}/new-customers`)
    .then ((data) => setData(data.data.rows))
}

const getGenderStats= (setData:any) => {
    reqInstance.get(`${url}/gender-stats`)
    .then ((data) => setData(data.data.rows))
    }

const getAgeStats= (setData:any) => {
    reqInstance.get(`${url}/age-stats`)
    .then ((data) => setData(data.data.rows))
    }
const getRepeatCustomerRate= (setData:any) => {
    reqInstance.get(`${url}/repeat-customer-rate`)
    .then ((data) => setData(data.data.rows))
    }
const getChurnCustomerRate= (setData:any) => {
    reqInstance.get(`${url}/churn-customer-rate`)
    .then ((data) => setData(data.data.rows))
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