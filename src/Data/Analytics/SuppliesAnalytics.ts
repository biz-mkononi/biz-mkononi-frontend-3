import {reqInstance} from '../Auth/authHelper';
import {newUrl} from '../Sales/Data';
// eslint-disable-next-line
const getGroupedSupplies = (setData: any, id: any) => {
  reqInstance
    .get(`${newUrl}/${id}/supplies-analytics/grouped-supplies`)
    .then((data) => setData(data.data.rows));
};
// eslint-disable-next-line
const getTotalSupplies = async (id: any, data: any) => {
  const response = await reqInstance.get(
    `${newUrl}/${id}/supplies-analytics/total-supplies`,
    {params: data}
  );
  return response.data.total;
};

const getTodayTotalSupplies = (
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
    .get(`${newUrl}/${id}/supplies-analytics/total-supplies`, {params: data})
    .then((data) => setData(data.data.total))
    .then(() => setIsLoading(false));
};

export {getGroupedSupplies, getTotalSupplies, getTodayTotalSupplies};
