import { url } from "../Auth/Data";
import { reqInstance } from "../Auth/authHelper";
const businessId = JSON.parse(localStorage.getItem("businessId")!)

const newUrl = `${url}/${businessId}`

const addEmployee = (post:any) => {
    reqInstance.post(`${newUrl}/employees`,post)
    .then((data) => console.log(data))
}
const getEmployees = (setData:any) => {
  reqInstance.get(`${newUrl}/employees`)
  .then ((data) => setData(data.data.rows))
}

export {
    addEmployee,
    getEmployees,
    newUrl
}