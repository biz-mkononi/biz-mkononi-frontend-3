const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
  const login = (setErrors:any,setIsloading:any,post:any) => {
    setIsloading(true)
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
          setIsloading(false)
          setErrors(json.message);
        } else {
          console.log(json)
          // localStorage.setItem("adminProfile", JSON.stringify({ json }));
        }
      });
    console.log(post)
  }

  
  const register = async (setErrors:any,setIsSigned:any,setIsLoading:any,setPhoneNumber:any,post:any) => {
    setIsLoading(true)
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
          setIsLoading(false)
          setErrors(json.message);
        } else {
          setPhoneNumber(json.phone)
          setIsSigned(true)
          console.log(json)
        }
      });
    console.log(post)
  }

  export {
      data,
      register,
      login,
      verifyPhone
  }
  