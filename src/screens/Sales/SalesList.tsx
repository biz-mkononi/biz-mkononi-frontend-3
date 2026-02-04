import React, {useMemo} from 'react';
import '../Businesses/AddBusiness.css';
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {getSales} from '../../Data/Sales/Data';
import Table from '../../components/Table/Table';
import {useQuery} from '@tanstack/react-query';
type Customer = {
  name: string;
  phone: string;
};
type Sales = {
  createdAt: Date;
  amountPaid: string;
  amountCharged: string;
  customer: Customer;
};
// eslint-disable-next-line
const SalesList = ({id}: any) => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const {data: sales, isLoading} = useQuery<Sales[] | any, Error>({
    queryKey: ['sales', id],
    queryFn: () => getSales(id),
  });
  const memoizedSales = useMemo(() => {
    return sales;
  }, [sales]);
  const onView = (id: string | undefined) => {
    navigate(`/sales/${id}/details`);
  };
  const onEdit = (id: string | undefined) => {
    navigate(`/sales/${id}/update-details`);
  };
  const columns = [
    {header: 'Date', dataKey: 'createdAt'},
    {header: 'Customer Name', dataKey: 'customer.name'},
    {header: 'Customer Phone', dataKey: 'customer.phone'},
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
        sale
          columns={columns}
          data={memoizedSales}
          onEdit={onEdit}
          onView={onView}
        />
      )}
    </>
  );
};

export default SalesList;
