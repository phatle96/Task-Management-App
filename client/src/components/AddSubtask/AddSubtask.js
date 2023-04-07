import * as React from 'react';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    Paper,
    Stack,
    TextField,
} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { Delete, Edit } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import { nanoid } from 'nanoid';


const AddSubtask = () => {
    const [add, setAdd] = React.useState(false)
    const [subtasks, setSubtask] = React.useState([])
    const [content, setContent] = React.useState('')
    const [editing, setEditing] = React.useState(false)
    const [id, setId] = React.useState('')
    const [editSubtask, setEditsubtask] = React.useState([])
    const [edited, setEdited] = React.useState([])

    const handleAddSubtaskButton = () => {
        if (add) {
            setAdd(false)
            setSubtask([
                {
                    id: nanoid(3),
                    content: content
                },
                ...subtasks,
            ])
        } else {
            setAdd(true)
            setContent("")
        }
    }

    const handleAddSubTask = () => {
        setAdd(false)
        setSubtask([
            {
                id: nanoid(3),
                content: content
            },
            ...subtasks,
        ])
    }



    const handleEditButton = () => {
        setEditing(true);
        setEdited(subtasks)
        setEditsubtask([]);
    }

    const handleCancelEdit = () => {
        setEditing(false);
        setEdited(subtasks)
    }

    const handleEditDone = () => {
        setEditing(false);
        setSubtask(edited);
    }

    const handleEditClearAll = () => { setEdited([]) }

    const handleAddTextField = (e) => { setContent(e.target.value) }

    const handleCloseAdd = () => setAdd(false)

    const handleEditSubtaskClickAway = () => {
        setEdited(edited.map(subtask => {
            if (subtask.id === id) {
                return { ...subtask, content: content };
            } else {
                return subtask;
            }
        }))
    }

    const handleEditFieldText = (e) => {
        setContent(e.target.value);
    }

    const handleEditClearOne = (id) => {
        return (
            setEdited(edited.filter(subtask => subtask.id !== id)))
    }


    return (
        <Stack direction="column" >
            <Stack direction="row" justifyContent="space-between" paddingBottom={1}>
                {!editing ?
                    (<Box >
                        <Button size='small' disabled={editing} startIcon={<FormatListBulletedIcon />}
                            onClick={handleAddSubtaskButton}>
                            Add Subtask
                        </Button>
                    </Box>) :
                    (
                        <Button size="small"
                            onClick={handleEditClearAll}>
                            Clear all subtask
                        </Button>
                    )
                }
                <Divider orientation="vertical" flexItem />
                {(subtasks.length !== 0 && editing === false) && (
                    <Box >
                        <Button size='small' endIcon={<EditIcon />}
                            onClick={handleEditButton}>
                            Edit
                        </Button>
                    </Box>
                )}
                
                {
                    editing && (
                        <Stack direction="row" display="flex">
                            <Button aria-label="cancel" size="small" color='primary' paddingRight={2}
                                onClick={handleCancelEdit}>
                                Cancel
                            </Button>
                            
                            <Button aria-label="Done" size="small" color='primary'
                                onClick={handleEditDone}>
                                    Done
                            </Button>
                        </Stack>
                    )
                }

            </Stack>

            <Box width="90%" alignSelf="flex-end" >
                {add && (
                    <ClickAwayListener onClickAway={handleAddSubTask}>
                        <Stack direction="row" paddingTop={1}>
                            <FormControlLabel control={<Checkbox />} />
                            <TextField
                                fullWidth
                                size="small"
                                label="Subtask"
                                variant="outlined"
                                autoFocus
                                onChange={handleAddTextField} />
                            <IconButton aria-label="close" size="small"
                                onClick={handleCloseAdd}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="done" size="small"
                                onClick={handleAddSubTask}>
                                <DoneIcon fontSize="inherit" />
                            </IconButton>

                        </Stack>
                    </ClickAwayListener>
                )}
                {!editing ?
                    (subtasks.map((subtask) => (
                        <Stack direction="row" alignItems="center" paddingTop={1} key={subtask.id}>
                            <FormControlLabel control={<Checkbox />} />
                            <Box height="100%" alignItems="center">
                                <Typography variant="body2" >
                                    {subtask.content}
                                </Typography>
                            </Box>
                        </Stack>
                    ))) : (

                        edited.map((subtask) => (

                            <Stack direction="row" alignItems="center" paddingTop={1} key={subtask.id}>
                                <FormControlLabel control={<Checkbox />} />
                                <ClickAwayListener
                                    mouseEvent="onMouseDown"
                                    touchEvent="onTouchStart"
                                    onClickAway={handleEditSubtaskClickAway}  >
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        defaultValue={subtask.content}
                                        onChange={handleEditFieldText}
                                        onSelect={() => setId(subtask.id)} />
                                </ClickAwayListener>
                                <IconButton aria-label="close" size="small" onClick={() => handleEditClearOne(subtask.id)}>
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            </Stack>

                        )))
                }
            </Box >
        </Stack >
    )
}

export default AddSubtask;