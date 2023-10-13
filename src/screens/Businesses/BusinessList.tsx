import React, {useMemo} from 'react';
import './AddBusiness.css';
import {getBusiness} from '../../Data/Businesses/Data';
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import NotFound from '../NotFoundPage/NotFound';
import BusinessIcon from '@mui/icons-material/Business';
import Table from '../../components/Table/Table';
import {useQuery} from '@tanstack/react-query';

type Owner = {
  name: string;
};
type Business = {
  businessEmail: string;
  businessName: string;
  businessPhone: string;
  owner: Owner;
};
const BusinessList = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const {data: businesses, isLoading} = useQuery<Business[] | any, Error>({
    queryKey: ['businesses'],
    queryFn: () => getBusiness(),
  });
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
    {header: 'Name', dataKey: 'name'},
    {header: 'Admin', dataKey: 'owner.name'},
    {header: 'Phone', dataKey: 'businessPhone'},
  ];
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          {businesses?.length === 0 ? (
            <NotFound
              icon={<BusinessIcon />}
              title="business"
              link="/businesses/add"
            />
          ) : (
            <Table
              columns={columns}
              onEdit={onEdit}
              onView={onView}
              Business
              data={memoizedBusinesses}
            />
          )}
        </>
      )}
    </>
  );
};

export default BusinessList;
