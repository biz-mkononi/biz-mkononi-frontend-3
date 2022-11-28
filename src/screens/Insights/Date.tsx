import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const InsightsDatePickers = ({ groupedProfits }: any) => {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(Date.now()));
    const [value2, setValue2] = React.useState<Dayjs | null>(dayjs(Date.now()));
    React.useEffect(() => {
        groupedProfits(value, value2)
    }, [value, value2])
    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
        setValue2(newValue)
    };
    console.log(value)
    return (
        <div className="row padding mb-3">
            <div className="col-lg-6">

            </div>
            <div className="col-lg-6">
                <div className="row padding">
                    <div className="col-lg-6">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DateTimePicker
                                    label="Date&Time picker"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>
                    <div className="col-lg-6">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DateTimePicker
                                    label="Date&Time picker"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default InsightsDatePickers
