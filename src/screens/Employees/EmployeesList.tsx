import React, {useMemo} from 'react';
import '../Businesses/AddBusiness.css';
import {getEmployees} from '../../Data/Employees/Data';
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '../../components/Table/Table';
import {useQuery} from '@tanstack/react-query';
type Employees = {
  name: string;
  position: string;
  phone: string;
  email: string;
  idNumber: string;
};
const EmployeesList = ({id}: any) => {
  const navigate = useNavigate();
  const {data: employees, isLoading} = useQuery<Employees[] | any, Error>({
    queryKey: ['employees', id],
    queryFn: () => getEmployees(id),
  });

  const memoizedEmployees = useMemo(() => {
    return employees;
  }, [employees]);
  const columns = [
    {header: 'Name', dataKey: 'name'},
    {header: 'Position', dataKey: 'position'},
    {header: 'Email', dataKey: 'email'},
    {header: 'Phone', dataKey: 'phone'},
    {header: 'ID number', dataKey: 'idNumber'},
  ];
  const onView = (id: string | undefined) => {
    navigate(`/employee/${id}/details`);
  };
  const onEdit = (id: string | undefined) => {
    navigate(`/employee/${id}/update-details`);
  };
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
          data={memoizedEmployees}
        />
      )}
    </>
  );
};

export default EmployeesList;
