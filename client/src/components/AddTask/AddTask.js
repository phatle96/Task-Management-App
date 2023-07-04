import { useState } from "react";
import { Stack, TextField, } from "@mui/material";
import PeopleChipSelect from "../PeopleChipSelect/PeopleChipSelect";
import DateTimeSelect from "../DataTimeSelect/DateTimeSelect";
import AddSubtask from "../AddSubtask/AddSubtask";
import ListFolder from "../ListFolder/ListFolder";
import { selectFilters } from "../../features/filters/filtersSlice";
import { useSelector } from "react-redux";
import { selectListById } from "../../features/lists/listsSlice";

const AddTask = ({ task }) => {

    const filters = useSelector(selectFilters);

    const selectInitList = useSelector((state) => selectListById(state, task ? task.list_id : filters.list));

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
            console.log(task.person)
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

    const handleOnchange = (event) => {
        if (event.length > 0 && event.length < 300) {
            setTaskContent(event);
            setError(false);
        } else {
            setTaskContent(event);
            setError(true);
        }
    }


    return (
        <Stack display="flex" direction="column" justifyContent="center" spacing={1.5} >
            <ListFolder setList={setList} list={list} />
            <TextField
                variant="outlined"
                id="outlined-multiline-static"
                label="Your task here!"
                multiline
                rows={3}
                value={taskContent}
                error={error}
                helperText={error ? "length should be 1 to 300 characters" : null}
                onChange={(e) => { handleOnchange(e.target.value) }}
            />
            <PeopleChipSelect selectPeople={selectPeople} setSelectPeople={setSelectPeople} />
            <DateTimeSelect setAlert={setAlert} />
            <AddSubtask subtasks={subtasks} setSubtasks={setSubtasks} />
        </Stack>
    )
}




export default AddTask;