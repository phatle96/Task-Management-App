import { useState, React } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Stack, Switch, FormControlLabel, Box } from '@mui/material';

const DateTimeSelect = () => {
  const [checked, setChecked] = useState(false)

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box paddingTop={1}>
      <FormControlLabel control={<Switch
        checked={checked}
        onChange={handleChange} />} label="Set alert" />

      {checked && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker label="Basic date time picker" />
          </DemoContainer>
        </LocalizationProvider>)
      }
    </Box>
  );
}

export default DateTimeSelect;