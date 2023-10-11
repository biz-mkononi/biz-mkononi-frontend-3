import {months, weekDays} from '../../Constants/Constants';
import {reqInstance} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
var d = new Date();
d.setFullYear(d.getFullYear() - 1);
d.setHours(0, 0, 0, 0);
var prevMonth = new Date();
prevMonth.setMonth(prevMonth.getMonth() - 1);
prevMonth.setHours(0, 0, 0, 0);

var now = new Date();

let prevDate = new Date();
prevDate.setDate(d.getDate() - 1);
prevDate.setHours(0, 0, 0, 0);

let fd = new Date();
var firstDay = new Date(fd.getFullYear(), fd.getMonth(), 1);

const getSalesTrendByMonth = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/sales-analytics/sales-trend`,
    {params: data}
  );
  const newSalesTrend = response.data.map((sale: any) => {
    const newDate = new Date(sale.group);
    const monthIndex = newDate.getMonth();
    const monthName = months[monthIndex];
    return {...sale, group: monthName};
  });
  console.log(newSalesTrend);

  return newSalesTrend;
};
const getSalesInLastMonthTrend = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/sales-analytics/sales-trend`,
    {params: data}
  );
  const newSalesTrend = response.data.map((sale: any) => {
    return {...sale, group: new Date(sale.group).toLocaleDateString()};
  });
  return newSalesTrend;
};

const getTotalSales = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/sales-analytics/total-sales`,
    {params: data}
  );
  return response.data.total;
};

const getTotalDatePartSalesByHour = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/sales-analytics/total-date-part-sales`,
    {params: data}
  );
  const newSalesTrend = response.data.map((sale: any) => {
    const part = parseInt(sale.part);
    const hours = part % 24; //
    return {...sale, part: `${hours.toString().padStart(2, '0')}:00`};
  });

  return newSalesTrend;
};
const getAverageOrder = (setData: any, id: any) => {
  reqInstance
    .get(`${newUrl}/${id}/sales-analytics/average-order`)
    .then((data) => setData(data.data.rows));
};

const getProductSales = (setData: any, id: any) => {
  reqInstance
    .get(`${newUrl}/${id}/sales-analytics/product-sales`)
    .then((data) => setData(data.data.rows));
};
const getRepeatCustomerRate = (setData: any, setIsLoading: any, id: any) => {
  const data = {
    from: d.toISOString(),
    to: now.toISOString(),
  };
  setIsLoading(true);
  reqInstance
    .get(`${newUrl}/${id}/sales-analytics/repeat-customer-rate`, {
      params: data,
    })
    .then((data) => setData(data.data))
    .then(() => setIsLoading(false));
};

export {
  getSalesTrendByMonth,
  getTotalSales,
  getAverageOrder,
  getProductSales,
  getRepeatCustomerRate,
  getSalesInLastMonthTrend,
  getTotalDatePartSalesByHour,
  prevDate,
  d,
  firstDay,
  prevMonth,
  now,
};
