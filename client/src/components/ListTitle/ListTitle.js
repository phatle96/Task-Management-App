import { Avatar, Button, Icon, Stack, Typography } from "@mui/material"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SynchronizeLoading from "../SynchronizeLoading/SynchronizeLoading";
import TaskDialog from "../TaskDialog/TaskDialog";

import { useState, } from "react";

import { useSelector } from "react-redux";
import { selectListById } from "../../features/lists/listsSlice";



const ListTitle = () => {

    const listId = useSelector((state) => state.filters.list)
    const list = useSelector((state) => selectListById(state, listId))

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    };

    const subtasksStatus = useSelector((state) => state.subtasks.status)
    const tasksStatus = useSelector((state) => state.tasks.status)
    const listsStatus = useSelector((state) => state.lists.status)

    const list_name = () => {
        if (listId === null) {
            return 'All Tasks';
        } else {
            return list.name;
        }
    }

    return (
        <Stack direction="column" paddingY={2} paddingLeft={2} display="flex" spacing={1}>
            <Stack direction="row" sx={{ paddingLeft: 2 }}>
                <Typography variant="h4" noWrap={1} sx={{ paddingRight: 5, width: '100%', maxWidth: 800 }}>
                    {list_name()}
                    <SynchronizeLoading state={
                        (subtasksStatus === 'loading' ||
                            tasksStatus === 'loading' ||
                            listsStatus === 'loading')} />
                </Typography>
            </Stack>
            <Stack direction="row" >
                <Button>
                    <Avatar>
                        A
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