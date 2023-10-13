import React, {useMemo} from 'react';
import '../Businesses/AddBusiness.css';
import {getProducts} from '../../Data/Products/Data';
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '../../components/Table/Table';
import {useQuery} from '@tanstack/react-query';

type Category = {
  name: string;
};
type Products = {
  name: string;
  category: Category;
  size: string;
  stock: string;
};
// eslint-disable-next-line
const ProductsList = ({id}: any) => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const {data: products, isLoading} = useQuery<Products[] | any, Error>({
    queryKey: ['products', id],
    queryFn: () => getProducts(id),
  });
  const memoizedProducts = useMemo(() => {
    return products;
  }, [products]);
  const onView = (id: string | undefined) => {
    navigate(`/products/${id}/details`);
  };
  const onEdit = (id: string | undefined) => {
    navigate(`/products/${id}/update-details`);
  };
  const columns = [
    {header: 'Name', dataKey: 'name'},
    {header: 'Category', dataKey: 'category.name'},
    {header: 'Size', dataKey: 'size'},
    {header: 'Stock', dataKey: 'stock'},
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
          data={memoizedProducts}
          onEdit={onEdit}
          onView={onView}
        />
      )}
    </>
  );
};

export default ProductsList;
