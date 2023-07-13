import { useState } from "react"
import { DateTime } from "luxon";
import { ClickAwayListener, Paper, Stack } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { DateField, StaticDatePicker, StaticDateTimePicker } from "@mui/x-date-pickers";

const DateTimeSelect = ({ isAllDay, label }) => {

	const [dateValue, setDateValue] = useState(DateTime.now());
	const [focusDate, setFocusDate] = useState(false);

	const [datetimeValue, setDatetimeValue] = useState(DateTime.now());
	const [focusDatetime, setFocusDatetime] = useState(false);

	const handleFocusDate = () => {
		setFocusDate(true)
	}

	const handleBlurDate = () => {
		setFocusDate(false)
	}

	const handleFocusDatetime = () => {
		setFocusDatetime(true)
	}

	const handleBlurDatetime = () => {
		setFocusDatetime(false)
	}

	const MyDatePicker = () => {
		return (
			<ClickAwayListener onClickAway={() => { handleBlurDate() }}>
				<Stack direction='column' sx={{ paddingY: 0.5, }}>
					<LocalizationProvider dateAdapter={AdapterLuxon}>
						<DateField
							InputProps={{ sx: { borderRadius: 3, backgroundColor: 'whitesmoke' } }}
							label={label}
							value={dateValue}
							onChange={(event) => { setDateValue(event) }}
							onFocus={() => { handleFocusDate() }}
						/>
						{
							(focusDate) &&
							<StaticDatePicker
								autoFocus
								sx={{ borderRadius: 3, backgroundColor: 'whitesmoke', border: 1, borderColor: 'lightgrey', marginTop: 1 }}
								orientation='landscape'
								value={dateValue}
								onChange={(event) => {
									setDateValue(event)
								}}
							/>
						}
					</LocalizationProvider>
				</Stack>
			</ClickAwayListener>
		)
	}

	const MyDateTimePicker = () => {
		return (
			<ClickAwayListener onClickAway={() => { handleBlurDatetime() }}>
				<Stack direction='column' sx={{ paddingY: 0.5, }}>
					<LocalizationProvider dateAdapter={AdapterLuxon}>
						<DateTimeField
							InputProps={{ sx: { borderRadius: 3, backgroundColor: 'whitesmoke' } }}
							label={label}
							value={datetimeValue}
							onChange={(event) => { setDatetimeValue(event) }}
							onFocus={() => { handleFocusDatetime() }}
						/>

						{
							(focusDatetime) &&
							<StaticDateTimePicker
								autoFocus
								sx={{ borderRadius: 3, backgroundColor: 'whitesmoke', border: 1, borderColor: 'lightgrey', marginTop: 1 }}
								orientation='landscape'
								value={datetimeValue}
								onChange={(event) => {
									setDatetimeValue(event)
								}}
							/>
						}
					</LocalizationProvider>
				</Stack>
			</ClickAwayListener>
		)
	}



	return (
		<>
			{
				isAllDay ? <MyDatePicker /> : < MyDateTimePicker />
			}
		</>
	)
}

export default DateTimeSelect