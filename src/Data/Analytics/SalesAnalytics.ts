import { months, weekDays } from "../../Constants/Constants";
import { reqInstance } from "../Auth/authHelper";
import { newUrl } from "../Sales/Data";
var d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    d.setHours(0, 0, 0, 0);
var prevMonth = new Date();
prevMonth.setMonth(prevMonth.getMonth() - 1);
prevMonth.setHours(0, 0, 0, 0);

var now = new Date ()

let prevDate = new Date();
prevDate.setDate(d.getDate() - 1);
prevDate.setHours(0, 0, 0, 0);

let fd = new Date ()
var firstDay = new Date(fd.getFullYear(), fd.getMonth(), 1);

const getSalesTrendByMonth= (setData:any,setIsLoading:any,id:any) => {
    const data = {
        from:d.toISOString(),
        to:now.toISOString(),
        group:"month",
      }
      setIsLoading(true)
  reqInstance.get(`${newUrl}/${id}/sales-analytics/sales-trend`, {params:data})
  .then ((data) => {
    const newSalesTrend = data.data.map((sale: any) => {
        const newDate = new Date(sale.group)
        const monthIndex = newDate.getMonth();
        const monthName = months[monthIndex];
        return { ...sale, group: monthName }
    })
    setData(newSalesTrend)
  })
  .then(() => setIsLoading(false))
}
const getSalesInLastMonthTrend= (setData:any,setIsLoading:any,id:any) => {
    const data = {
        from:prevMonth.toISOString(),
        to:now.toISOString(),
        group:"day",
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
const getTotalDatePartSalesByWeekDay= (setData:any,setIsLoading:any,id:any) => {
    const data = {
        part:"dow",
        from:d.toISOString(),
    to:now.toISOString(),
    }
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
const getTotalDatePartSalesByHour= (setData:any,setIsLoading:any,id:any) => {
    const data = {
        part:"hour",
        from:d.toISOString(),
    to:now.toISOString(),
    }
    setIsLoading(true)
    reqInstance.get(`${newUrl}/${id}/sales-analytics/total-date-part-sales`,{params:data})
    .then ((data) => {
        const newSalesTrend = data.data.map((sale: any) => {
            const part = parseInt(sale.part);
    const hours = part % 24; //
            return { ...sale, part: `${hours.toString().padStart(2, '0')}:00` }
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
    getSalesTrendByMonth,
    getTotalSales,
    getAverageOrder,
    getProductSales,
    getRepeatCustomerRate,
    getTotalDatePartSalesByWeekDay,
    getDailySales,
    getCurrentMonthSales,
    getCurrentSales,
    getSalesInLastMonthTrend,
    getTotalDatePartSalesByHour,
    prevDate,
    d,
    firstDay,
    prevMonth,
    now
}