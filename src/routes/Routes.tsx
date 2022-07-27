import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import AppMenu from "../screens/sidebar/AppMenu"
import AppBarMenu from "../screens/AppBar/AppBar"
import clsx from 'clsx'
import { auth } from '../Data/Auth/authHelper'
import PrivateRoute from './PrivateRoute'
import "./sidebar.css"

const RoutesFile = () => {
    const LoginScreen = lazy(() => import("../screens/Login/Login"))
    const OverviewScreen = lazy(() => import('../screens/Insights/Overview'))
    const SalesInsightsScreen = lazy(() => import('../screens/Insights/SalesInsights'))
    const CustomersInsightsScreen = lazy(() => import('../screens/Insights/CustomersInsights'))
    const ChurnRateInsightsScreen = lazy(() => import('../screens/Insights/ChurnRateInsights'))
    const AddBusiness = lazy(() => import('../screens/Businesses/AddBusiness'))
    const AddSale = lazy(() => import('../screens/Sales/AddSale'))
    const AddCustomer = lazy(() => import('../screens/customers/NewCustomer'))
    const AddSupplier = lazy(() => import('../screens/suppliers/NewSupplier'))
    const BusinessList = lazy(() => import('../screens/Businesses/BusinessList'))
    const NewCategory = lazy(() => import('../screens/Products/NewCategory'))
    const AddProduct = lazy(() => import('../screens/Products/AddProduct'))
    const NewEmployee = lazy(() => import('../screens/Employees/NewEmployee'))
    const PayEmployee = lazy(() => import('../screens/Employees/PayEmployee'))

    const classes = useStyles()

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
                <div className={clsx('App', classes.root)}>

                    {
                        auth.isAuthenticated() && (
                            <>
                                <CssBaseline />
                                <Drawer
                                    className='shadow'
                                    variant="permanent"
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                >
                                    <AppMenu />
                                </Drawer>
                            </>
                        )
                    }
                    <main className={classes.content}>
                        <Container maxWidth="lg" className={classes.container}>
                            {/* <AppBarMenu /> */}

                            <Routes>

                                <Route path='/insights/overview' element={
                                    <PrivateRoute>
                                        <OverviewScreen />
                                    </PrivateRoute>
                                } />
                                <Route path='/insights/sales' element={
                                    <PrivateRoute>
                                        <SalesInsightsScreen />
                                    </PrivateRoute>
                                } />
                                <Route path='/insights/customers' element={
                                    <PrivateRoute>
                                        <CustomersInsightsScreen />
                                    </PrivateRoute>
                                } />
                                <Route path='/insights/churn-rate' element={
                                    <PrivateRoute>
                                        <ChurnRateInsightsScreen />
                                    </PrivateRoute>
                                } />
                                <Route path='/businesses/add' element={
                                    <PrivateRoute>
                                        <AddBusiness />
                                    </PrivateRoute>
                                } />
                                <Route path='/businesses/list' element={
                                    <PrivateRoute>
                                        <BusinessList />
                                    </PrivateRoute>
                                } />
                                <Route path='/sales/add' element={
                                    <PrivateRoute>
                                        <AddSale />
                                    </PrivateRoute>
                                } />
                                <Route path='/customers/new' element={
                                    <PrivateRoute>
                                        <AddCustomer />
                                    </PrivateRoute>
                                } />
                                <Route path='/supplier/new' element={
                                    <PrivateRoute>
                                        <AddSupplier />
                                    </PrivateRoute>
                                } />
                                <Route path='/category/new' element={
                                    <PrivateRoute>
                                        <NewCategory />
                                    </PrivateRoute>
                                } />
                                <Route path='/product/new' element={
                                    <PrivateRoute>
                                        <AddProduct />
                                    </PrivateRoute>
                                } />
                                <Route path='/employee/new' element={
                                    <PrivateRoute>
                                        <NewEmployee />
                                    </PrivateRoute>
                                } />
                                <Route path='/employee/pay' element={
                                    <PrivateRoute>
                                        <PayEmployee />
                                    </PrivateRoute>
                                } />


                            </Routes>
                        </Container>

                    </main>

                </div>

            </Router>
        </Suspense>
    )
}
const drawerWidth = 300

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        background: '#e1f3ff',
        color: '#1B262C',
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(2),
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',

    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}))


export default RoutesFile