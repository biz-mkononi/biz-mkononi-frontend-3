import React, {useMemo} from 'react';
import '../Businesses/AddBusiness.css';
import {getSuppliers} from '../../Data/Suppliers/Data';
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '../../components/Table/Table';
import {useQuery} from '@tanstack/react-query';
type Suppliers = {
  name: string;
  email: string;
  phone: string;
};
// eslint-disable-next-line
const SuppliersList = ({id}: any) => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const {data: suppliers, isLoading} = useQuery<Suppliers[] | any, Error>({
    queryKey: ['suppliers', id],
    queryFn: () => getSuppliers(id),
  });

  const memoizedSuppliers = useMemo(() => {
    return suppliers;
  }, [suppliers]);

  const onView = (id: string | undefined) => {
    navigate(`/suppliers/${id}/details`);
  };
  const onEdit = (id: string | undefined) => {
    navigate(`/suppliers/${id}/update-details`);
  };
  const columns = [
    {header: 'Name', dataKey: 'name'},
    {header: 'Email', dataKey: 'email'},
    {header: 'Phone', dataKey: 'phone'},
  ];

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <Table
          columns={columns}
          onEdit={onEdit}
          onView={onView}
          data={memoizedSuppliers}
        />
      )}
    </>
  );
};

export default SuppliersList;
