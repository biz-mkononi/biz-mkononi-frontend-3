import { reqInstance } from "../Auth/authHelper";
import {newUrl} from "../Employees/Data"

const url = `${newUrl}/sales-analytics`
const getSalesTrend= (setData:any) => {
  reqInstance.get(`${url}/sales-trend`)
  .then ((data) => setData(data.data.rows))
}

const getTotalDateSales= (setData:any) => {
    reqInstance.get(`${url}/total-date-part-sales`)
    .then ((data) => setData(data.data.rows))
  }

const getTotalSales= (setData:any) => {
    reqInstance.get(`${url}/total-sales`)
    .then ((data) => setData(data.data.rows))
}

const getAverageOrder= (setData:any) => {
    reqInstance.get(`${url}/average-order`)
    .then ((data) => setData(data.data.rows))
    }

const getProductSales= (setData:any) => {
    reqInstance.get(`${url}/product-sales`)
    .then ((data) => setData(data.data.rows))
    }
const getRepeatCustomerRate= (setData:any) => {
    reqInstance.get(`${url}/repeat-customer-rate`)
    .then ((data) => setData(data.data.rows))
    }

export {
    getSalesTrend,
    getTotalDateSales,
    getTotalSales,
    getAverageOrder,
    getProductSales,
    getRepeatCustomerRate
}