import React, {useState, useEffect} from 'react';
import '../Businesses/AddBusiness.css';
import {useNavigate, useParams} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AlertDialog from '../Dialog/Dialog';
import {deleteExpense, getSingleExpense} from '../../Data/Expenses/Data';

interface data {
  name: '';
  description: '';
  date: '';
}
const ExpenseDetails = ({id}: any) => {
  const [open, setOpen] = useState(false);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const navigate = useNavigate();
  const [data, setData] = useState<data | any>({});
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({});

  const params = useParams();
  const handleDelete = () => {
    deleteExpense(navigate, params.id, setIsloading, id);
    setOpen(false);
  };
  useEffect(() => {
    getSingleExpense(setData, params.id, setIsloading, setFormData, id);
  }, [location]);
  const onDelete = () => {
    setOpen(true);
  };
  const handleClose = () => {
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
              title={data.title}
              handleDelete={handleDelete}
            />
          ) : (
            ''
          )}
          <div className="row padding">
            <div className="col-lg-6">
              <h2 className="mb-4">{data.title}</h2>
            </div>
          </div>
          <div className="row padding mb-4">
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
                    navigate(`/expense/${params.id}/update-details`)
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

          <table className="table mt-3">
            <>
              <tbody>
                <tr>
                  <th>Title</th>
                  <td>{data.title}</td>
                </tr>

                <tr>
                  <th>Amount</th>
                  <td>{data.amount}</td>
                </tr>

                <tr>
                  <th>Date</th>
                  <td>
                    {new Date(data.txDate).toLocaleDateString(
                      undefined,
                      options
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{data.description}</td>
                </tr>
              </tbody>
            </>
          </table>
        </div>
      )}
    </>
  );
};

export default ExpenseDetails;
