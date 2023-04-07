import { React, useState } from "react";
import { useTheme } from '@mui/material/styles';

import { Box, Stack, TextField, Button, IconButton } from "@mui/material";
import PeopleChipSelect from "../PeopleChipSelect/PeopleChipSelect";
import DateTimeSelect from "../DataTimeSelect/DateTimeSelect";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Subtask from "../AddSubtask/AddSubtask";


const AddTask = () => {

    const [people, setPeople] = useState("")


    return (
        <Stack direction="column" justifyContent="center" >
            <TextField
                variant="outlined"
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Default Value"
                sx={{
                    maxWidth: '100%',
                }}
            />
            <PeopleChipSelect />
            <DateTimeSelect />
            <Subtask/>
            <Stack paddingTop={2} direction="row" justifyContent="flex-end" spacing={1}>
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