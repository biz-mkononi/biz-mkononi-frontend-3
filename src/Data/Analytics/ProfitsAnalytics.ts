import {reqInstance} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
import {d, now, prevDate} from './SalesAnalytics';
const getGroupedProfits = (setData: any, id: any) => {
  reqInstance
    .get(`${newUrl}/${id}/profits-analytics/grouped-profits`)
    .then((data) => setData(data.data.rows));
};

const getTotalProfits = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/profits-analytics/total-profits`,
    {params: data}
  );
  return response.data.total;
};

const getTodayTotalProfits = (
  setData: any,
  setIsLoading: any,
  id: any,
  data: any
) => {
  setIsLoading(true);
  reqInstance
    .get(`${newUrl}/${id}/profits-analytics/total-profits`, {params: data})
    .then((data) => setData(data.data.total))
    .then(() => setIsLoading(false));
};

export {getGroupedProfits, getTotalProfits, getTodayTotalProfits};
