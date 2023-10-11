import {reqInstance} from '../Auth/authHelper';
import {now, d, prevDate, firstDay, prevMonth} from './SalesAnalytics';
import {newUrl} from '../Sales/Data';

const getTotalCustomers = async (id: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/customer-analytics/total-customers`
  );
  return response.data.total;
};

const getTotalDateSales = (setData: any, id: any) => {
  reqInstance
    .get(`${newUrl}/${id}/customer-analytics/total-date-part-sales`)
    .then((data) => setData(data.data.rows));
};

const getNewCustomers = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/customer-analytics/new-customers`,
    {params: data}
  );
  return response.data.total;
};

const getGenderStats = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/customer-analytics/gender-stats`,
    {params: data}
  );
  return response.data;
};

const getAgeStats = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/customer-analytics/age-stats`,
    {params: data}
  );
  return response.data;
};
const getRepeatCustomerRate = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/customer-analytics/repeat-customer-rate`,
    {params: data}
  );
  return response.data.rate;
};
const getChurnCustomerRate = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/customer-analytics/churn-customer-rate`,
    {params: data}
  );
  return response.data.rate;
};
const getMostActiveCustomers = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/customer-analytics/most-active-customers`,
    {params: data}
  );
  console.log(response.data);
  return response.data;
};

export {
  getTotalCustomers,
  getTotalDateSales,
  getNewCustomers,
  getGenderStats,
  getAgeStats,
  getRepeatCustomerRate,
  getChurnCustomerRate,
  getMostActiveCustomers,
};
