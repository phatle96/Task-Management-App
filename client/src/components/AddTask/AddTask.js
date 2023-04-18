import { React, useState } from "react";
import { useTheme } from '@mui/material/styles';

import { Stack, TextField, Button, Box } from "@mui/material";
import PeopleChipSelect from "../PeopleChipSelect/PeopleChipSelect";
import DateTimeSelect from "../DataTimeSelect/DateTimeSelect";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSubtask from "../AddSubtask/AddSubtask";
import ListFolder from "../ListFolder/ListFolder";

const AddTask = () => {

    return (
        <Stack display="flex" direction="column" justifyContent="center" spacing={1.5} >
            <ListFolder/>
            <TextField
                fullWidth
                variant="outlined"
                id="outlined-multiline-static"
                label="Your task here!"
                multiline
                rows={3}
                defaultValue=""
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