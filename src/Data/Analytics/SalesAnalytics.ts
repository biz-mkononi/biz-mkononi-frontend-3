import { reqInstance } from "../Auth/authHelper";
import {businessId} from "../Employees/Data"
import { url } from "../Auth/Data";

const newUrl = `${url}/businesses`
var d = new Date();
    d.setMonth(d.getMonth() - 1);
    d.setHours(0, 0, 0, 0);

var now = new Date ()

let prevDate = new Date();
prevDate.setDate(d.getDate() - 1);
prevDate.setHours(0, 0, 0, 0);

let fd = new Date ()
var firstDay = new Date(fd.getFullYear(), fd.getMonth(), 1);

const getSalesTrend= (setData:any,setIsLoading:any,id:any) => {
    const data = {
        from:d.toISOString(),
        to:now.toISOString(),
        group:"day",
        businessId:businessId
      }
      setIsLoading(true)
  reqInstance.get(`${newUrl}/${id}/sales-analytics/sales-trend`, {params:data})
  .then ((data) => {
    const newSalesTrend = data.data.map((sale: any) => {
        return { ...sale, group: new Date(sale.group).toLocaleDateString() }
    })
    setData(newSalesTrend)
  })
  .then(() => setIsLoading(false))
}

const getCurrentMonthSales= (setData:any,setIsLoading:any,id:any) => {
    const data = {
        from:firstDay.toISOString(),
        to:now.toISOString(),
        group:"day",
        businessId:businessId
      }
      setIsLoading(true)
    reqInstance.get(`${newUrl}/${id}/sales-analytics/sales-trend`, {params:data})
    .then ((data) => {
        const newSalesTrend = data.data.map((sale: any) => {
            return { ...sale, group: new Date(sale.group).toLocaleDateString() }
        })
        setData(newSalesTrend) 
    })
    .then(() => setIsLoading(false))
  }


const getTotalSales= (setData:any,setIsLoading:any,id:any) => {
    const data = {
        from:d.toISOString(),
    to:now.toISOString(),
    }
    setIsLoading(true)
    reqInstance.get(`${newUrl}/${id}/sales-analytics/total-sales`,{params:data})
    .then ((data) => setData(data.data))
    .then(() => setIsLoading(false))
}

const getDailySales= (setData:any,setIsLoading:any,id:any) => {
    const data = {
        from:prevDate.toISOString(),
    to:now.toISOString(),
    }
    setIsLoading(true)
    reqInstance.get(`${newUrl}/${id}/sales-analytics/total-sales`,{params:data})
    .then ((data) => setData(data.data))
    .then(() => setIsLoading(false))
}
const getCurrentSales= (setData:any,setIsLoading:any,id:any) => {
    const data = {
        from:firstDay.toISOString(),
        to:now.toISOString(),
      }
      setIsLoading(true)
    reqInstance.get(`${newUrl}/${id}/sales-analytics/total-sales`,{params:data})
    .then ((data) => setData(data.data))
    .then(() => setIsLoading(false))
}
const getTotalDatePartSales= (setData:any,setIsLoading:any,id:any) => {
    const data = {
        part:"dow",
        from:d.toISOString(),
    to:now.toISOString(),
    }
    const weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    setIsLoading(true)
    reqInstance.get(`${newUrl}/${id}/sales-analytics/total-date-part-sales`,{params:data})
    .then ((data) => {
        const newSalesTrend = data.data.map((sale: any) => {
            return { ...sale, part: weekDays [sale.part] }
        })
        console.log(newSalesTrend)
        setData(newSalesTrend)
    })
    .then(() => setIsLoading(false))
}

const getAverageOrder= (setData:any,id:any) => {
    reqInstance.get(`${newUrl}/${id}/sales-analytics/average-order`)
    .then ((data) => setData(data.data.rows))
    }

const getProductSales= (setData:any,id:any) => {
    reqInstance.get(`${newUrl}/${id}/sales-analytics/product-sales`)
    .then ((data) => setData(data.data.rows))
    }
const getRepeatCustomerRate= (setData:any,setIsLoading:any,id:any) => {
    const data = {
        from:d.toISOString(),
    to:now.toISOString(),
    }
    setIsLoading(true)
    reqInstance.get(`${newUrl}/${id}/sales-analytics/repeat-customer-rate`,{params:data})
    .then ((data) => setData(data.data))
    .then(() => setIsLoading(false))
    }

export {
    getSalesTrend,
    getTotalSales,
    getAverageOrder,
    getProductSales,
    getRepeatCustomerRate,
    getTotalDatePartSales,
    getDailySales,
    getCurrentMonthSales,
    getCurrentSales,
    prevDate,
    d,
    firstDay,
    now
}