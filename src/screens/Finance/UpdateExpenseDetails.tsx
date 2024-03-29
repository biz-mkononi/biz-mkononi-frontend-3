import React, {useEffect, useState} from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import '../Businesses/AddBusiness.css';
import {useNavigate, useParams} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import Stack from '@mui/material/Stack';
import {Card} from '@mui/material';
import dayjs, {Dayjs} from 'dayjs';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {getSingleExpense, updateSingleExpense} from '../../Data/Expenses/Data';
import FormsLayout from '../../Layout/FormsLayout';

interface data {
  name: '';
  email: '';
  phone: '';
  description: '';
}
// eslint-disable-next-line
const UpdateExpenseDetails = ({id}: any) => {
  // eslint-disable-next-line
  const [data, setData] = useState<data | any>({});
  const [isLoading, setIsloading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
// eslint-disable-next-line
  const [value, setValue] = React.useState<Dayjs | any>(dayjs(data.txData));
// eslint-disable-next-line
  const handleDateChange = (newValue: Dayjs | any) => {
    setValue(newValue);
    setFormData({...formData, ['txDate']: newValue});
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSingleExpense(formData, params.id, navigate, setIsUpdating, id);
  };

  const params = useParams();

  useEffect(() => {
    getSingleExpense(setData, params.id, setIsloading, setFormData, id);
  }, [location]);

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <FormsLayout title="Expense" update>
          <Card className="p-3">
            <form onSubmit={onSubmit}>
              <label htmlFor="basic-url" className="form-label ">
                Title
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <BusinessIcon />
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  defaultValue={data.title}
                  name="title"
                  className="form-control"
                  placeholder="name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <label htmlFor="basic-url" className="form-label ">
                Amount (Ksh)
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <BusinessIcon />
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  defaultValue={data.amount}
                  name="amount"
                  className="form-control"
                  placeholder="amount"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack className="mb-3" spacing={3}>
                  <label htmlFor="basic-url" className="form-label ">
                    Transaction Date
                  </label>

                  <DateTimePicker
                    label="Date&Time picker"
                    value={value}
                    onChange={handleDateChange}
                  />
                </Stack>
              </LocalizationProvider>
              <label htmlFor="basic-url" className="form-label ">
                Description
              </label>
              <div className="input-group mb-3">
                <textarea
                  className="form-control"
                  onChange={handleDescriptionChange}
                  defaultValue={data.description}
                  name="description"
                  aria-label="With textarea"></textarea>
              </div>

              <div className="text-center mt-3">
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  disabled={isUpdating ? true : false}>
                  {isUpdating ? 'updating' : 'Update Expense'}
                </button>
              </div>
            </form>
          </Card>
        </FormsLayout>
      )}
    </>
  );
};

export default UpdateExpenseDetails;
