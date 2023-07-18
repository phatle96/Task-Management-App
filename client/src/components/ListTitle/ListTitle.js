import { Avatar, Box, Button, Icon, IconButton, Popover, Popper, Stack, Typography } from "@mui/material"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SynchronizeLoading from "../SynchronizeLoading/SynchronizeLoading";
import TaskDialog from "../TaskDialog/TaskDialog";

import React, { useState, } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectListById } from "../../features/lists/listsSlice";
import { initTask } from "../../features/tasks/tasksSlice";

import EmojiPicker, { Emoji, EmojiStyle } from 'emoji-picker-react';
import { stringToPastelColor } from "../../utils/color";

const ListTitle = () => {

    const dispatch = useDispatch()
    const listId = useSelector((state) => state.filters.list)
    const list = useSelector((state) => selectListById(state, listId))

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        dispatch(initTask())
        setOpen(true)
    };

    return (
        <Stack direction="column" paddingY={2} paddingLeft={2} display="flex" spacing={1}>
            <Stack direction="row" sx={{ paddingLeft: 2 }}>
                <Typography variant="h4" noWrap={1} sx={{ paddingRight: 5, width: '100%', maxWidth: 800 }}>
                    {listId ? list.name : 'All Tasks'}
                    {/* <SynchronizeLoading /> */}
                </Typography>
            </Stack>
            <Stack direction="row" >
                <Button>
                    <Avatar sx={list && { bgcolor: list.color }}>
                        {list ? list.name.charAt(0) : 'A'}
                    </Avatar>
                </Button>
                <Button
                    variant="outlined"
                    sx={{ height: 45, width: '100%', maxWidth: 300, color: "dimgrey", borderRadius: 6, alignItems: "baseline", }}
                    style={{ justifyContent: "flex-start", textTransform: 'none' }}
                    onClick={handleOpen}>
                    <Icon sx={{ marginRight: 1 }}>
                        <DriveFileRenameOutlineIcon />
                    </Icon>
                    Take a note...
                </Button>
                <TaskDialog open={open} setOpen={setOpen} />
            </Stack>

        </Stack>
    )
}

export default ListTitle;