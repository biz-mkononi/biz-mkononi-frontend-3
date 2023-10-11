import React, {useMemo} from 'react';
import '../Businesses/AddBusiness.css';
import {getCategory} from '../../Data/Categories/Data';
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '../../components/Table/Table';
import {useQuery} from '@tanstack/react-query';
type Categories = {
  name: string;
};
const CategoriesList = ({id}: any) => {
  const navigate = useNavigate();
  const {data: categories, isLoading} = useQuery<Categories[] | any, Error>({
    queryKey: ['categories', id],
    queryFn: () => getCategory(id),
  });
  const memoizedCategories = useMemo(() => {
    return categories;
  }, [categories]);
  const onView = (id: string | undefined) => {
    navigate(`/categories/${id}/details`);
  };
  const onEdit = (id: string | undefined) => {
    navigate(`/categories/${id}/update-details`);
  };
  const columns = [{header: 'Name', dataKey: 'name'}];
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <Table
          columns={columns}
          data={memoizedCategories}
          onEdit={onEdit}
          onView={onView}
        />
      )}
    </>
  );
};

export default CategoriesList;
