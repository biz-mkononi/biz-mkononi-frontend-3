import React, {useContext} from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Container} from '@mui/material';
import {DataContext} from '../../context/ContextProvider';
const DateComponent = () => {
  const {startDate, endDate, setStartDate, setEndDate} =
    useContext(DataContext);

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'end',
        padding: '10px',
      }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{
            marginRight: '10px',
          }}
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          label="From Date "
        />
        <DatePicker
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          label="To Date "
        />
      </LocalizationProvider>
    </Container>
  );
};

export default DateComponent;
