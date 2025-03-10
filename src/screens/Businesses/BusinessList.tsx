import React, { useMemo } from 'react';
import './AddBusiness.css';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import NotFound from '../NotFoundPage/NotFound';
import BusinessIcon from '@mui/icons-material/Business';
import Table from '../../components/Table/Table';
import useGetBusinesses from '../../hooks/Businesses/useGetBusinesses';

const BusinessList = () => {
  const navigate = useNavigate();
  const { data: businesses, isLoading } = useGetBusinesses();
  const memoizedBusinesses = useMemo(() => {
    return businesses;
  }, [businesses]);
  const onView = (id: string | undefined) => {
    navigate(`/business/${id}/details`);
  };

  const onEdit = (id: string | undefined) => {
    navigate(`/business/${id}/update-details`);
  };

  const columns = [
    { header: 'Name', dataKey: 'name' },
    { header: 'Admin', dataKey: 'owner.name' },
    { header: 'Phone', dataKey: 'businessPhone' },
  ];
  if (isLoading) {
    return (
      <div className="text-center">
        <CircularProgress color="success" />
      </div>
    );
  }
  if (businesses?.length === 0) {
    return (
      <NotFound
        icon={<BusinessIcon />}
        title="business"
        link="/businesses/add"
      />
    );
  }

  return (
    <Table
      columns={columns}
      onEdit={onEdit}
      onView={onView}
      Business
      data={memoizedBusinesses}
    />
  );
};

export default BusinessList;
