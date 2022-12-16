const user = JSON.parse(localStorage.getItem('user')!);

import axios,{AxiosInstance} from "axios"

const auth = {


isAuthenticated() {

  if (user)
    return true;
  else return false;
},
authHeader() {

  if (user && user.json.jwt) {
    return { Authorization: 'Bearer ' + user.json.jwt };
  } else {
    return {};
  }
}
  };
const instance =  () => {
  if (user) {
    return user.json.jwt
  }
}


const reqInstance:AxiosInstance = axios.create({

    headers: {
      Authorization: `Bearer ${instance()}`,
      "Content-Type": "multipart/form-data",
   
  }
  
}
)

const reqInstance2:AxiosInstance = axios.create({

  headers: {
    Authorization: `Bearer ${instance()}` 
}

}
)

export { auth,reqInstance,reqInstance2,user };

