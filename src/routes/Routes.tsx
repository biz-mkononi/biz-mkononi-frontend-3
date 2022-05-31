import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const RoutesFile = () => {
    const LoginScreen = lazy(() => import("../screens/Login/Login"))

    return (
        <Suspense fallback={<div>Loading...</div>}>

            <Router>
                <Routes>
                    <Route path='/auth/login' element={<LoginScreen />} />
                </Routes>
            </Router>
        </Suspense>
    )
}

export default RoutesFile