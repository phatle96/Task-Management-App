import { Checkbox, IconButton, Stack, TextField, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import { useEffect, useRef, useState } from 'react';

import { handleSubtaskField, selectSubtaskField, } from "../../features/fields/fieldsSlice";
import { deleteSubtask, updateSubtask } from '../../features/subtasks/subtasksSlice';



const SubtaskTextField = ({ subtask }) => {

    const [content, setContent] = useState(subtask.content)
    const [error, setError] = useState(false)

    const [isEditing, setEditing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const subtaskRef = useRef(subtask.content)

    const initPayload = {
        status: 'on',
        id: subtask.subtask_id,
        error: error
    }

    const dispatch = useDispatch();
    const subtaskField = useSelector(selectSubtaskField)

    useEffect(() => {
        switch (subtaskField.status) {
            case 'idle': break
            case 'on': break
            case 'off': {
                if (content.length && content !== subtaskRef.current) {
                    const payload = {
                        id: subtask.subtask_id,
                        payload: { content: content }
                    }
                    dispatch(updateSubtask(payload))
                }
                dispatch(handleSubtaskField({ status: 'idle', id: null, error: false }))
                break
            }
        }
    }, [subtaskField])

    const handleEdit = (event) => {
        if (event.length) {
            setContent(event)
            setError(false)
            dispatch(handleSubtaskField({ ...initPayload, error: false }))
        } else {
            setContent(event)
            setError(true)
            dispatch(handleSubtaskField({ ...initPayload, error: true }))
        }
    }

    const handleFocus = () => {
        setEditing(true)
        if (subtaskField.error) {
            dispatch(handleSubtaskField({ ...subtaskField, status: 'on' }))
        } else {
            dispatch(handleSubtaskField(initPayload))
        }
    }

    const handleBlur = () => {
        if (subtaskField.error) {
            dispatch(handleSubtaskField({ ...subtaskField, status: 'off' }))
        } else {
            dispatch(handleSubtaskField({ ...initPayload, status: 'off' }))
        }
        setDeleting(false)
        setEditing(false)
    }


    const handleDelete = () => {
        setDeleting(!isDeleting)
    }

    const handleConfirmDelete = () => {
        const payload = {
            id: subtask.subtask_id,
            payload: { is_deleted: true }
        }
        dispatch(deleteSubtask(payload));
    }

    const handleChecked = () => {
        const payload = {
            id: subtask.subtask_id,
            payload: { is_completed: !subtask.is_completed }
        };
        dispatch(updateSubtask(payload));
    }

    const IconButtonStyled = ({ title, onClick, style }) => {
        return (
            <Tooltip title={title}>
                <IconButton onMouseDown={onClick} aria-label={title} size="small">
                    {style === 'close' && <CloseIcon color='error' fontSize='inherit' />}
                    {style === 'done' && <DoneIcon color='success' fontSize='inherit' />}
                    {style === 'undo' && <UndoIcon color='info' fontSize='inherit' />}
                    {style === 'delete' && <DeleteIcon fontSize='inherit' />}
                </IconButton>
            </Tooltip>
        )
    }

    const EditButton = () => {
        return (
            <Stack direction="row">
                {
                    (isEditing && !isDeleting) && (
                        <>
                            <IconButtonStyled title='Delete' onClick={() => { handleDelete() }} style='close' />
                            <IconButtonStyled title='Save' onClick={() => { handleBlur() }} style='done' />
                        </>
                    )
                }
                {
                    (isEditing && isDeleting) && (
                        <>
                            <IconButtonStyled title='Revert' onClick={() => { handleDelete() }} style='undo' />
                            <IconButtonStyled title='Delete' onClick={() => { handleConfirmDelete() }} style='delete' />
                        </>
                    )
                }
            </Stack>
        )
    }

    return (
        <>
            <TextField
                sx={!subtask.is_completed ? { width: "100%" } : { width: "100%", textDecoration: "line-through" }}
                variant="standard"
                value={content}
                inputProps={{ maxLength: 300 }}
                error={error}
                placeholder={error ? 'length should not be empty' : null}
                disabled={isDeleting}
                inputRef={input => (input && (subtask.subtask_id === subtaskField.id && subtaskField.error && subtaskField.status === 'on')) && input.focus()}
                onFocus={() => { handleFocus(subtask) }}
                onBlur={() => { handleBlur(subtask) }}
                onChange={(event) => { handleEdit(event.target.value); }}
            />
            {(!isEditing || (!isEditing && !isDeleting)) &&
                <Checkbox
                    sx={{ paddingRight: 0, paddingBottom: 0 }}
                    inputProps={{ 'aria-label': `${subtask.subtask_id}` }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                    onChange={() => handleChecked()}
                    checked={subtask.is_completed ? true : false}
                />
            }
            {
                (subtask.subtask_id === subtaskField.id) &&
                < EditButton />
            }
        </>
    )
}

export default SubtaskTextField