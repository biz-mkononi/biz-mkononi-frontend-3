
  const url = "https://api-stage.mkononi.biz"

  const verifyPhone = (phone:any) => {
    fetch(`${url}/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phone),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
      });
      console.log(phone)
  }

  const resendVerification = (phone:any,setIsLoading:any,setErrors:any,navigate:any) => {
    fetch(`${url}/auth/verify/resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phone),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) {
          setIsLoading(false)
          setErrors(json.message);
        } else {
          setIsLoading(false)
          navigate(0)
          console.log(json)
        }
      });
      console.log(phone)
  }
  const login = (setErrors:any,post:any,navigate:any,setIsSignIn:any,setLoggedUser:any) => {
    fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) {
          setIsSignIn(false)
          setErrors(json.message);
        } else {
          setLoggedUser(true)
          localStorage.setItem("user", JSON.stringify({ json })); 
        }
      })
      .then(() => navigate('/'))
  }

  
  const registerUser = async (setErrors:any,post:any,setIsRegistering:any,setIsVerified:any) => {
    fetch(`${url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) {
          setIsRegistering(false)
          setErrors(json.message);
        } else {
          setIsRegistering(false)
          setIsVerified(true)
          console.log(json)
        }
      });
    console.log(post)
  }

  const forgotPassword = async (setErrors:any,post:any,setIsLoading:any,setIsResetPassword:any) => {
    fetch(`${url}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) {
          setIsLoading(false)
          setErrors(json.message);
        } else {
          setIsLoading(false)
          setIsResetPassword(true)

          console.log(json)
        }
      });
    console.log(post)
  }
  const changePassword = async (setErrors:any,post:any,setIsLoading:any,navigate:any) => {
    fetch(`${url}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) {
          setIsLoading(false)
          setErrors(json.message);
        } else {
          setIsLoading(false)
          navigate(0)
          console.log(json)
        }
      });
    console.log(post)
  }

  export {
      url,
      registerUser,
      login,
      verifyPhone,
      forgotPassword,
      changePassword,
      resendVerification
  }
  