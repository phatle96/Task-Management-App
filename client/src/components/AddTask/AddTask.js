import { useContext, useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import PeopleChipSelect from "../PeopleChipSelect/PeopleChipSelect";
import DateTimeSelect from "../DataTimeSelect/DateTimeSelect";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSubtask from "../AddSubtask/AddSubtask";
import ListFolder from "../ListFolder/ListFolder";
import { DataContext } from "../../context/DataContext";
import AxiosPost from "../../hooks/AxiosPost";

const AddTask = () => {

    const [task, setTask] = useState({})
    const [list, setList] = useState(null)
    const [selectPeople, setSelectPeople] = useState([])
    const [alert, setAlert] = useState('')
    const [st, setSt] = useState([])
    const [error, setError] = useState(null)
    const [isSubmit, setIsSubmit] = useState(false)
    const [payload, setPayload] = useState({})

    const { tasks, setTasks } = useContext(DataContext)

    const handleOnchange = (event) => {
        if (event.length > 0 && event.length < 300) {
            setTask({ content: event, error: false, helperText: "" })
        } else {
            setTask({ content: event, error: true, helperText: "length should be 1 to 300 characters" })
        }
    }

    const handleSave = (e) => {
        console.log("list: ", list._id);
        console.log("task:", task.content);
        console.log("people: ", selectPeople)
        console.log("alert:", alert.format());
        console.log("subtasks:", st)

        const pl = {
            payload: {
                list: list._id,
                content: task.content,
                person: selectPeople,
                alert: alert.format(),
                subtasks: st
            }
        }

        setPayload(pl)

        setIsSubmit(true)

        //postAPI('task', payload)

        //setTasks({ ...tasks, payload })

    }

    return (
        <Stack display="flex" direction="column" justifyContent="center" spacing={1.5} >
            <ListFolder setList={setList} />
            <TextField
                variant="outlined"
                id="outlined-multiline-static"
                label="Your task here!"
                multiline
                rows={3}
                value={task.content}
                error={task.error}
                helperText={task.helperText}
                onChange={(e) => { handleOnchange(e.target.value) }}
            />
            <PeopleChipSelect setSelectPeople={setSelectPeople} />
            <DateTimeSelect setAlert={setAlert} />
            <AddSubtask setSt={setSt} />
            <Stack display="flex" paddingTop={2} direction="row" justifyContent="flex-end" spacing={1}>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Clear
                </Button>
                <Button
                    onClick={(e) => { handleSave(e) }}
                    variant="contained" endIcon={<SaveIcon />}>
                    Save
                </Button>
            </Stack>
            {
                isSubmit && (
                    <AxiosPost
                        type={'task'}
                        payload={payload}
                        setIsSubmit={setIsSubmit} />
                )

            }
        </Stack>
    )
}




export default AddTask;