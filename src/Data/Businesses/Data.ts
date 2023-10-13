import {url} from '../Auth/Data';
import {reqInstance} from '../Auth/authHelper';
// eslint-disable-next-line
const addBusiness = (post: any, navigate: any, setIsLoading: any) => {
  setIsLoading(true);
  reqInstance.post(`${url}/businesses`, post).then(() => navigate('/'));
};
const getBusiness = async () => {
  const response = await reqInstance.get(`${url}/businesses`);
  return response.data.rows;
};

const getSingleBusiness = async (
  // eslint-disable-next-line
  setData: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  setFormData: any
) => {
  setIsLoading(true);
  await reqInstance
    .get(`${url}/businesses/${id}`)
    .then((data) => {
      setFormData({
        name: data.data.name,
        businessEmail: data.data.businessEmail,
        businessPhone: data.data.businessPhone,
        location: data.data.location,
        locationDetails: data.data.locationDetails,
        productType: data.data.productType,
        description: data.data.description,
        longitude: data.data.longitude,
        latitude: data.data.latitude,
      });
      setData(data.data);
    })
    .then(() => setIsLoading(false));
};
const updateSingleBusiness = async (
  // eslint-disable-next-line
  post: any,
  // eslint-disable-next-line
  navigate: any,
  // eslint-disable-next-line
  id: any,
  // eslint-disable-next-line
  setIsLoading: any
) => {
  setIsLoading(true);
  await reqInstance
    .put(`${url}/businesses/${id}`, post)
    .then((data) => console.log(data))
    .then(() => navigate('/'));
};
// eslint-disable-next-line
const deleteBusiness = async (setData: any, id: any, setIsLoading: any) => {
  setIsLoading(true);
  await reqInstance
    .delete(`${url}/businesses/${id}`)
    .then((data) => console.log(data))
    .then(() => setIsLoading(false));
};

export {
  getBusiness,
  addBusiness,
  getSingleBusiness,
  deleteBusiness,
  updateSingleBusiness,
};
