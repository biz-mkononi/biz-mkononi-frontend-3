import React, { Suspense, lazy, useContext, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { useTheme } from '@mui/material/styles';
import { DataContext } from '../context/ContextProvider';
import Box from '@mui/material/Box';
import Sidebar from '../components/sidebar/Sidebar';
import useAuthToken from '../hooks/common/useAuthToken';
import { CircularProgress, CssBaseline, Toolbar } from '@mui/material';
import AppMenuBar from '../components/sidebar/AppBar';
import useSubscriptionStatus from '../hooks/common/useGetSubscriptionStatus';
import InactiveAccountPage from '../screens/Payments/InactiveAccountPage';
import PaymentPage from '../screens/Payments/PaymentPage';

const RoutesFile = () => {
  const { data, isLoading } = useSubscriptionStatus();

  const ProductDetails = lazy(
    () => import('../screens/Products/ProductDetails'),
  );
  const UpdateProductDetails = lazy(
    () => import('../screens/Products/UpdateProductDetails'),
  );
  const OverviewScreen = lazy(() => import('../screens/Insights/Overview'));
  const SalesInsightsScreen = lazy(
    () => import('../screens/Insights/SalesInsights'),
  );
  const CustomersInsightsScreen = lazy(
    () => import('../screens/Insights/CustomersInsights'),
  );
  const ChurnRateInsightsScreen = lazy(
    () => import('../screens/Insights/ChurnRateInsights'),
  );
  const AddBusiness = lazy(() => import('../screens/Businesses/AddBusiness'));
  const AddSale = lazy(() => import('../screens/Sales/AddSale'));
  const CustomersList = lazy(
    () => import('../screens/customers/CustomersList'),
  );
  const AddCustomer = lazy(() => import('../screens/customers/NewCustomer'));
  const AddSupplier = lazy(() => import('../screens/suppliers/NewSupplier'));
  const SuppliersList = lazy(
    () => import('../screens/suppliers/SuppliersList'),
  );
  const BusinessList = lazy(() => import('../screens/Businesses/BusinessList'));
  const NewCategory = lazy(() => import('../screens/Products/NewCategory'));
  const CategoriesList = lazy(
    () => import('../screens/Products/CategoriesList'),
  );
  const AddProduct = lazy(() => import('../screens/Products/AddProduct'));
  const ProductsList = lazy(() => import('../screens/Products/ProductList'));
  const NewEmployee = lazy(() => import('../screens/Employees/NewEmployee'));
  const EmployeesList = lazy(
    () => import('../screens/Employees/EmployeesList'),
  );
  const PayEmployee = lazy(() => import('../screens/Employees/PayEmployee'));
  const EmployeesSalaries = lazy(
    () => import('../screens/Employees/EmployeesSalaries'),
  );
  const BusinessDetails = lazy(
    () => import('../screens/Businesses/BusinessDetails'),
  );
  const UpdateBusinessDetails = lazy(
    () => import('../screens/Businesses/UpdateBusinessDetails'),
  );
  const UpdateSupplierDetails = lazy(
    () => import('../screens/suppliers/UpdateDetails'),
  );
  const SupplierDetails = lazy(
    () => import('../screens/suppliers/SupplierDetails'),
  );
  const CategoryDetails = lazy(
    () => import('../screens/Products/CategoryDetails'),
  );
  const UpdateCategories = lazy(
    () => import('../screens/Products/UpdateCategories'),
  );
  const CustomerDetails = lazy(
    () => import('../screens/customers/CustomerDetails'),
  );
  const UpdateCustomerDetails = lazy(
    () => import('../screens/customers/UpdateCustomerDetails'),
  );
  const EmployeeDetails = lazy(
    () => import('../screens/Employees/EmployeeDetails'),
  );
  const EmployeeUpdateDetails = lazy(
    () => import('../screens/Employees/EmployeeUpdateDetails'),
  );
  const UpdateSalariesDetails = lazy(
    () => import('../screens/Employees/UpdateSalariesDetails'),
  );
  const AddIncome = lazy(() => import('../screens/Finance/AddIncome'));
  const AddExpense = lazy(() => import('../screens/Finance/AddExpense'));
  const Income = lazy(() => import('../screens/Finance/Income'));
  const Expense = lazy(() => import('../screens/Finance/Expense'));
  const ExpenseDetails = lazy(
    () => import('../screens/Finance/ExpenseDetails'),
  );
  const IncomeDetails = lazy(() => import('../screens/Finance/IncomeDetails'));
  const UpdateExpenseDetails = lazy(
    () => import('../screens/Finance/UpdateExpenseDetails'),
  );
  const UpdateIncomeDetails = lazy(
    () => import('../screens/Finance/UpdateIncomeDetails'),
  );
  const SalesList = lazy(() => import('../screens/Sales/SalesList'));
  const SalesDetails = lazy(() => import('../screens/Sales/SalesDetails'));
  const SalariesDetails = lazy(
    () => import('../screens/Employees/SalariesDetails'),
  );
  const SuppliesList = lazy(() => import('../screens/Supplies/SuppliesList'));
  const SuppliesDetails = lazy(
    () => import('../screens/Supplies/SuppliesDetails'),
  );
  const AddSupply = lazy(() => import('../screens/Supplies/AddSupply'));
  const RevenueInsights = lazy(
    () => import('../screens/Insights/RevenueInsights'),
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  // eslint-disable-next-line
  const theme = useTheme();
  const { businessId } = useContext(DataContext);
  const { token } = useAuthToken();
  const drawerWidth = 270;
  const isInactive = data?.status === 'inactive';

  if (isLoading) {
    return (
      <div className="text-center">
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {token !== null && !isInactive && (
        <>
          <AppMenuBar
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
          />
          <Sidebar
            drawerWidth={drawerWidth}
            mobileOpen={mobileOpen}
            handleDrawerClose={handleDrawerClose}
            handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          />
        </>
      )}

      <Suspense
        fallback={
          <div className="flex justify-center items-center mt-3">
            <div
              className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-blue-600"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        {/* <AppBar/> */}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {!isInactive && <Toolbar />}
          <Routes>
            <Route path="/inactive-account" element={<InactiveAccountPage />} />
            <Route path="/payments/:id" element={<PaymentPage />} />
            <Route element={<PrivateRoute />}>
              {isInactive ? (
                <Route
                  path="*"
                  element={<Navigate to="/inactive-account" replace />}
                />
              ) : (
                <>
                  <Route
                    path="/insights/overview"
                    element={<OverviewScreen />}
                  />
                  <Route
                    path="/insights/sales"
                    element={<SalesInsightsScreen />}
                  />
                  <Route
                    path="/insights/customers"
                    element={<CustomersInsightsScreen />}
                  />
                  <Route
                    path="/insights/churn-rate"
                    element={<ChurnRateInsightsScreen />}
                  />
                  <Route
                    path="/insights/revenue"
                    element={<RevenueInsights />}
                  />
                  <Route path="/businesses/add" element={<AddBusiness />} />
                  <Route path="/" element={<BusinessList />} />
                  <Route
                    path="/business/:id/details"
                    element={<BusinessDetails />}
                  />
                  <Route
                    path="/business/:id/update-details"
                    element={<UpdateBusinessDetails />}
                  />
                  <Route
                    path="/sales/add"
                    element={<AddSale id={businessId} />}
                  />
                  <Route
                    path="/sales/list"
                    element={<SalesList id={businessId} />}
                  />
                  <Route
                    path="/sales/:id/details"
                    element={<SalesDetails id={businessId} />}
                  />
                  <Route
                    path="/supplies/add"
                    element={<AddSupply id={businessId} />}
                  />
                  <Route
                    path="/supplies/list"
                    element={<SuppliesList id={businessId} />}
                  />
                  <Route
                    path="/supplies/:id/details"
                    element={<SuppliesDetails id={businessId} />}
                  />
                  <Route
                    path="/income/add"
                    element={<AddIncome id={businessId} />}
                  />
                  <Route
                    path="/income/list"
                    element={<Income id={businessId} />}
                  />
                  <Route
                    path="/income/:id/details"
                    element={<IncomeDetails id={businessId} />}
                  />
                  <Route
                    path="/income/:id/update-details"
                    element={<UpdateIncomeDetails id={businessId} />}
                  />
                  <Route
                    path="/expense/add"
                    element={<AddExpense id={businessId} />}
                  />
                  <Route
                    path="/expense/list"
                    element={<Expense id={businessId} />}
                  />
                  <Route
                    path="/expense/:id/details"
                    element={<ExpenseDetails id={businessId} />}
                  />
                  <Route
                    path="/expense/:id/update-details"
                    element={<UpdateExpenseDetails id={businessId} />}
                  />
                  <Route
                    path="/customers/new"
                    element={<AddCustomer id={businessId} />}
                  />
                  <Route
                    path="/customers/list"
                    element={<CustomersList id={businessId} />}
                  />
                  <Route
                    path="/customers/:id/details"
                    element={<CustomerDetails id={businessId} />}
                  />
                  <Route
                    path="/customers/:id/update-details"
                    element={<UpdateCustomerDetails id={businessId} />}
                  />
                  <Route
                    path="/supplier/new"
                    element={<AddSupplier id={businessId} />}
                  />
                  <Route
                    path="/suppliers/list"
                    element={<SuppliersList id={businessId} />}
                  />
                  <Route
                    path="/suppliers/:id/details"
                    element={<SupplierDetails id={businessId} />}
                  />
                  <Route
                    path="/suppliers/:id/update-details"
                    element={<UpdateSupplierDetails id={businessId} />}
                  />
                  <Route
                    path="/category/new"
                    element={<NewCategory id={businessId} />}
                  />
                  <Route
                    path="/categories/list"
                    element={<CategoriesList id={businessId} />}
                  />
                  <Route
                    path="/categories/:id/details"
                    element={<CategoryDetails id={businessId} />}
                  />
                  <Route
                    path="/categories/:id/update-details"
                    element={<UpdateCategories id={businessId} />}
                  />
                  <Route
                    path="/product/new"
                    element={<AddProduct id={businessId} />}
                  />
                  <Route
                    path="/products/list"
                    element={<ProductsList id={businessId} />}
                  />
                  <Route
                    path="/products/:id/details"
                    element={<ProductDetails id={businessId} />}
                  />
                  <Route
                    path="/products/:id/update-details"
                    element={<UpdateProductDetails id={businessId} />}
                  />
                  <Route
                    path="/employee/new"
                    element={<NewEmployee id={businessId} />}
                  />
                  <Route
                    path="/employees/list"
                    element={<EmployeesList id={businessId} />}
                  />
                  <Route
                    path="/employee/:id/details"
                    element={<EmployeeDetails id={businessId} />}
                  />
                  <Route
                    path="/employee/:id/update-details"
                    element={<EmployeeUpdateDetails id={businessId} />}
                  />
                  <Route
                    path="/employee/pay"
                    element={<PayEmployee id={businessId} />}
                  />
                  <Route
                    path="/employees/salaries"
                    element={<EmployeesSalaries id={businessId} />}
                  />
                  <Route
                    path="/employees/salaries/:id/details"
                    element={<SalariesDetails id={businessId} />}
                  />
                  <Route
                    path="/employees/salaries/:id/update-details"
                    element={<UpdateSalariesDetails id={businessId} />}
                  />
                </>
              )}
            </Route>
          </Routes>
        </Box>
      </Suspense>
    </Box>
  );
};

export default RoutesFile;
