import {reqInstance} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
// eslint-disable-next-line
const getGroupedProfits = (setData: any, id: any) => {
  reqInstance
    .get(`${newUrl}/${id}/profits-analytics/grouped-profits`)
    .then((data) => setData(data.data.rows));
};
// eslint-disable-next-line
const getTotalProfits = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/profits-analytics/total-profits`,
    {params: data}
  );
  return response.data.total;
};

const getTodayTotalProfits = (
  // eslint-disable-next-line
  setData: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  data: any
) => {
  setIsLoading(true);
  reqInstance
    .get(`${newUrl}/${id}/profits-analytics/total-profits`, {params: data})
    .then((data) => setData(data.data.total))
    .then(() => setIsLoading(false));
};

export {getGroupedProfits, getTotalProfits, getTodayTotalProfits};
