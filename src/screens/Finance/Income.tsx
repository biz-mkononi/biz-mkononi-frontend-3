import React, {useMemo} from 'react';
import '../Businesses/AddBusiness.css';
import {useNavigate} from 'react-router-dom';
import {getIncomes} from '../../Data/Incomes/Data';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '../../components/Table/Table';
import {useQuery} from '@tanstack/react-query';
type Incomes = {
  title: string;
  txDate: Date;
  amount: string;
};
// eslint-disable-next-line
const Income = ({id}: any) => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const {data: incomes, isLoading} = useQuery<Incomes[] | any, Error>({
    queryKey: ['incomes', id],
    queryFn: () => getIncomes(id),
  });
  const memoizedIncomes = useMemo(() => {
    return incomes;
  }, [incomes]);

  const onView = (id: string | undefined) => {
    navigate(`/income/${id}/details`);
  };
  const onEdit = (id: string | undefined) => {
    navigate(`/income/${id}/update-details`);
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
          data={memoizedIncomes}
          onEdit={onEdit}
          onView={onView}
        />
      )}
    </>
  );
};

export default Income;
