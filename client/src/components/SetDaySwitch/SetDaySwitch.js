import { Box, FormControlLabel, Switch } from "@mui/material"
import { useDispatch } from "react-redux"
import { handleSetDayField } from "../../features/fields/fieldsSlice";

const SetDaySwitch = ({ setDay, isSetDay, setAllDay, isAllDay, setFocus, task }) => {

    const dispatch = useDispatch();

    const handleSetDayToggle = () => {
        if (task) {
            setDay(!isSetDay)
            dispatch(handleSetDayField(!isSetDay))
            if (isSetDay) {
                setAllDay(false)
            }
        } else {
            setFocus(true)
        }
    }

    const handleAllDayToggle = () => {
        setAllDay(!isAllDay)
        dispatch(handleSetDayField(isSetDay))
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControlLabel
                sx={{ display: 'flex', width: 'fit-content' }}
                control={
                    <Switch
                        color="info"
                        checked={isSetDay}
                        onChange={() => { handleSetDayToggle() }}
                        inputProps={{ 'aria-label': 'set-day' }} />
                }
                label="Set Day" />
            <FormControlLabel
                sx={{ display: 'flex', width: 'fit-content' }}
                control={
                    <Switch
                        disabled={!isSetDay}
                        color="info"
                        checked={isAllDay}
                        onChange={() => { handleAllDayToggle() }}
                        inputProps={{ 'aria-label': 'all-day-toggle' }} />
                }
                label="All Day" />
        </Box>
    )
}

export default SetDaySwitch