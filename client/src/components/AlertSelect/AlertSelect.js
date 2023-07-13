import { Autocomplete, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react";


const AlertSelect = () => {

    const [value, setValue] = useState(null)
    const [inputChange, setInputChange] = useState('')

    return (
        <Autocomplete
            sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 3, backgroundColor: "whitesmoke", borderColor: "lightgrey" },
            }}
            options={alertOptions}
            getOptionLabel={(option) => option.name}
            id="alert-select"
            blurOnSelect
            value={value}
            onChange={(event, newValue) => { setValue(newValue) }}
            inputValue={inputChange}
            onInputChange={(event, value) => { setInputChange(value) }}
            renderInput={(params) => (
                <TextField {...params} label="Alert" />
            )}
        />
    )
}

const alertOptions = [
    { name: 'None', value: null },
    { name: '5 minutes before', value: null },
    { name: '10 minutes before', value: null },
    { name: '15 minutes before', value: null },
    { name: '30 minutes before', value: null },
    { name: '1 hour before', value: null },
    { name: '2 hours before', value: null },
    { name: '1 day before', value: null },
    { name: '2 days before', value: null },
    { name: '1 week before', value: null },
]

export default AlertSelect