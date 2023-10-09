import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Stack from '@mui/material/Stack'
import React from 'react'
import dayjs, { Dayjs } from 'dayjs'

interface InputProps {
  label: string
  handleDateChange: any
  value: Dayjs | any
  type: string
}
const DateField: React.FC<InputProps> = ({
  handleDateChange,
  label,
  value,
  type,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack className="mb-3" spacing={3}>
        <label htmlFor="basic-url" className="form-label ">
          {label}
        </label>

        <DateTimePicker
          label={type}
          value={value}
          onChange={handleDateChange}
        />
      </Stack>
    </LocalizationProvider>
  )
}

export default DateField
