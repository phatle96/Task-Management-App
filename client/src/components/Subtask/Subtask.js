import * as React from 'react';
import {
    Box,
    Paper,
    TextField
} from "@mui/material";

const Subtask = (defaultValue) => {
    return (
        <Box>
                <TextField
                    id="outlined-multiline-static"
                    label=""
                    multiline
                    rows={1}
                    defaultValue= {defaultValue}
                />
        </Box>
    )
}

export default Subtask;