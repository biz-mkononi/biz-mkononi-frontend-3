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
import BusinessList from '../screens/Businesses/BusinessList'

const RoutesFile = () => {
    const LoginScreen = lazy(() => import("../screens/Login/Login"))
    const OverviewScreen = lazy(() => import('../screens/Insights/Overview'))
    const SalesInsightsScreen = lazy(() => import('../screens/Insights/SalesInsights'))
    const CustomersInsightsScreen = lazy(() => import('../screens/Insights/CustomersInsights'))
    const ChurnRateInsightsScreen = lazy(() => import('../screens/Insights/ChurnRateInsights'))
    const AddBusiness = lazy(() => import('../screens/Businesses/AddBusiness'))


    const classes = useStyles()

    return (
        <Suspense fallback={
            <div className="flex justify-center items-center mt-3">
                <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-blue-600" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        }>
            <div className={clsx('App', classes.root)}>

                <Router>
                    <CssBaseline />
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <AppMenu />
                    </Drawer>
                    <main className={classes.content}>
                        <Container maxWidth="lg" className={classes.container}>
                            {/* <AppBarMenu /> */}

                            <Routes>



                                <Route path='/auth/login' element={<LoginScreen />} />
                                <Route path='/insights/overview' element={<OverviewScreen />} />
                                <Route path='/insights/sales' element={<SalesInsightsScreen />} />
                                <Route path='/insights/customers' element={<CustomersInsightsScreen />} />
                                <Route path='/insights/churn-rate' element={<ChurnRateInsightsScreen />} />
                                <Route path='/businesses/add' element={<AddBusiness />} />
                                <Route path='/businesses/list' element={<BusinessList />} />


                            </Routes>
                        </Container>

                    </main>

                </Router>
            </div>
        </Suspense>
    )
}
const drawerWidth = 240

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
        background: '#BBE1FA',
        color: '#1B262C',
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