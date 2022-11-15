import RoutesFile from "./routes/Routes"
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from 'react-router-dom'
import Login from "./screens/Login/Login"
import React from "react"
import 'animate.css';
const App = () => {

  return (
    <React.Fragment>
      <Routes>
        <Route path='/auth/login' element={<Login />} />

      </Routes>
      <RoutesFile />
    </React.Fragment>
  )
}

export default App
