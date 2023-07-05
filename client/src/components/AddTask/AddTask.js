import { Stack, TextField, } from "@mui/material";
import PeopleChipSelect from "../PeopleChipSelect/PeopleChipSelect";
import DateTimeSelect from "../DataTimeSelect/DateTimeSelect";
import AddSubtask from "../AddSubtask/AddSubtask";
import ListFolder from "../ListFolder/ListFolder";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectFilters } from "../../features/filters/filtersSlice";
import { selectListById } from "../../features/lists/listsSlice";
import { createTask, } from "../../features/tasks/tasksSlice";

const AddTask = ({ task, focus, setFocus }) => {

    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    const selectInitList = useSelector((state) => selectListById(state, task ? (task.list ? task.list.list_id : null) : filters.list));

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

    const initSubtasks = () => {
        if (task) {

        } else {

        }
    }


    const [taskContent, setTaskContent] = useState(initContent)
    const [error, setError] = useState(false)
    const [list, setList] = useState(initList)
    const [selectPeople, setSelectPeople] = useState(initPeople)
    const [alert, setAlert] = useState('')
    const [subtasks, setSubtasks] = useState([])
    const [create, setCreate] = useState()

    const handleOnchange = (event) => {
        if (event.length < 300) {
            setTaskContent(event);
            setError(false);
        } else {
            setTaskContent(event);
            setError(true);
        }
    }

    const handleFocus = () => {
        setFocus(true)
    }

    const handleBlur = (event) => {
        const id = event.currentTarget.id
        setFocus(false)
        if (!task) {
            switch (id) {
                case 'task-content': {
                    const payload = {
                        type: 'task',
                        payload: {
                            list: list._id,
                            content: taskContent,
                            person: selectPeople
                        }
                    }
                    dispatch(createTask(payload))
                }
            }
        }

    }


    return (
        <Stack display="flex" direction="column" justifyContent="center" spacing={1.5} >
            <ListFolder setList={setList} list={list} />
            <TextField
                variant="outlined"
                id="task-content"
                label="Your task here!"
                multiline
                rows={3}
                value={taskContent}
                error={error}
                helperText={error ? "length should be less than 300 characters" : null}
                onChange={(e) => { handleOnchange(e.target.value) }}
                onFocus={() => { handleFocus() }}
                onBlur={(event) => { handleBlur(event) }}
            />
            <PeopleChipSelect selectPeople={selectPeople} setSelectPeople={setSelectPeople} />
            <DateTimeSelect setAlert={setAlert} />
            <AddSubtask subtasks={subtasks} setSubtasks={setSubtasks} />
        </Stack>
    )
}




export default AddTask;