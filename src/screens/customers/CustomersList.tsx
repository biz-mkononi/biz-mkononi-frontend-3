import React, {useMemo, useState} from 'react';
import '../Businesses/AddBusiness.css';
import {getCustomers} from '../../Data/Customers/Data';
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import SmsDialog from './SmsDialog';
import Table from '../../components/Table/Table';
import {useQuery} from '@tanstack/react-query';

type Props = {
  // eslint-disable-next-line
  id: any;
};
type Customers = {
  name: string;
  gender: string;
  phone: string;
  email: string;
};
const CustomersList = ({id}: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const {data: customers, isLoading} = useQuery<Customers[] | any, Error>({
    queryKey: ['customers', id],
    queryFn: () => getCustomers(id),
  });
  const memoizedCustomers = useMemo(() => {
    return customers;
  }, [customers]);
  const onView = (id: string | undefined) => {
    navigate(`/customers/${id}/details`);
  };
  const onEdit = (id: string | undefined) => {
    navigate(`/customers/${id}/update-details`);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const columns = [
    {header: 'Name', dataKey: 'name'},
    {header: 'Gender', dataKey: 'gender'},
    {header: 'Phone', dataKey: 'phone'},
    {header: 'Email', dataKey: 'email'},
  ];
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="container p-3">
          {open ? (
            <SmsDialog open={open} id={id} handleClose={handleClose} />
          ) : (
            ''
          )}
          <div className="row padding">
            <div className="col-lg-6 col-sm-12 mb-3 mt-3">
              <h2 className="mb-4">Customers List</h2>
            </div>
            <div className="col-lg-6 col-sm-12 text-right mb-3 mt-3">
              <div
                className="details-button float-right"
                style={{display: 'flex'}}>
                <button
                  className="btn btn-secondary btn-md"
                  onClick={handleOpen}>
                  {' '}
                  Sms
                </button>
                <button
                  className="btn btn-info btn-md"
                  onClick={() => navigate(`/customers/new`)}>
                  {' '}
                  Add New
                </button>
              </div>
            </div>
          </div>
          <Table
            columns={columns}
            data={memoizedCustomers}
            onEdit={onEdit}
            onView={onView}
          />
        </div>
      )}
    </>
  );
};

export default CustomersList;
