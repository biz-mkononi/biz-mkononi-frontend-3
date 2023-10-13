import React, {useState, useEffect} from 'react';
import image2 from '../../Assets/placeholder.jpg';
import '../Businesses/AddBusiness.css';
import {deleteProduct, getSingleProduct} from '../../Data/Products/Data';
import {useNavigate, useParams} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AlertDialog from '../Dialog/Dialog';

interface data {
  name: '';
  // eslint-disable-next-line
  category: {};
  productType: '';
  size: '';
  unit: '';
  buyingPrice: '';
  sellingPrice: '';
  stock: '';
}
// eslint-disable-next-line
const ProductDetails = ({id}: any) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [data, setData] = useState<data | any>({});
  const [isLoading, setIsloading] = useState(false);
  // eslint-disable-next-line
  const [category, setCategory] = useState<data | any>({});
  // eslint-disable-next-line
  const [formData, setFormData] = useState(false);

  const params = useParams();
  useEffect(() => {
    getSingleProduct(
      setData,
      params.id,
      setIsloading,
      setCategory,
      setFormData,
      id
    );
  }, [location]);
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
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="container p-3">
          {open ? (
            <AlertDialog
              open={open}
              handleClose={handleClose}
              title={data.name}
              handleDelete={handleDelete}
            />
          ) : (
            ''
          )}
          <div className="row padding">
            <div className="col-lg-6">
              <h2 className="mb-4">{data.name}</h2>
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
                src={data.imageUrl === null ? image2 : data.imageUrl}
              />
            </div>

            <div className="col-lg-6">
              <table className="table mt-3">
                <>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{data.name}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td>{category.name}</td>
                    </tr>

                    <tr>
                      <th>Size</th>
                      <td>{data.size}</td>
                    </tr>
                    <tr>
                      <th>Unit</th>
                      <td>{data.unit}</td>
                    </tr>
                    <tr>
                      <th>Buying Price</th>
                      <td>{data.buyingPrice}</td>
                    </tr>
                    <tr>
                      <th>Selling Price</th>
                      <td>{data.sellingPrice}</td>
                    </tr>
                    <tr>
                      <th>Stock</th>
                      <td>{data.stock}</td>
                    </tr>
                  </tbody>
                </>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
