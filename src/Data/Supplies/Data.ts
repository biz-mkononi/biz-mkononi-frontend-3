import { reqInstance, reqInstance2 } from '../Auth/authHelper'
import { newUrl } from '../Sales/Data'
const addSupply = (post: any, navigate: any, setIsLoading: any, id: any) => {
  setIsLoading(true)
  reqInstance2
    .post(`${newUrl}/${id}/supplies`, post)
    .then(() => navigate('/supplies/list'))
}
const getSupplies = (setData: any, setIsLoading: any, id: any) => {
  setIsLoading(true)
  reqInstance
    .get(`${newUrl}/${id}/supplies`)
    .then((data) => setData(data.data.rows))
    .then(() => setIsLoading(false))
}

const getSingleSupply = async (
  setData: any,
  setSupplier: any,
  setProduct: any,
  id: any,
  setIsLoading: any,
  businessid: any,
) => {
  setIsLoading(true)
  await reqInstance
    .get(`${newUrl}/${businessid}/supplies/${id}`)
    .then((data) => {
      setData(data.data)
      setSupplier(data.data.supplier)
      setProduct(data.data.supplyItems)
    })
    .then(() => setIsLoading(false))
}
const deleteSupplies = async (
  navigate: any,
  id: any,
  setIsLoading: any,
  businessid: any,
) => {
  setIsLoading(true)
  await reqInstance
    .delete(`${newUrl}/${businessid}/supplies/${id}`)
    .then(() => navigate('/supplies/list'))
    .then(() => setIsLoading(false))
}

export { addSupply, getSupplies, getSingleSupply, deleteSupplies }
