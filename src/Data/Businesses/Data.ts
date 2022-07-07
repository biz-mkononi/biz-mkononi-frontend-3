import { url } from "../Auth/Data";
import authHeader from '../Auth/authHelper';

const addBusiness = (post:any) => {
    fetch(`${url}/businesses`, {
        method: "POST",
        body: JSON.stringify(post),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
        });
      console.log(post)
}
const getBusiness = () => {
    fetch(`${url}/businesses`, {
        method: "get",
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
        });
}

export {
    addBusiness,
    getBusiness
}