import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const RoutesFile = () => {
    const LoginScreen = lazy(() => import("../screens/Login/Login"))

    return (
        <Suspense fallback={
            <div className="flex justify-center items-center mt-3">
                <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-blue-600" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        }>

            <Router>
                <Routes>
                    <Route path='/auth/login' element={<LoginScreen />} />
                </Routes>
            </Router>
        </Suspense>
    )
}

export default RoutesFile