import RoutesFile from './routes/Routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import React from 'react'
import 'animate.css'
import GetForgotPasswordCode from './screens/Login/GetForgotPasswordCode'
import ResetPassword from './screens/Login/ResetPassword'
import VerifyPhone from './screens/Login/VerifyPhone'
import ResendCode from './screens/Login/ResendCode'
import LoginPage from './screens/Login/LoginPage'
import SignUpPage from './screens/Login/SignUpPage'
const App: React.FC = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route
          path="/auth/get-forgot-password"
          element={<GetForgotPasswordCode />}
        />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/verify-phone" element={<VerifyPhone />} />
        <Route path="/auth/resend-code" element={<ResendCode />} />
      </Routes>
      <RoutesFile />
    </React.Fragment>
  )
}

export default App
