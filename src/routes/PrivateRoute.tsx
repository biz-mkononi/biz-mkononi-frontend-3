import React from 'react'
import {useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {DataContext} from '../context/ContextProvider';

const PrivateRoute: React.FC = () => {
  const {loggedUser} = useContext(DataContext);

  if (!loggedUser) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
