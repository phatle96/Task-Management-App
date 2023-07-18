import { Chip, Divider, Stack, TextField, } from "@mui/material";

import PeopleChipSelect from "../PeopleChipSelect/PeopleChipSelect";
import DateTimeSelect from "../DateTimeSelect/DateTimeSelect";
import AddSubtask from "../AddSubtask/AddSubtask";
import ListFolder from "../ListFolder/ListFolder";
import AlertSelect from "../AlertSelect/AlertSelect";
import SetDaySwitch from "../SetDaySwitch/SetDaySwitch";

import { useEffect, useRef, useState } from "react";

import { DateTime } from "luxon";

import { useSelector, useDispatch } from "react-redux";
import { selectFilters } from "../../features/filters/filtersSlice";
import { selectListById } from "../../features/lists/listsSlice";
import { createTask, updateTask, } from "../../features/tasks/tasksSlice";
import { selectSubtasksByTaskId, updateSubtask } from "../../features/subtasks/subtasksSlice";
import {
    selectTaskFieldStatus,
    selectListFieldStatus,
    selectPeopleFieldStatus,
    selectAlertFieldStatus,
    handleTaskField,
    handleTaskError,
    handleListField,
    handlePeopleField,
    selectSetDayField,
    handleSetDayField,
    selectUpdateDateTimeFieldStatus,
    handleUpdateDateTimeField
} from "../../features/fields/fieldsSlice";
import DialogCalendar from "../Calendar/DialogCalendar";

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

    const initFromDate = () => {
        if (task) {
            if (task.start_date) {
                const dt = DateTime.fromJSDate(task.start_date)
                return dt
            } else {
                const dt = DateTime.now()
                return dt
            }
        } else {
            const dt = DateTime.now()
            return dt
        }
    }


    const initToDate = () => {
        if (task) {
            if (task.end_date) {
                const dt = DateTime.fromJSDate(task.end_date)
                return dt
            } else {
                const dt = DateTime.now().plus({ hours: 1 })
                return dt
            }
        } else {
            const dt = DateTime.now().plus({ hours: 1 })
            return dt
        }
    }

    const initSetDay = () => {
        if (task) {
            if (task.start_date) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const initAllDay = () => {
        if (task) {
            if (task.is_allday) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const [taskContent, setTaskContent] = useState(initContent);
    const [list, setList] = useState(initList);
    const [selectPeople, setSelectPeople] = useState(initPeople);
    const [fromDate, setFromDate] = useState(initFromDate);
    const [toDate, setToDate] = useState(initToDate);
    const [isSetDay, setDay] = useState(initSetDay)
    const [isAllDay, setAllDay] = useState(initAllDay)
    const [alert, setAlert] = useState('');

    const [error, setError] = useState(false);
    const [focus, setFocus] = useState(false);

    const taskStatus = useSelector(selectTaskFieldStatus);
    const listStatus = useSelector(selectListFieldStatus);
    const peopleStatus = useSelector(selectPeopleFieldStatus);
    const setDayStatus = useSelector(selectSetDayField);
    const updateDateTimeStatus = useSelector(selectUpdateDateTimeFieldStatus)
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
    }, [selectPeople])

    // handle Date time
    useEffect(() => {
        switch (setDayStatus) {
            case 'idle': break
            case true: {
                if (task) {
                    const payload = {
                        id: task.task_id,
                        payload: {
                            is_errordate: false,
                            is_allday: isAllDay,
                            start_date: isAllDay ? fromDate.set({ hour: 0 }).toISO() : fromDate.toISO(),
                            end_date: isAllDay ? toDate.set({ hour: 23, minute: 59, second: 59 }).toISO() : toDate.toISO(),
                        }
                    }
                    dispatch(updateTask(payload))
                }
                dispatch(handleSetDayField('idle'))
                break
            }
            case false: {
                if (task) {
                    const payload = {
                        id: task.task_id,
                        option: 'unset',
                        payload: {
                            is_errordate: 1,
                            is_allday: 1,
                            start_date: 1,
                            end_date: 1,
                        }
                    }
                    dispatch(updateTask(payload))
                }
                dispatch(handleSetDayField('idle'))
                break
            }
        }

    }, [setDayStatus])

    // handle update time
    useEffect(() => {
        switch (updateDateTimeStatus) {
            case 'idle': break
            case 'on': {
                if (task) {
                    const error = toDate.diff(fromDate).as('milliseconds') >= 0 ? false : true
                    console.log('from', fromDate.set({ hour: 0 }))
                    console.log('to', toDate.set({ hour: 23, minute: 59, second: 59 }))
                    const payload = {
                        id: task.task_id,
                        payload: {
                            is_errordate: error,
                            is_allday: isAllDay,
                            start_date: isAllDay ? fromDate.set({ hour: 0 }).toISO() : fromDate.toISO(),
                            end_date: isAllDay ? toDate.set({ hour: 23, minute: 59, second: 59 }).toISO() : toDate.toISO(),
                        }
                    }
                    dispatch(updateTask(payload))
                }
                dispatch(handleUpdateDateTimeField('idle'))
            }
        }
    }, [updateDateTimeStatus])


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

    return (
        <Stack display="flex" direction="column" justifyContent="center" spacing={1.5}>
            <ListFolder setList={setList} list={list} />
            <Divider sx={{ paddingBottom: 1 }} >
                <Chip label='Task & assign' />
            </Divider>
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
            <Divider sx={{ paddingTop: 2, paddingBottom: 1 }} >
                <Chip label='Date time' />
            </Divider>
            <SetDaySwitch setDay={setDay} isSetDay={isSetDay} setAllDay={setAllDay} isAllDay={isAllDay} task={task} setFocus={setFocus} />
            <DateTimeSelect
                value={fromDate}
                setValue={setFromDate}
                isSetDay={isSetDay}
                isAllDay={isAllDay}
                label='Start date' />
            <DateTimeSelect
                value={toDate}
                setValue={setToDate}
                isSetDay={isSetDay}
                isAllDay={isAllDay}
                error={(toDate.diff(fromDate).as('milliseconds') >= 0 ? false : true)}
                label='End date' />
            <DialogCalendar />
            <Divider sx={{ paddingTop: 2, paddingBottom: 1 }} >
                <Chip label='Alert' />
            </Divider>
            <AlertSelect isSetDay={isSetDay} />
        </Stack >
    )
}




export default AddTask;