import React, { useEffect, useState } from 'react'
import BusinessIcon from '@mui/icons-material/Business'
import PhoneIcon from '@mui/icons-material/Phone'
import { Card } from '@mui/material'
import '../Businesses/AddBusiness.css'
import { useNavigate, useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import {
  getSingleEmployee,
  updateSingleEmployee,
} from '../../Data/Employees/Data'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import dayjs, { Dayjs } from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { getEmployees } from '../../Data/Employees/Data'
import { getSingleSalary, updateSingleSalary } from '../../Data/Salaries/Data'

interface data {
  name: ''
  email: ''
  phone: ''
  description: ''
}

const UpdateSalariesDetails = ({ id }: any) => {
  const [data, setData] = useState<data | any>({})
  const [isLoading, setIsloading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [employees, setEmployees] = useState<any[]>([])
  const [currentEmployee, setCurrentEmployee] = useState<data | any>({})
  const [value, setValue] = React.useState<Dayjs | any>(dayjs(data.txDate))

  useEffect(() => {
    getEmployees(setEmployees, setIsloading, id)
    getSingleSalary(
      setData,
      params.id,
      setIsloading,
      setCurrentEmployee,
      setFormData,
      id,
    )
  }, [])
  const handleDateChange = (newValue: Dayjs | any) => {
    setValue(newValue)
    setFormData({ ...formData, ['txDate']: newValue })
  }
  const navigate = useNavigate()

  const params = useParams()
  const [formData, setFormData] = useState({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateSingleSalary(formData, navigate, params.id, setIsUpdating, id)
  }
  console.log(formData)
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="add-business container p-4 ">
          <h2 className="mb-3">Update Salaries Details</h2>

          <div className="row padding">
            <div className="col-lg-6">
              <div className="details-button" style={{ display: 'flex' }}>
                <button
                  className="btn btn-secondary btn-md"
                  onClick={() => navigate(-1)}
                >
                  {' '}
                  Back
                </button>
              </div>
            </div>
          </div>

          <hr className="light mb-3 mt-3" />

          <p className="mb-4">Update your employee</p>
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
                  <option selected>{currentEmployee.name}</option>
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
                  aria-label="With textarea"
                ></textarea>
              </div>

              <div className="text-center mt-3">
                <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" disabled ={isUpdating?true:false}>
                    {isUpdating?"Updating":"Update Salary"}
                  </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  )
}

export default UpdateSalariesDetails
