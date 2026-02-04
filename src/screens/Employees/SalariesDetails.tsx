import React, {useState, useEffect} from 'react';
import '../Businesses/AddBusiness.css';
import {useNavigate, useParams} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AlertDialog from '../Dialog/Dialog';
import {deleteSalary, getSingleSalary} from '../../Data/Salaries/Data';

interface data {
  name: '';
  description: '';
  date: '';
}
// eslint-disable-next-line
const SalariesDetails = ({id}: any) => {
  const [open, setOpen] = useState(false);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const navigate = useNavigate()
  // eslint-disable-next-line
  const [data, setData] = useState<data | any>({});
  const [isLoading, setIsloading] = useState(false);
  // eslint-disable-next-line
  const [employee, setEmployee] = useState<data | any>({});
  // eslint-disable-next-line
  const [formData, setFormData] = useState(false);
  const params = useParams();
  const handleDelete = () => {
    deleteSalary(navigate, params.id, setIsloading, id);
    setOpen(false);
  };
  useEffect(() => {
    getSingleSalary(
      setData,
      params.id,
      setIsloading,
      setEmployee,
      setFormData,
      id
    );
  }, []);
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
              title="this salary"
              handleDelete={handleDelete}
            />
          ) : (
            ''
          )}
          <div className="row padding">
            <div className="col-lg-6">
              <h2 className="mb-4">{employee.name} salary details</h2>
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
                    navigate(`/employees/salaries/${params.id}/update-details`)
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
                  <th>Employee Name</th>
                  <td>{employee.name}</td>
                </tr>
                <tr>
                  <th>Employee Position</th>
                  <td>{employee.position}</td>
                </tr>
                <tr>
                  <th>Employee Email</th>
                  <td>{employee.email}</td>
                </tr>
                <tr>
                  <th>Employee Phone Number</th>
                  <td>{employee.phone}</td>
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

export default SalariesDetails;
