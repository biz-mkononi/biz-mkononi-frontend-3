import React, {useMemo} from 'react';
import '../Businesses/AddBusiness.css';
import {getSalaries} from '../../Data/Salaries/Data';
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '../../components/Table/Table';
import {useQuery} from '@tanstack/react-query';
type Employee = {
  name: string;
  position: string;
};
type Salaries = {
  employee: Employee;
  txDate: Date;
  amount: string;
};
// eslint-disable-next-line
const EmployeesSalaries = ({id}: any) => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const {data: salaries, isLoading} = useQuery<Salaries[] | any, Error>({
    queryKey: ['salaries', id],
    queryFn: () => getSalaries(id),
  });
  const memoizedSalaries = useMemo(() => {
    return salaries;
  }, [salaries]);

  const onView = (id: string | undefined) => {
    navigate(`/employees/salaries/${id}/details`);
  };
  const onEdit = (id: string | undefined) => {
    navigate(`/employees/salaries/${id}/update-details`);
  };
  const columns = [
    {header: 'Employee', dataKey: 'employee.name'},
    {header: 'Payment Date', dataKey: 'txDate'},
    {header: 'Amount', dataKey: 'amount'},
    {header: 'Position', dataKey: 'employee.position'},
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
          data={memoizedSalaries}
        />
      )}
    </>
  );
};

export default EmployeesSalaries;
