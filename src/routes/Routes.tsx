import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const RoutesFile = () => {
    const LoginScreen = lazy(() => import("../screens/Login/Login"))
    const OverviewScreen = lazy(() => import('../screens/Insights/Overview'))
    const SalesInsightsScreen = lazy(() => import('../screens/Insights/SalesInsights'))
    const CustomersInsightsScreen = lazy(() => import('../screens/Insights/CustomersInsights'))
    const ChurnRateInsightsScreen = lazy(() => import('../screens/Insights/ChurnRateInsights'))




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
                    <Route path='/insights/overview' element={<OverviewScreen />} />
                    <Route path='/insights/sales' element={<SalesInsightsScreen />} />
                    <Route path='/insights/customers' element={<CustomersInsightsScreen />} />
                    <Route path='/insights/churn-rate' element={<ChurnRateInsightsScreen />} />



                </Routes>
            </Router>
        </Suspense>
    )
}

export default RoutesFile