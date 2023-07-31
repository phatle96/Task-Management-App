import { Avatar, Box, Button, Icon, IconButton, InputBase, Menu, MenuItem, Stack } from "@mui/material"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EditIcon from '@mui/icons-material/Edit';
// import SynchronizeLoading from "../SynchronizeLoading/SynchronizeLoading";
import TaskDialog from "../TaskDialog/TaskDialog";



import React, { useEffect, useRef, useState, } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createList, deleteList, initDeleteList, initList, selectListById, updateList } from "../../features/lists/listsSlice";
import { deleteTasksList, initTask, selectTasksByList } from "../../features/tasks/tasksSlice";
import { listFilterChanged } from "../../features/filters/filtersSlice";
import ToolOption from "../ToolOption/ToolOption";


const ListTitle = () => {

    const dispatch = useDispatch()

    const listId = useSelector((state) => state.filters.list)
    const list = useSelector((state) => selectListById(state, listId))
    const createListState = useSelector((state) => state.lists.create)
    const deleteListState = useSelector((state) => state.lists.delete)
    const tasks = useSelector(selectTasksByList)

    const [open, setOpen] = useState(false);
    const [showEdit, setShowEdit] = useState(false)
    const [editing, setEditing] = useState(false)
    const [content, setContent] = useState(list && list.name)

    // handle Menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openListOption = Boolean(anchorEl);
    const handleOpenList = (event) => {
        list && setAnchorEl(event.currentTarget);
    };
    const handleCloseList = () => {
        setAnchorEl(null);
    };

    const handleDeleteList = () => {
        const payload = {
            id: listId,
            payload: {
                is_deleted: true
            }
        }
        dispatch(deleteList(payload))
        setAnchorEl(null);
    }
    //----------------


    const contentRef = useRef(null)

    const handleOpen = () => {
        dispatch(initTask())
        setOpen(true)
    };

    const handleBlur = () => {
        if (list) {
            if (contentRef.current && contentRef.current !== content) {
                const payload = {
                    id: listId,
                    payload: {
                        name: content
                    }
                }
                dispatch(updateList(payload))
                contentRef.current = content
            }
        } else if (listId === 'create') {
            const payload = {
                type: 'list',
                payload: {
                    name: content
                }
            }
            dispatch(createList(payload))
        }
        setEditing(false)
    }

    const handleChangeListName = (event) => {
        setContent(event)
    }


    useEffect(() => {
        if (list) {
            setContent(list.name)
            contentRef.current = list.name
        } else if (listId === 'create') {
            dispatch(initList())
            setContent('New list')
            contentRef.current = 'New list'
            setEditing(true)
        }
    }, [listId, dispatch])

    useEffect(() => {
        switch (createListState.status) {
            case 'succeeded': {
                dispatch(listFilterChanged({ list: createListState.response.list_id }))
            }
        }
    }, [createListState.status])

    useEffect(() => {
        switch (deleteListState.status) {
            case 'succeeded': {
                dispatch(deleteTasksList(tasks.map(task => task?.task_id)))
                dispatch(listFilterChanged({ list: null }))
                dispatch(initDeleteList())
            }
        }
    }, [deleteListState.status])

    return (
        <Stack direction="column" paddingY={2} paddingLeft={1} display="flex" spacing={1}>
            <Stack
                direction="row"
                sx={{ paddingLeft: 2, alignItems: 'center' }}
            >

                <Box
                    sx={{ display: 'flex', width: '100%' }}
                    onMouseOver={() => { (list || listId === 'create') && setShowEdit(true) }}
                    onMouseOut={() => { (list || listId === 'create') && setShowEdit(false) }}>
                    {
                        (showEdit && !editing) &&
                        <IconButton onClick={() => { setEditing(true) }}>
                            <EditIcon />
                        </IconButton>
                    }
                    <InputBase
                        fullWidth
                        disabled={!editing}
                        value={(list || listId === 'create') ? content : 'All task'}
                        inputProps={{ maxLength: 150 }}
                        inputRef={input => (input && editing) && input.focus()}
                        onFocus={(event) => { event.target.select() }}
                        onChange={(event) => { handleChangeListName(event.target.value) }}
                        onBlur={() => { handleBlur() }}
                        sx={{
                            fontSize: 'xx-large',
                            fontWeight: 400,
                            '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: 'rgba(0,0,0,0.87)' }
                        }} />
                </Box>
                <Box
                    onMouseOver={(e) => { e.stopPropagation() }}
                    onMouseOut={(e) => { e.stopPropagation() }}>
                    <ToolOption />
                </Box>
            </Stack>
            <Stack direction="row" >
                <Button>
                    <Avatar
                        onClick={(event) => { handleOpenList(event) }}
                        sx={list && { bgcolor: list.color }}>
                        {list ? list.name.charAt(0) : 'A'}
                    </Avatar>
                </Button>
                <Menu
                    id="list-option"
                    anchorEl={anchorEl}
                    open={openListOption}
                    onClose={() => { handleCloseList() }}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => { handleDeleteList() }}>Delete</MenuItem>
                    <MenuItem onClick={() => { handleCloseList() }}>Archive</MenuItem>
                </Menu>
                <Button
                    variant="outlined"
                    sx={{ height: 45, width: '100%', maxWidth: 300, color: "dimgrey", borderRadius: 6, alignItems: "baseline", marginRight: 2 }}
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