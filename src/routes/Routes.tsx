import React, { Suspense, lazy, useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import AppMenu from "../screens/sidebar/AppMenu"
import clsx from 'clsx'
import PrivateRoute from './PrivateRoute'
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, useTheme, styled } from '@mui/material/styles';
import { DataContext } from '../context/ContextProvider'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import "./sidebar.css"
import AppBar from '../screens/AppBar/AppBar'
import Box from '@mui/material/Box';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

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
    const RevenueInsights = lazy(() => import('../screens/Insights/RevenueInsights'))

    const classes = useStyles()
    const theme = useTheme();
    const { open, setOpen, user, loggedUser } = useContext(DataContext)
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (


        <div className={clsx('App', classes.root)}>
            {
                loggedUser && (
                    <>
                        <CssBaseline />
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            className={!open ? `not-shadow` : `shadow`}
                            variant="persistent"
                            anchor="left"
                            open={open}
                        >
                            <DrawerHeader>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                            </DrawerHeader>
                            <AppMenu />
                        </Drawer>

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

                <Main open={open} >
                    <DrawerHeader />
                    <div className={classes.content}>
                        {/* <AppBarMenu /> */}
                        <AppBar />

                        <Routes>
                            <Route element={<PrivateRoute />}>
                                <Route path='/insights/overview' element={
                                    <OverviewScreen />
                                } />
                                <Route path='/insights/sales' element={
                                    <SalesInsightsScreen />
                                } />
                                <Route path='/insights/customers' element={
                                    <CustomersInsightsScreen />
                                } />
                                <Route path='/insights/churn-rate' element={
                                    <ChurnRateInsightsScreen />
                                } />
                                <Route path='/insights/revenue' element={
                                    <RevenueInsights />
                                } />
                                <Route path='/businesses/add' element={
                                    <AddBusiness />
                                } />
                                <Route path='/' element={
                                    <BusinessList />
                                } />
                                <Route path='/business/:id/details' element={
                                    <BusinessDetails />
                                } />
                                <Route path='/business/:id/update-details' element={
                                    <UpdateBusinessDetails />
                                } />
                                <Route path='/sales/add' element={
                                    <AddSale />
                                } />
                                <Route path='/sales/list' element={
                                    <SalesList />
                                } />
                                <Route path='/sales/:id/details' element={
                                    <SalesDetails />
                                } />
                                <Route path='/supplies/add' element={
                                    <AddSupply />
                                } />
                                <Route path='/supplies/list' element={
                                    <SuppliesList />
                                } />
                                <Route path='/supplies/:id/details' element={
                                    <SuppliesDetails />
                                } />
                                <Route path='/income/add' element={
                                    <AddIncome />
                                } />
                                <Route path='/income/list' element={
                                    <Income />
                                } />
                                <Route path='/income/:id/details' element={
                                    <IncomeDetails />
                                } />
                                <Route path='/income/:id/update-details' element={
                                    <UpdateIncomeDetails />
                                } />
                                <Route path='/expense/add' element={
                                    <AddExpense />
                                } />
                                <Route path='/expense/list' element={
                                    <Expense />
                                } />
                                <Route path='/expense/:id/details' element={
                                    <ExpenseDetails />
                                } />
                                <Route path='/expense/:id/update-details' element={
                                    <UpdateExpenseDetails />
                                } />
                                <Route path='/customers/new' element={
                                    <AddCustomer />
                                } />
                                <Route path='/customers/list' element={
                                    <CustomersList />
                                } />
                                <Route path='/customers/:id/details' element={
                                    <CustomerDetails />
                                } />
                                <Route path='/customers/:id/update-details' element={
                                    <UpdateCustomerDetails />
                                } />
                                <Route path='/supplier/new' element={
                                    <AddSupplier />
                                } />
                                <Route path='/suppliers/list' element={
                                    <SuppliersList />
                                } />
                                <Route path='/suppliers/:id/details' element={
                                    <SupplierDetails />
                                } />
                                <Route path='/suppliers/:id/update-details' element={
                                    <UpdateSupplierDetails />
                                } />
                                <Route path='/category/new' element={
                                    <NewCategory />
                                } />
                                <Route path='/categories/list' element={
                                    <CategoriesList />
                                } />
                                <Route path='/categories/:id/details' element={
                                    <CategoryDetails />
                                } />
                                <Route path='/categories/:id/update-details' element={
                                    <UpdateCategories />
                                } />
                                <Route path='/product/new' element={
                                    <AddProduct />
                                } />
                                <Route path='/products/list' element={
                                    <ProductsList />
                                } />
                                <Route path='/products/:id/details' element={
                                    <ProductDetails />
                                } />
                                <Route path='/products/:id/update-details' element={
                                    <UpdateProductDetails />
                                } />
                                <Route path='/employee/new' element={
                                    <NewEmployee />
                                } />
                                <Route path='/employees/list' element={

                                    <EmployeesList />
                                } />
                                <Route path='/employee/:id/details' element={
                                    <EmployeeDetails />
                                } />
                                <Route path='/employee/:id/update-details' element={
                                    <EmployeeUpdateDetails />
                                } />
                                <Route path='/employee/pay' element={

                                    <PayEmployee />
                                } />
                                <Route path='/employees/salaries' element={

                                    <EmployeesSalaries />
                                } />
                                <Route path='/employees/salaries/:id/details' element={

                                    <SalariesDetails />
                                } />
                                <Route path='/employees/salaries/:id/update-details' element={
                                    <UpdateSalariesDetails />
                                } />
                            </Route>





                        </Routes>
                    </div>

                </Main>
            </Suspense>

        </div>



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
        height: "100vh"

    },
    content: {

        flexGrow: 1,
        height: 'auto',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}))


export default RoutesFile