import { React, useState } from "react";
import { useTheme } from '@mui/material/styles';

import { Stack, TextField, Button } from "@mui/material";
import PeopleChipSelect from "../PeopleChipSelect/PeopleChipSelect";
import DateTimeSelect from "../DataTimeSelect/DateTimeSelect";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSubtask from "../AddSubtask/AddSubtask";


const AddTask = () => {

    const [people, setPeople] = useState("")


    return (
        <Stack display="flex" direction="column" justifyContent="center" >
            <TextField
                fullWidth
                variant="outlined"
                id="outlined-multiline-static"
                label="Your task here!"
                multiline
                rows={3}Note here
                defaultValue="Default Value"
            />  
            <PeopleChipSelect />
            <DateTimeSelect />
            <AddSubtask />
            <Stack display="flex" paddingTop={2} direction="row" justifyContent="flex-end" spacing={1}>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Clear
                </Button>
                <Button variant="contained" endIcon={<SaveIcon />}>
                    Save
                </Button>
            </Stack>
        </Stack>
    )
}




export default AddTask;