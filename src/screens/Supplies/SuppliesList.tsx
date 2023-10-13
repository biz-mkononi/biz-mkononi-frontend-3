import React, {useMemo} from 'react';
import '../Businesses/AddBusiness.css';
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {getSupplies} from '../../Data/Supplies/Data';
import Table from '../../components/Table/Table';
import {useQuery} from '@tanstack/react-query';
type Supplier = {
  name: string;
  phone: string;
};
type Supplies = {
  createdAt: Date;
  amountPaid: string;
  amountCharged: string;
  supplier: Supplier;
};
// eslint-disable-next-line
const SuppliesList = ({id}: any) => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const {data: supplies, isLoading} = useQuery<Supplies[] | any, Error>({
    queryKey: ['supplies', id],
    queryFn: () => getSupplies(id),
  });
  const memoizedSupplies = useMemo(() => {
    return supplies;
  }, [supplies]);
  const onView = (id: string | undefined) => {
    navigate(`/supplies/${id}/details`);
  };
  const onEdit = (id: string | undefined) => {
    navigate(`/supplies/${id}/update-details`);
  };
  const columns = [
    {header: 'Date', dataKey: 'createdAt'},
    {header: 'Supplier Name', dataKey: 'supplier.name'},
    {header: 'Supplier Phone', dataKey: 'supplier.phone'},
    {header: 'Amount Charged', dataKey: 'amountPaid'},
    {header: 'Amount Paid', dataKey: 'amountCharged'},
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
          data={memoizedSupplies}
          onEdit={onEdit}
          onView={onView}
        />
      )}
    </>
  );
};

export default SuppliesList;
