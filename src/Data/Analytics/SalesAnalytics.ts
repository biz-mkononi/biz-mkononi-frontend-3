import {months} from '../../Constants/Constants';
import {reqInstance} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
const d = new Date();
d.setFullYear(d.getFullYear() - 1);
d.setHours(0, 0, 0, 0);
const prevMonth = new Date();
prevMonth.setMonth(prevMonth.getMonth() - 1);
prevMonth.setHours(0, 0, 0, 0);

const now = new Date();

const prevDate = new Date();
prevDate.setDate(d.getDate() - 1);
prevDate.setHours(0, 0, 0, 0);

const fd = new Date();
const firstDay = new Date(fd.getFullYear(), fd.getMonth(), 1);
// eslint-disable-next-line
const getSalesTrendByMonth = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/sales-analytics/sales-trend`,
    {params: data}
  );
  // eslint-disable-next-line
  const newSalesTrend = response.data.map((sale: any) => {
    const newDate = new Date(sale.group);
    const monthIndex = newDate.getMonth();
    const monthName = months[monthIndex];
    return {...sale, group: monthName};
  });
  console.log(newSalesTrend);

  return newSalesTrend;
};
// eslint-disable-next-line
const getSalesInLastMonthTrend = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/sales-analytics/sales-trend`,
    {params: data}
  );
  // eslint-disable-next-line
  const newSalesTrend = response.data.map((sale: any) => {
    return {...sale, group: new Date(sale.group).toLocaleDateString()};
  });
  return newSalesTrend;
};
// eslint-disable-next-line
const getTotalSales = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/sales-analytics/total-sales`,
    {params: data}
  );
  return response.data.total;
};
// eslint-disable-next-line
const getTotalDatePartSalesByHour = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/sales-analytics/total-date-part-sales`,
    {params: data}
  );
  // eslint-disable-next-line
  const newSalesTrend = response.data.map((sale: any) => {
    const part = parseInt(sale.part);
    const hours = part % 24; //
    return {...sale, part: `${hours.toString().padStart(2, '0')}:00`};
  });

  return newSalesTrend;
};
// eslint-disable-next-line
const getAverageOrder = (setData: any, id: any) => {
  reqInstance
    .get(`${newUrl}/${id}/sales-analytics/average-order`)
    .then((data) => setData(data.data.rows));
};
// eslint-disable-next-line
const getProductSales = (setData: any, id: any) => {
  reqInstance
    .get(`${newUrl}/${id}/sales-analytics/product-sales`)
    .then((data) => setData(data.data.rows));
};
// eslint-disable-next-line
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
