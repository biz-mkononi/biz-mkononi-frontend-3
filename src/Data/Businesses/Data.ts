import { url } from '../Auth/Data'
import { auth, reqInstance } from '../Auth/authHelper'

const addBusiness = (post: any, navigate: any, setIsLoading: any) => {
  setIsLoading(true)
  reqInstance.post(`${url}/businesses`, post).then(() => navigate('/'))
}
const getBusiness = (setData: any, setIsLoading: any) => {
  setIsLoading(true)
  reqInstance
    .get(`${url}/businesses`)
    .then((data) => {
      setData(data.data.rows)
    })
    .then(() => setIsLoading(false))
}

const getSingleBusiness = async (
  setData: any,
  id: any,
  setIsLoading: any,
  setFormData: any,
) => {
  setIsLoading(true)
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
      })
      setData(data.data)
    })
    .then(() => setIsLoading(false))
}
const updateSingleBusiness = async (
  post: any,
  navigate: any,
  id: any,
  setIsLoading: any,
) => {
  setIsLoading(true)
  await reqInstance
    .put(`${url}/businesses/${id}`, post)
    .then((data) => console.log(data))
    .then(() => navigate('/'))
}

const deleteBusiness = async (setData: any, id: any, setIsLoading: any) => {
  setIsLoading(true)
  await reqInstance
    .delete(`${url}/businesses/${id}`)
    .then((data) => console.log(data))
    .then(() => setIsLoading(false))
}

export {
  getBusiness,
  addBusiness,
  getSingleBusiness,
  deleteBusiness,
  updateSingleBusiness,
}
