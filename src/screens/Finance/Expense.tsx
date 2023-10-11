import React, {useMemo} from 'react';
import '../Businesses/AddBusiness.css';
import {useNavigate} from 'react-router-dom';
import {getExpenses} from '../../Data/Expenses/Data';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '../../components/Table/Table';
import {useQuery} from '@tanstack/react-query';

type Expenses = {
  title: string;
  txDate: Date;
  amount: string;
};
const Expense = ({id}: any) => {
  const navigate = useNavigate();
  const {data: expenses, isLoading} = useQuery<Expenses[] | any, Error>({
    queryKey: ['expenses', id],
    queryFn: () => getExpenses(id),
  });
  const memoizedExpenses = useMemo(() => {
    return expenses;
  }, [expenses]);
  const onView = (id: string | undefined) => {
    navigate(`/expense/${id}/details`);
  };
  const onEdit = (id: string | undefined) => {
    navigate(`/expense/${id}/update-details`);
  };
  const columns = [
    {header: 'Title', dataKey: 'title'},
    {header: 'Transaction Date', dataKey: 'txDate'},
    {header: 'Amount', dataKey: 'amount'},
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
          data={memoizedExpenses}
          onEdit={onEdit}
          onView={onView}
        />
      )}
    </>
  );
};

export default Expense;
