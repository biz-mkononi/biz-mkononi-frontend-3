import React, { Suspense, lazy, useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import AppMenu from "../screens/sidebar/AppMenu"
import clsx from 'clsx'
import { auth, user } from '../Data/Auth/authHelper'
import PrivateRoute from './PrivateRoute'
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { DataContext } from '../context/ContextProvider'
import "./sidebar.css"
import AppBar from '../screens/AppBar/AppBar'


const RoutesFile = () => {
    const ProductDetails = lazy(() => import('../screens/Products/ProductDetails'))
    const UpdateProductDetails = lazy(() => import('../screens/Products/UpdateProductDetails'))
    const OverviewScreen = lazy(() => import('../screens/Insights/Overview'))
    const SalesInsightsScreen = lazy(() => import('../screens/Insights/SalesInsights'))
    const CustomersInsightsScreen = lazy(() => import('../screens/Insights/CustomersInsights'))
    const ChurnRateInsightsScreen = lazy(() => import('../screens/Insights/ChurnRateInsights'))
    const AddBusiness = lazy(() => import('../screens/Businesses/AddBusiness'))
    const AddSale = lazy(() => import('../screens/Sales/AddSale'))
    const CustomersList = lazy(() => import('../screens/customers/CustomersList'))
    const AddCustomer = lazy(() => import('../screens/customers/NewCustomer'))
    const AddSupplier = lazy(() => import('../screens/suppliers/NewSupplier'))
    const SuppliersList = lazy(() => import('../screens/suppliers/SuppliersList'))
    const BusinessList = lazy(() => import('../screens/Businesses/BusinessList'))
    const NewCategory = lazy(() => import('../screens/Products/NewCategory'))
    const CategoriesList = lazy(() => import('../screens/Products/CategoriesList'))
    const AddProduct = lazy(() => import('../screens/Products/AddProduct'))
    const ProductsList = lazy(() => import('../screens/Products/ProductList'))
    const NewEmployee = lazy(() => import('../screens/Employees/NewEmployee'))
    const EmployeesList = lazy(() => import('../screens/Employees/EmployeesList'))
    const PayEmployee = lazy(() => import('../screens/Employees/PayEmployee'))
    const EmployeesSalaries = lazy(() => import('../screens/Employees/EmployeesSalaries'))
    const BusinessDetails = lazy(() => import('../screens/Businesses/BusinessDetails'))
    const UpdateBusinessDetails = lazy(() => import('../screens/Businesses/UpdateBusinessDetails'))
    const UpdateSupplierDetails = lazy(() => import('../screens/suppliers/UpdateDetails'))
    const SupplierDetails = lazy(() => import('../screens/suppliers/SupplierDetails'))
    const CategoryDetails = lazy(() => import('../screens/Products/CategoryDetails'))
    const UpdateCategories = lazy(() => import('../screens/Products/UpdateCategories'))
    const CustomerDetails = lazy(() => import('../screens/customers/CustomerDetails'))
    const UpdateCustomerDetails = lazy(() => import('../screens/customers/UpdateCustomerDetails'))
    const EmployeeDetails = lazy(() => import('../screens/Employees/EmployeeDetails'))
    const EmployeeUpdateDetails = lazy(() => import('../screens/Employees/EmployeeUpdateDetails'))
    const UpdateSalariesDetails = lazy(() => import('../screens/Employees/UpdateSalariesDetails'))
    const AddIncome = lazy(() => import('../screens/Finance/AddIncome'))
    const AddExpense = lazy(() => import('../screens/Finance/AddExpense'))
    const Income = lazy(() => import('../screens/Finance/Income'))
    const Expense = lazy(() => import('../screens/Finance/Expense'))
    const ExpenseDetails = lazy(() => import('../screens/Finance/ExpenseDetails'))
    const IncomeDetails = lazy(() => import('../screens/Finance/IncomeDetails'))
    const UpdateExpenseDetails = lazy(() => import('../screens/Finance/UpdateExpenseDetails'))
    const UpdateIncomeDetails = lazy(() => import('../screens/Finance/UpdateIncomeDetails'))
    const SalesList = lazy(() => import('../screens/Sales/SalesList'))
    const SalesDetails = lazy(() => import('../screens/Sales/SalesDetails'))
    const SalariesDetails = lazy(() => import('../screens/Employees/SalariesDetails'))
    const SuppliesList = lazy(() => import('../screens/Supplies/SuppliesList'))
    const SuppliesDetails = lazy(() => import('../screens/Supplies/SuppliesDetails'))
    const AddSupply = lazy(() => import('../screens/Supplies/AddSupply'))


    const classes = useStyles()
    const theme = useTheme();
    const matches = useMediaQuery(() => theme.breakpoints.up('sm'));
    const { isTrue, setIsTrue } = useContext(DataContext)

    return (


        <>



            <div className={clsx('App', classes.root)}>
                {
                    user && (
                        <>
                            <CssBaseline />
                            {
                                isTrue || matches ?
                                    <Drawer
                                        className='shadow animate__backInLeft'
                                        variant="permanent"
                                        classes={{
                                            paper: classes.drawerPaper,
                                        }}
                                    >

                                        <AppMenu />
                                    </Drawer>
                                    :
                                    ""
                            }

                        </>
                    )
                }


                <Suspense fallback={
                    <div className="flex justify-center items-center mt-3">
                        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-blue-600" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }>

                    <main className={classes.content}>
                        <Container maxWidth="lg" className={classes.container}>
                            {/* <AppBarMenu /> */}
                            <PrivateRoute>
                                <AppBar />
                            </PrivateRoute>

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
                                <Route path='/' element={
                                    <PrivateRoute>
                                        <BusinessList />
                                    </PrivateRoute>
                                } />
                                <Route path='/business/:id/details' element={
                                    <PrivateRoute>
                                        <BusinessDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/business/:id/update-details' element={
                                    <PrivateRoute>
                                        <UpdateBusinessDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/sales/add' element={
                                    <PrivateRoute>
                                        <AddSale />
                                    </PrivateRoute>
                                } />
                                <Route path='/sales/list' element={
                                    <PrivateRoute>
                                        <SalesList />
                                    </PrivateRoute>
                                } />
                                <Route path='/sales/:id/details' element={
                                    <PrivateRoute>
                                        <SalesDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/supplies/add' element={
                                    <PrivateRoute>
                                        <AddSupply />
                                    </PrivateRoute>
                                } />
                                <Route path='/supplies/list' element={
                                    <PrivateRoute>
                                        <SuppliesList />
                                    </PrivateRoute>
                                } />
                                <Route path='/supplies/:id/details' element={
                                    <PrivateRoute>
                                        <SuppliesDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/income/add' element={
                                    <PrivateRoute>
                                        <AddIncome />
                                    </PrivateRoute>
                                } />
                                <Route path='/income/list' element={
                                    <PrivateRoute>
                                        <Income />
                                    </PrivateRoute>
                                } />
                                <Route path='/income/:id/details' element={
                                    <PrivateRoute>
                                        <IncomeDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/income/:id/update-details' element={
                                    <PrivateRoute>
                                        <UpdateIncomeDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/expense/add' element={
                                    <PrivateRoute>
                                        <AddExpense />
                                    </PrivateRoute>
                                } />
                                <Route path='/expense/list' element={
                                    <PrivateRoute>
                                        <Expense />
                                    </PrivateRoute>
                                } />
                                <Route path='/expense/:id/details' element={
                                    <PrivateRoute>
                                        <ExpenseDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/expense/:id/update-details' element={
                                    <PrivateRoute>
                                        <UpdateExpenseDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/customers/new' element={
                                    <PrivateRoute>
                                        <AddCustomer />
                                    </PrivateRoute>
                                } />
                                <Route path='/customers/list' element={
                                    <PrivateRoute>
                                        <CustomersList />
                                    </PrivateRoute>
                                } />
                                <Route path='/customers/:id/details' element={
                                    <PrivateRoute>
                                        <CustomerDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/customers/:id/update-details' element={
                                    <PrivateRoute>
                                        <UpdateCustomerDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/supplier/new' element={
                                    <PrivateRoute>
                                        <AddSupplier />
                                    </PrivateRoute>
                                } />
                                <Route path='/suppliers/list' element={
                                    <PrivateRoute>
                                        <SuppliersList />
                                    </PrivateRoute>
                                } />
                                <Route path='/suppliers/:id/details' element={
                                    <PrivateRoute>
                                        <SupplierDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/suppliers/:id/update-details' element={
                                    <PrivateRoute>
                                        <UpdateSupplierDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/category/new' element={
                                    <PrivateRoute>
                                        <NewCategory />
                                    </PrivateRoute>
                                } />
                                <Route path='/categories/list' element={
                                    <PrivateRoute>
                                        <CategoriesList />
                                    </PrivateRoute>
                                } />
                                <Route path='/categories/:id/details' element={
                                    <PrivateRoute>
                                        <CategoryDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/categories/:id/update-details' element={
                                    <PrivateRoute>
                                        <UpdateCategories />
                                    </PrivateRoute>
                                } />
                                <Route path='/product/new' element={
                                    <PrivateRoute>
                                        <AddProduct />
                                    </PrivateRoute>
                                } />
                                <Route path='/products/list' element={
                                    <PrivateRoute>
                                        <ProductsList />
                                    </PrivateRoute>
                                } />
                                <Route path='/products/:id/details' element={
                                    <PrivateRoute>
                                        <ProductDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/products/:id/update-details' element={
                                    <PrivateRoute>
                                        <UpdateProductDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/employee/new' element={
                                    <PrivateRoute>
                                        <NewEmployee />
                                    </PrivateRoute>
                                } />
                                <Route path='/employees/list' element={
                                    <PrivateRoute >
                                        <EmployeesList />
                                    </PrivateRoute>
                                } />
                                <Route path='/employee/:id/details' element={
                                    <PrivateRoute>
                                        <EmployeeDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/employee/:id/update-details' element={
                                    <PrivateRoute>
                                        <EmployeeUpdateDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/employee/pay' element={
                                    <PrivateRoute >
                                        <PayEmployee />
                                    </PrivateRoute>
                                } />
                                <Route path='/employees/salaries' element={
                                    <PrivateRoute >
                                        <EmployeesSalaries />
                                    </PrivateRoute>
                                } />
                                <Route path='/employees/salaries/:id/details' element={
                                    <PrivateRoute >
                                        <SalariesDetails />
                                    </PrivateRoute>
                                } />
                                <Route path='/employees/salaries/:id/update-details' element={
                                    <PrivateRoute>
                                        <UpdateSalariesDetails />
                                    </PrivateRoute>
                                } />


                            </Routes>
                        </Container>

                    </main>
                </Suspense>

            </div>

        </>
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