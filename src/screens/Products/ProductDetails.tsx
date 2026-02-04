import React, {useState} from 'react';
import image2 from '../../Assets/placeholder.jpg';
import '../Businesses/AddBusiness.css';
import {deleteProduct, getSingleProduct} from '../../Data/Products/Data';
import {useNavigate, useParams} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AlertDialog from '../Dialog/Dialog';
import { useQuery } from '@tanstack/react-query';

type Categories = {
  name: string;
};
// eslint-disable-next-line
const ProductDetails = ({id}: any) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [setIsloading] = useState(false);

  const params = useParams();
  // eslint-disable-next-line
  const {data: products,isLoading:productsLoading} = useQuery<Categories[] | any, Error>({
    queryKey: ['single',params.id,id],
    queryFn: () => getSingleProduct(params.id,id),
  });
  const onDelete = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    deleteProduct(navigate, params.id, setIsloading, id);
    setOpen(false);
  };
  if (productsLoading) {
   return <div className="text-center">
          <CircularProgress color="success" />
        </div>
  }
  return (

        <div className="container p-3">
          {open ? (
            <AlertDialog
              open={open}
              handleClose={handleClose}
              title={products.name}
              handleDelete={handleDelete}
            />
          ) : (
            ''
          )}
          <div className="row padding">
            <div className="col-lg-6">
              <h2 className="mb-4">{products.name}</h2>
            </div>
          </div>
          <div className="row padding">
            <div className="col-lg-6">
              <div className="details-button" style={{display: 'flex'}}>
                <button
                  className="btn btn-secondary btn-md"
                  onClick={() => navigate(-1)}>
                  {' '}
                  Back
                </button>
                <button
                  className="btn btn-warning btn-md"
                  onClick={() =>
                    navigate(`/products/${params.id}/update-details`)
                  }>
                  {' '}
                  Update
                </button>
                <button className="btn btn-danger btn-md" onClick={onDelete}>
                  {' '}
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="row padding">
            <div className="col-lg-6">
              <img
                className="business-details-image "
                src={products.imageUrl === null ? image2 : products.imageUrl}
              />
            </div>

            <div className="col-lg-6">
              <table className="table mt-3">
                <>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{products.name}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td>{products.category.name}</td>
                    </tr>

                    <tr>
                      <th>Size</th>
                      <td>{products.size}</td>
                    </tr>
                    <tr>
                      <th>Unit</th>
                      <td>{products.unit}</td>
                    </tr>
                    <tr>
                      <th>Buying Price</th>
                      <td>{products.buyingPrice}</td>
                    </tr>
                    <tr>
                      <th>Selling Price</th>
                      <td>{products.sellingPrice}</td>
                    </tr>
                    <tr>
                      <th>Stock</th>
                      <td>{products.stock}</td>
                    </tr>
                  </tbody>
                </>
              </table>
            </div>
          </div>
        </div>

  );
};

export default ProductDetails;
