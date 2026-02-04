import React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import useAuthToken from '../hooks/common/useAuthToken';

const PrivateRoute: React.FC = () => {
  const {token} = useAuthToken()

  if (token === null) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
