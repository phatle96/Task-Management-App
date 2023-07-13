import { Box, Divider, FormControl, FormControlLabel, FormLabel, Paper, Stack, Switch, TextField, Typography, } from "@mui/material";
import PeopleChipSelect from "../PeopleChipSelect/PeopleChipSelect";
import DateTimeSelect from "../DateTimeSelect/DateTimeSelect";

import AddSubtask from "../AddSubtask/AddSubtask";
import ListFolder from "../ListFolder/ListFolder";

import { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectFilters } from "../../features/filters/filtersSlice";
import { selectListById } from "../../features/lists/listsSlice";
import { createTask, updateTask, } from "../../features/tasks/tasksSlice";
import {
    selectTaskFieldStatus,
    selectListFieldStatus,
    selectPeopleFieldStatus,
    selectAlertFieldStatus,
    handleTaskField,
    handleTaskError,
    handleListField,
    handlePeopleField
} from "../../features/fields/fieldsSlice";
import { selectSubtasksByTaskId, updateSubtask } from "../../features/subtasks/subtasksSlice";
import AlertSelect from "../AlertSelect/AlertSelect";


const AddTask = ({ task }) => {

    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);
    const selectInitList = useSelector((state) => selectListById(
        state,
        task ? (task.list ? task.list.list_id : null) : filters.list
    ));
    const subtasks = useSelector((state) => selectSubtasksByTaskId(state, (task ? task.task_id : null)));

    const initList = () => {
        if (selectInitList === undefined) {
            return null
        } else {
            return selectInitList
        }
    }

    const initContent = () => {
        if (task) {
            return task.content
        } else {
            return ''
        }
    }

    const initPeople = () => {
        if (task) {
            return task.person
        } else {
            return []
        }
    }

    const [taskContent, setTaskContent] = useState(initContent);
    const [list, setList] = useState(initList);
    const [selectPeople, setSelectPeople] = useState(initPeople);
    const [alert, setAlert] = useState('');
    const [isAllDay, setAllDay] = useState(false)

    const [error, setError] = useState(false);
    const [focus, setFocus] = useState(false);

    const taskStatus = useSelector(selectTaskFieldStatus);
    const listStatus = useSelector(selectListFieldStatus);
    const peopleStatus = useSelector(selectPeopleFieldStatus);
    const alertStatus = useSelector(selectAlertFieldStatus);

    const taskRef = useRef(initContent())

    //handle content
    useEffect(() => {
        switch (taskStatus) {
            case 'idle': break
            case 'on': break
            case 'off': {
                if (taskContent.length && taskContent !== taskRef.current) {
                    if (!task) {
                        const payload = {
                            type: 'task',
                            payload: {
                                list: (list ? list._id : null),
                                content: taskContent,
                                person: selectPeople
                            }
                        }
                        dispatch(createTask(payload))
                        taskRef.current = taskContent
                    } else {
                        const payload = {
                            id: task.task_id,
                            payload: { content: taskContent, }
                        }
                        dispatch(updateTask(payload))
                        taskRef.current = taskContent
                    };
                }
                dispatch(handleTaskField('idle'))
                break
            }
        }
    }, [taskStatus])

    // handle list
    useEffect(() => {
        switch (listStatus) {
            case 'idle': break
            case 'on': break
            case 'off': {
                if (task) {
                    const payload = {
                        id: task.task_id,
                        option: list ? false : 'unset',
                        payload: { list: list ? list._id : 1 }
                    }
                    dispatch(updateTask(payload))
                    if (subtasks) {
                        subtasks.map((subtask) => {
                            const subtask_payload = {
                                id: subtask.subtask_id,
                                option: list ? false : 'unset',
                                payload: { list: list ? list._id : 1 }
                            }
                            dispatch(updateSubtask(subtask_payload))
                        })
                    }
                }
                dispatch(handleListField('idle'))
                break
            }
        }

    }, [listStatus])

    // handle person
    useEffect(() => {
        switch (peopleStatus) {
            case 'idle': break
            case 'on': {
                if (task) {
                    const payload = {
                        id: task.task_id,
                        payload: { person: selectPeople }
                    }
                    dispatch(updateTask(payload))
                }
                dispatch(handlePeopleField('idle'))
                break
            }
        }
    }, [peopleStatus])

    const SwitchAllDay = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControlLabel
                    sx={{ display: 'flex', width: 'fit-content' }}
                    control={
                        <Switch
                            color="info"
                            checked={isAllDay}
                            onChange={() => { handleAllDayToggle() }}
                            inputProps={{ 'aria-label': 'set-day' }} />
                    }
                    label="Set Day" />
                <FormControlLabel
                    sx={{ display: 'flex', width: 'fit-content' }}
                    control={
                        <Switch
                            color="info"
                            checked={isAllDay}
                            onChange={() => { handleAllDayToggle() }}
                            inputProps={{ 'aria-label': 'all-day-toggle' }} />
                    }
                    label="All Day" />
            </Box>
        )
    }

    const handleFocus = (event) => {
        dispatch(handleTaskField('on'))
    }

    const handleBlur = (event) => {
        dispatch(handleTaskField('off'));
        setFocus(false)
    }

    const handleOnchange = (event) => {
        if (!event.length) {
            setFocus(false)
            setTaskContent(event);
            setError(true);
            dispatch(handleTaskError(true))
        } else {
            setTaskContent(event);
            setError(false);
        }
    }

    const handleAllDayToggle = () => {
        setAllDay(!isAllDay)
    }


    return (
        <Stack display="flex" direction="column" justifyContent="center" spacing={1.5}>
            <ListFolder setList={setList} list={list} />
            <Divider />
            <TextField
                sx={{ borderColor: "lightgrey" }}
                InputProps={{ sx: { borderRadius: 3, backgroundColor: 'whitesmoke' } }}
                variant="outlined"
                id="task-content"
                label="Your task here!"
                multiline
                rows={3}
                value={taskContent}
                error={error || focus}
                helperText={(error || focus) ? "task content should not be empty" : null}
                inputProps={{ maxLength: 300 }}
                inputRef={input => (input && focus) && input.focus()}
                onChange={(e) => { handleOnchange(e.target.value) }}
                onFocus={(event) => { handleFocus(event) }}
                onBlur={(event) => { handleBlur(event) }}
            />
            <PeopleChipSelect selectPeople={selectPeople} setSelectPeople={setSelectPeople} />
            <AddSubtask taskContent={taskContent} setFocus={setFocus} task={task} />
            <Divider />
            <SwitchAllDay />
            <DateTimeSelect isAllDay={isAllDay} label='Start date' />
            <DateTimeSelect isAllDay={isAllDay} label='End date' />
            <Divider />

            <AlertSelect />
        </Stack>
    )
}




export default AddTask;