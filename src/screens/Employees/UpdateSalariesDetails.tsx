import React, {useEffect, useState} from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import {Card} from '@mui/material';
import '../Businesses/AddBusiness.css';
import {useNavigate, useParams} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import dayjs, {Dayjs} from 'dayjs';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {getEmployees} from '../../Data/Employees/Data';
import {getSingleSalary, updateSingleSalary} from '../../Data/Salaries/Data';
import FormsLayout from '../../Layout/FormsLayout';
import { useQuery } from '@tanstack/react-query';

interface data {
  name: '';
  email: '';
  phone: '';
  description: '';
}
type Employees = {
  name: string;
  position: string;
  phone: string;
  email: string;
  idNumber: string;
}
// eslint-disable-next-line
const UpdateSalariesDetails = ({id}: any) => {
  // eslint-disable-next-line
  const [data, setData] = useState<data | any>({});
  const [isLoading, setIsloading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  // eslint-disable-next-line
  const [currentEmployee, setCurrentEmployee] = useState<data | any>({});
  // eslint-disable-next-line
  const [value, setValue] = React.useState<Dayjs | any>(dayjs(data.txDate));
 // eslint-disable-next-line
const {data: employees} = useQuery<Employees[] | any, Error>({
    queryKey: ['employees', id],
    queryFn: () => getEmployees(id),
  });
  useEffect(() => {
    getSingleSalary(
      setData,
      params.id,
      setIsloading,
      setCurrentEmployee,
      setFormData,
      id
    );
  }, []);
  // eslint-disable-next-line
  const handleDateChange = (newValue: Dayjs | any) => {
    setValue(newValue);
    setFormData({...formData, ['txDate']: newValue});
  };
  const navigate = useNavigate();

  const params = useParams();
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    console.log(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSingleSalary(formData, navigate, params.id, setIsUpdating, id);
  };
  console.log(formData);
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <FormsLayout title="Salary" update>
          <Card className="p-3">
            <form onSubmit={onSubmit}>
              <label htmlFor="basic-url" className="form-label">
                Employee
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <PhoneIcon />
                </span>
                <select
                  className="form-select"
                  onChange={handleTypeChange}
                  name="employeeId"
                  aria-label="Default select example"
                  id="basic-addon1">
                  <option selected>{currentEmployee.name}</option>
                  {
                    // eslint-disable-next-line
                  employees.map((employee:any) => {
                    return (
                      <option value={employee.id} key={employee.id}>
                        {employee.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack className="mb-3" spacing={3}>
                  <label htmlFor="basic-url" className="form-label ">
                    Date
                  </label>

                  <DateTimePicker
                    label="Date"
                    value={value}
                    onChange={handleDateChange}
                  />
                </Stack>
              </LocalizationProvider>

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
                  {isUpdating ? 'Updating' : 'Update Salary'}
                </button>
              </div>
            </form>
          </Card>
        </FormsLayout>
      )}
    </>
  );
};

export default UpdateSalariesDetails;
