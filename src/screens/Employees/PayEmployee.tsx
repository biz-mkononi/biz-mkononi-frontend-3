import React, {useState, useEffect} from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import {Card} from '@mui/material';
import {addSalary} from '../../Data/Salaries/Data';
import {useNavigate} from 'react-router-dom';
import {getEmployees} from '../../Data/Employees/Data';
import dayjs, {Dayjs} from 'dayjs';
import FormsLayout from '../../Layout/FormsLayout';
import Input from '../../components/FormFields/Input';
import TextArea from '../../components/FormFields/TextArea';
import DateField from '../../components/FormFields/DateField';
const PayEmployee = ({id}: any) => {
  const navigate = useNavigate();
  const initialState = {
    employeeId: '',
    amount: '',
    txDate: '',
    description: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [value, setValue] = React.useState<Dayjs | any>(dayjs(Date.now()));

  useEffect(() => {
    getEmployees(setEmployees, setIsLoading, id);
  }, []);
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
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSalary(formData, navigate, setIsLoading, id);
  };
  return (
    <FormsLayout title="Salary">
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
              <option selected>Select employee</option>
              {employees.map((employee) => {
                return (
                  <option value={employee.id} key={employee.id}>
                    {employee.name}
                  </option>
                );
              })}
            </select>
          </div>
          <DateField
            label="Date"
            handleDateChange={handleDateChange}
            value={value}
            type="Date"
          />
          <Input
            icon={<BusinessIcon />}
            label="Amount (Ksh)"
            handleChange={handleChange}
            name="amount"
            placeholder="amount"
            type="text"
          />
          <TextArea handleDescriptionChange={handleDescriptionChange} />

          <div className="text-center mt-3">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLoading ? true : false}>
              {isLoading ? 'Adding' : 'Add Salary'}
            </button>
          </div>
        </form>
      </Card>
    </FormsLayout>
  );
};

export default PayEmployee;
