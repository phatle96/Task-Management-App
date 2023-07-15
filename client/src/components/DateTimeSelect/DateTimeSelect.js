import { useEffect, useRef, useState } from "react"
import { DateTime } from "luxon";
import { Box, Button, ClickAwayListener, Paper, Stack } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import { DateField, DatePickerToolbar, StaticDatePicker, StaticTimePicker, TimeField, TimePickerToolbar } from "@mui/x-date-pickers";
import { handleUpdateDateTimeField } from "../../features/fields/fieldsSlice";
import { useDispatch } from "react-redux";

const DateTimeSelect = ({ value, setValue, isSetDay, isAllDay, label, error }) => {

	const [focusDate, setFocusDate] = useState(false);
	const [focusTime, setFocusTime] = useState(false)

	const valueRef = useRef(value)
	const dispatch = useDispatch();

	const handleFocusDate = () => {
		setFocusDate(true)
		setFocusTime(false)
	}

	const handleFocusTime = () => {
		setFocusDate(false)
		setFocusTime(true)
	}

	const handleSave = () => {
		setValue(value)
		valueRef.current = value
		setFocusDate(false)
		setFocusTime(false)
		dispatch(handleUpdateDateTimeField('on'))
	}

	const handleResetDateTime = () => {
		setValue(valueRef.current)
		setFocusDate(false)
		setFocusTime(false)
	}

	function CustomDateToolbar(props) {
		return (
			<Box
				// Pass the className to the root element to get correct layout
				className={props.className}
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<DatePickerToolbar {...props} />
				<Stack direction='row' sx={{ marginRight: 1.5, marginTop: -5.5 }} >
					<Button
						variant="text"
						onClick={() => { handleResetDateTime() }}>
						Close
					</Button>
					<Button
						variant="text"
						disabled={valueRef.current === value}
						onClick={() => { handleSave() }}>
						Save
					</Button>
				</Stack>

			</Box>
		);
	}

	function CustomTimeToolbar(props) {
		return (
			<Box
				// Pass the className to the root element to get correct layout
				className={props.className}
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<TimePickerToolbar {...props} />
				<Stack direction='row' sx={{ marginRight: 1.5, marginTop: -5.5 }} >
					<Button
						variant="text"
						onClick={() => { handleResetDateTime() }}>
						Close
					</Button>
					<Button
						variant="text"
						onClick={() => { handleSave() }}>
						Save
					</Button>
				</Stack>
			</Box>
		);
	}

	return (

		<Stack direction='column' sx={{ paddingY: 0.5, }}>
			<LocalizationProvider dateAdapter={AdapterLuxon}>
				<Stack direction='row' spacing={1} sx={{ display: 'flex' }}>
					<DateField
						readOnly
						sx={{ width: '-webkit-fill-available' }}
						disabled={!isSetDay}
						InputProps={{ sx: { borderRadius: 3, backgroundColor: 'whitesmoke', } }}
						label={label}
						value={value}
						error={error}
						helperText={error && 'Error! Event is not appear in calender'}
						onChange={(event) => { setValue(event) }}
						onFocus={() => { handleFocusDate() }}
					/>
					{!isAllDay &&
						<TimeField
							readOnly
							sx={{ width: '-webkit-fill-available' }}
							disabled={(!isSetDay || (isSetDay && isAllDay))}
							label='Time'
							value={value}
							error={error}
							InputProps={{ sx: { borderRadius: 3, backgroundColor: 'whitesmoke' } }}
							onChange={(event) => { setValue(event) }}
							onFocus={() => { handleFocusTime() }}
						/>
					}
				</Stack>

				{
					(focusDate) &&
					<StaticDatePicker
						autoFocus
						slots={{
							toolbar: CustomDateToolbar,
						}}
						slotProps={{
							actionBar: {
								actions: ['today'],
							},
						}}
						disabled={!isSetDay}
						sx={{ borderRadius: 3, backgroundColor: 'whitesmoke', border: 1, borderColor: 'lightgrey', marginTop: 1 }}
						value={value}
						error={error}
						onChange={(event) => {
							setValue(event)
						}}
					/>
				}
				{
					(focusTime) &&
					<StaticTimePicker
						autoFocus
						slots={{
							toolbar: CustomTimeToolbar,
						}}
						slotProps={{
							actionBar: {
								actions: [],
							},
						}}
						sx={{ borderRadius: 3, backgroundColor: 'whitesmoke', border: 1, borderColor: 'lightgrey', marginTop: 1 }}
						disabled={(!isSetDay || (isSetDay && isAllDay))}
						value={value}
						error={error}
						onChange={(newValue) => {
							setValue(newValue)
							console.log(newValue)
						}}
					/>
				}
			</LocalizationProvider>
		</Stack>
	)
}

export default DateTimeSelect