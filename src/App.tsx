import RoutesFile from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GetForgotPasswordCode from './screens/Login/GetForgotPasswordCode';
import ResetPassword from './screens/Login/ResetPassword';
import VerifyPhone from './screens/Login/VerifyPhone';
import ResendCode from './screens/Login/ResendCode';
import LoginPage from './screens/Login/LoginPage';
import SignUpPage from './screens/Login/SignUpPage';
import PaymentPlan from './screens/Payments/PaymentPlan';
import Payment from './screens/Payments/Payment';
import moment from 'moment';
import useAuthToken from './hooks/common/useAuthToken';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const { token } = useAuthToken();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [timeOfDay, setTimeOfDay] = useState<string>('');

  useEffect(() => {
    // Check if the dialog has been displayed
    const hasSeenDialog = localStorage.getItem('hasSeenDialog');

    // If not, show the dialog and set the flag in localStorage
    if (!hasSeenDialog) {
      setIsDialogOpen(true);
      localStorage.setItem('hasSeenDialog', 'true');
    }
    const checkFreeTrialExpiration = () => {
      if (token !== null) {
        const thirtyDaysLater = new Date(token.user.freeTrialStartDate);
        thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
        setExpiryDate(moment(thirtyDaysLater).format('MMM Do YYYY'));

        if (new Date() >= thirtyDaysLater) {
          // Free trial has expired, update user's subscriptionType
          token.user.subscriptionType = 'inactive';
        }
      }
    };
    checkFreeTrialExpiration();
    const determineTimeOfDay = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 0 && currentHour < 12) {
        setTimeOfDay('morning');
      } else if (currentHour >= 12 && currentHour < 18) {
        setTimeOfDay('afternoon');
      } else {
        setTimeOfDay('evening');
      }
    };

    determineTimeOfDay();
  }, [token]);

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  return (
    <React.Fragment>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isDialogOpen && token?.user.subscriptionType === 'free-trial' && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-md z-10 relative">
            <h2 className="text-2xl font-bold mb-4">Free Trial Notice</h2>
            <p className="mb-3">
              Good {timeOfDay} {token.user.name}
            </p>
            <p className="mb-6">
              Your free trial expires on {expiryDate} . Take advantage of all
              the features during this period.
            </p>
            <button
              onClick={handleClose}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/payment/plans" element={<PaymentPlan />} />
        <Route path="/payment" element={<Payment />} />
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
  );
};

export default App;
