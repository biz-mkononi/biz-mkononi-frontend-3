import React, { useState, useEffect } from 'react'
import BusinessIcon from '@mui/icons-material/Business'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { Card } from '@mui/material'
import { addSalary } from '../../Data/Salaries/Data'
import { useNavigate } from 'react-router-dom'
import { getEmployees } from '../../Data/Employees/Data'
import dayjs, { Dayjs } from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
const PayEmployee = ({ id }: any) => {
  const navigate = useNavigate()
  const initialState = {
    employeeId: '',
    amount: '',
    txDate: '',
    description: '',
  }
  const [formData, setFormData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [employees, setEmployees] = useState<any[]>([])
  const [value, setValue] = React.useState<Dayjs | any>(dayjs(Date.now()))

  useEffect(() => {
    getEmployees(setEmployees, setIsLoading, id)
  }, [])
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
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addSalary(formData, navigate, setIsLoading, id)
  }
  console.log(formData)
  return (
    <div className="add-business container p-4 ">
      <h2 className="mb-3">Add Salary</h2>

      <hr className="light mb-3" />
      <p className="mb-4">Add a new salary to your business</p>
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
              id="basic-addon1"
            >
              <option selected>Select employee</option>
              {employees.map((employee) => {
                return (
                  <option value={employee.id} key={employee.id}>
                    {employee.name}
                  </option>
                )
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
              name="description"
              aria-label="With textarea"
            ></textarea>
          </div>

          <div className="text-center mt-3">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'Adding' : 'Add Salary'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default PayEmployee
