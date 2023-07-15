import React, { useState } from 'react'
import BusinessIcon from '@mui/icons-material/Business'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { Card } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { addIncome } from '../../Data/Incomes/Data'
import dayjs, { Dayjs } from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
const AddIncome = ({ id }: any) => {
  const navigate = useNavigate()
  const initialState = { title: '', amount: '', txDate: '', description: '' }
  const [formData, setFormData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)

  const [value, setValue] = React.useState<Dayjs | any>(dayjs(Date.now()))

  const handleDateChange = (newValue: Dayjs | any) => {
    setValue(newValue)
    setFormData({ ...formData, ['txDate']: newValue })
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addIncome(formData, setIsLoading, navigate, id)
  }

  return (
    <div className="add-business container p-4 ">
      <h2 className="mb-3">Add Extra Income</h2>

      <hr className="light mb-3" />
      <p className="mb-4">Add an extra income</p>
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
                renderInput={(params) => <TextField {...params} />}
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
              name="description"
              aria-label="With textarea"
            ></textarea>
          </div>
          <div className="text-center mt-3">
            {isLoading ? (
              <button className="btn btn-success btn-md" disabled>
                Adding
              </button>
            ) : (
              <button className="btn btn-success btn-md">Add Income</button>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}

export default AddIncome
