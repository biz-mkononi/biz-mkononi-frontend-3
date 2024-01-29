const url = 'https://api-stage.mkononi.biz';
// const url = "http://localhost:3000"
// eslint-disable-next-line
const verifyPhone = (
  // eslint-disable-next-line
  phone: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  setErrors: any,
  // eslint-disable-next-line
  navigate: any
  ) => {
  fetch(`${url}/auth/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(phone),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.statusCode === 403) {
        setIsLoading(false);
        setErrors(json.message);
      } else {
        setIsLoading(false);
        navigate('/auth/login');
      }
    });
};

const resendVerification = (
  // eslint-disable-next-line
  phone: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  setErrors: any,
  // eslint-disable-next-line
  navigate: any
) => {
  fetch(`${url}/auth/verify/resend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(phone),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.statusCode === 403) {
        setIsLoading(false);
        setErrors(json.message);
      } else {
        setIsLoading(false);
        navigate('/auth/verify-phone');
      }
    });
};
const login = (
  // eslint-disable-next-line
  setErrors: any,
  // eslint-disable-next-line
  post: any,
  // eslint-disable-next-line
  navigate: any,
  // eslint-disable-next-line
  setIsSignIn: any,
  // eslint-disable-next-line
  setLoggedUser: any,
  // eslint-disable-next-line
  setUser: any
) => {
  setIsSignIn(true);
  fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.statusCode === 401) {
        setIsSignIn(false);
        setErrors('You are unauthorized, verify your details');
      } else {
        setLoggedUser(true);
        setUser(data)
        navigate('/');
      }
    });
};

const registerUser = async (
  // eslint-disable-next-line
  setErrors: any,
  // eslint-disable-next-line
  post: any,
  // eslint-disable-next-line
  setIsRegistering: any,
  // eslint-disable-next-line
  navigate: any
) => {
  fetch(`${url}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.statusCode === 403) {
        setIsRegistering(false);
        setErrors(json.message);
      } else {
        setIsRegistering(false);
        navigate('/auth/verify-phone')
      }
    });
};

const forgotPassword = async (
  // eslint-disable-next-line
  setErrors: any,
  // eslint-disable-next-line
  post: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  navigate: any
) => {
  fetch(`${url}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.statusCode === 403) {
        setIsLoading(false);
        console.log(json.message);
        setErrors(json.message);
      } else {
        setIsLoading(false);
        navigate('/auth/reset-password');
      }
    });
};
const changePassword = async (
  // eslint-disable-next-line
  setErrors: any,
  // eslint-disable-next-line
  post: any,
  // eslint-disable-next-line
  setIsLoading: any,
  // eslint-disable-next-line
  navigate: any
) => {
  fetch(`${url}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.statusCode === 403) {
        setIsLoading(false);
        console.log(json.message);
        setErrors('invalid code');
      } else {
        setIsLoading(false);
        navigate('/auth/login');
      }
    });
  console.log(post);
};

export {
  url,
  registerUser,
  login,
  verifyPhone,
  forgotPassword,
  changePassword,
  resendVerification,
};
