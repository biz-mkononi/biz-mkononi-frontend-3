const user = JSON.parse(localStorage.getItem('user')!);

const auth = {

    isAuthenticated() {
  
      if (user )
        return user;
      else return false;
    },
    authHeader() {
        if (typeof window == "undefined") return false;

        if (user && user.json.jwt) {
            // for Node.js Express back-end
            return { Authorization: 'Bearer ' + user.json.jwt };
        } else {
            return {};
        }
    }
  };
  
  export { auth };