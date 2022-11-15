import { reqInstance } from "../Auth/authHelper";
import {newUrl,businessId} from "../Employees/Data"

const url = `${newUrl}/sales-analytics`
var d = new Date();

    // Set it to one month ago
    d.setMonth(d.getMonth() - 1);

    // Zero the time component
    d.setHours(0, 0, 0, 0);

    // Get the time value in milliseconds and convert to seconds
    console.log(d.toISOString());
    var now = new Date ()
const data = {
    from:d.toISOString(),
    to:now.toISOString(),
    group:"day",
    businessId:businessId
  }
const getSalesTrend= (setData:any) => {
   
  reqInstance.get(`${url}/sales-trend`, {params:data})
  .then ((data) => setData(data.data))
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
    getRepeatCustomerRate,
    data
}