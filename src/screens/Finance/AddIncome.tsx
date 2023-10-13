import React, {useState} from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import {Card} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {addIncome} from '../../Data/Incomes/Data';
import dayjs, {Dayjs} from 'dayjs';
import FormsLayout from '../../Layout/FormsLayout';
import Input from '../../components/FormFields/Input';
import DateField from '../../components/FormFields/DateField';
import TextArea from '../../components/FormFields/TextArea';
// eslint-disable-next-line
const AddIncome = ({id}: any) => {
  const navigate = useNavigate();
  const initialState = {title: '', amount: '', txDate: '', description: ''};
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
// eslint-disable-next-line
  const [value, setValue] = React.useState<Dayjs | any>(dayjs(Date.now()));
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
    addIncome(formData, setIsLoading, navigate, id);
  };

  return (
    <FormsLayout title="Income">
      <Card className="p-3">
        <form onSubmit={onSubmit}>
          <Input
            icon={<BusinessIcon />}
            label="Title"
            handleChange={handleChange}
            name="title"
            placeholder="title"
            type="text"
          />
          <Input
            icon={<BusinessIcon />}
            label="Amount (Ksh)"
            handleChange={handleChange}
            name="amount"
            placeholder="amount"
            type="text"
          />
          <DateField
            label="Transaction Date"
            handleDateChange={handleDateChange}
            value={value}
            type="Date&Time picker"
          />
          <TextArea handleDescriptionChange={handleDescriptionChange} />
          <div className="text-center mt-3">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLoading ? true : false}>
              {isLoading ? 'Adding' : 'Add Income'}
            </button>
          </div>
        </form>
      </Card>
    </FormsLayout>
  );
};

export default AddIncome;
