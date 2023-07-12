import { useState, React } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Switch, FormControlLabel, Box } from '@mui/material';
import dayjs from 'dayjs';
import { DateTime } from "luxon";

const DateTimeSelect = ({ setAlert }) => {
	const [checked, setChecked] = useState(false)
	const [value, setValue] = useState(dayjs(Date.now()))

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	return (
		<Box>
			<FormControlLabel control={<Switch
				checked={checked}
				onChange={handleChange} />} label="Set alert" />

			{checked && (
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={['DateTimePicker']}>
						<DateTimePicker
							label="Alert at"
							value={value}
							onClick={setAlert(value)}
							onChange={(newValue) => {
								setValue(newValue);
								setAlert(newValue);
							}} />
					</DemoContainer>
				</LocalizationProvider>)
			}
		</Box>
	);
}

export default DateTimeSelect;