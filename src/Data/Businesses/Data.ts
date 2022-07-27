import { url } from "../Auth/Data";
import { auth,reqInstance } from "../Auth/authHelper";

const addBusiness = (post:any) => {
    reqInstance.post(`${url}/businesses`,post)
    .then((data) => console.log(data))
}
const getBusiness = (setData:any) => {
  reqInstance.get(`${url}/businesses`)
  .then ((data) => setData(data.data.rows))
}


export {
    getBusiness,
    addBusiness
}