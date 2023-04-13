import { Avatar, Button, IconButton, Stack, Typography } from "@mui/material"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import React from "react";

const ListTitle = () => {
    return (
        <Stack direction="row" paddingTop={2} paddingBottom={2}>
            <Button>
                <Avatar>
                    A
                </Avatar>
            </Button>
            <Typography variant="h3">
                All task
            </Typography>
            <IconButton>
                <DriveFileRenameOutlineIcon sx={{alignSelf: "end"}} />
            </IconButton>
        </Stack>
    )
}

export default ListTitle;