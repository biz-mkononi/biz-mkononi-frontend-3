import { reqInstance } from '../Auth/authHelper'
import { newUrl } from '../Sales/Data'
const addSupplier = (post: any, navigate: any, setIsLoading: any, id: any) => {
  setIsLoading(true)
  reqInstance
    .post(`${newUrl}/${id}/suppliers`, post)
    .then(() => navigate('/suppliers/list'))
}
const getSuppliers = (setData: any, setIsLoading: any, id: any) => {
  setIsLoading(true)
  reqInstance
    .get(`${newUrl}/${id}/suppliers`)
    .then((data) => setData(data.data.rows))
    .then(() => setIsLoading(false))
}

const getSingleSupplier = async (
  setData: any,
  id: any,
  setIsLoading: any,
  setFormData: any,
  businessid: any,
) => {
  setIsLoading(true)
  await reqInstance
    .get(`${newUrl}/${businessid}/suppliers/${id}`)
    .then((data) => {
      setFormData({
        name: data.data.name,
        email: data.data.email,
        description: data.data.description,
        phone: data.data.phone,
      })
      setData(data.data)
    })
    .then(() => setIsLoading(false))
}
const updateSingleSupplier = async (
  post: any,
  navigate: any,
  id: any,
  setIsLoading: any,
  businessid: any,
) => {
  setIsLoading(true)
  await reqInstance
    .put(`${newUrl}/${businessid}/suppliers/${id}`, post)
    .then(() => navigate('/suppliers/list'))
}
const deleteSupplier = async (
  navigate: any,
  id: any,
  setIsLoading: any,
  businessid: any,
) => {
  setIsLoading(true)
  await reqInstance
    .delete(`${newUrl}/${businessid}/suppliers/${id}`)
    .then(() => navigate('/suppliers/list'))
    .then(() => setIsLoading(false))
}

export {
  addSupplier,
  getSuppliers,
  getSingleSupplier,
  deleteSupplier,
  updateSingleSupplier,
}
