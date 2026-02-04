import React from 'react';
import { Lock, CreditCard, Check, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthToken from '../../hooks/common/useAuthToken';
import { logout } from '../../components/sidebar/AppBar';

const InactiveAccountPage = () => {
  const navigate = useNavigate();
  const { token } = useAuthToken();
  const benefits = [
    'Full access to all premium features',
    'Priority customer support',
    'Advanced analytics and insights',
    'Unlimited usage',
  ];

  const handleActivateAccount = () => {
    navigate(`/payments/${token?.user.id}`);
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        window.location.assign('/auth/login');
      })
      .catch((error) => {
        console.error('An error occurred during logout:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Logout Button */}
      <div className="max-w-2xl mx-auto mb-4">
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6">
            <Lock className="w-12 h-12 text-[#3282b8]" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">
            Your Account is Inactive
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            To continue enjoying our services, please activate your
            subscription. Choose a plan that works best for you and get instant
            access to all features.
          </p>

          {/* Benefits Card */}
          <div className="w-full bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              What You will Get
            </h2>

            <div className="mb-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 mb-4 text-left"
                >
                  <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Pricing Card */}
            <div className="bg-blue-50 border-2 border-[#3282b8] rounded-lg p-6 mt-6">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-[#3282b8]">
                    Premium Plan
                  </h3>
                  <p className="text-sm text-gray-600">Billed monthly</p>
                </div>
                <div className="text-4xl font-bold text-[#3282b8]">KES 199</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <button
            onClick={handleActivateAccount}
            className="bg-[#3282b8] hover:bg-[#2a6a96] text-white font-semibold text-lg py-3 px-8 rounded-lg flex items-center gap-2 transition-colors mb-3"
          >
            <CreditCard className="w-5 h-5" />
            Activate Your Account
          </button>

          <p className="text-sm text-gray-500">
            Secure payment • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default InactiveAccountPage;
