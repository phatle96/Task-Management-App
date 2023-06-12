import { useContext, useEffect, useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import PeopleChipSelect from "../PeopleChipSelect/PeopleChipSelect";
import DateTimeSelect from "../DataTimeSelect/DateTimeSelect";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSubtask from "../AddSubtask/AddSubtask";
import ListFolder from "../ListFolder/ListFolder";
import axios from "axios";
import { DataContext } from "../../context/DataContext";

const AddTask = () => {

    const [task, setTask] = useState({})
    const [list, setList] = useState(null)
    const [people, setPeople] = useState([])
    const [alert, setAlert] = useState('')
    const [st, setSt] = useState([])
    const [error, setError] = useState(null)





    const handleOnchange = (event) => {
        if (event.length > 0 && event.length < 300) {
            setTask({ content: event, error: false, helperText: "" })
        } else {
            setTask({ content: event, error: true, helperText: "length should be 1 to 300 characters" })
        }
    }

    const handleSave = () => {
        console.log("list: ", list);
        console.log("task:", task.content);
        console.log("people: ", people);
        console.log("alert:", alert);
        console.log("subtasks:", st)


        const postTask = async () => {
            const task_payload = {
                list: list,
                content: task.content,
                alert: alert.format(),
            }
            try {
                const response = await axios.post(`http://localhost:8080/api/task/create`, task_payload)
                if (response.status !== 200) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                console.log(response)
                setError(null);
            } catch (err) {
                setError(err.message);
            }
        }

        postTask()

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
            <PeopleChipSelect setPeople={setPeople} />
            <DateTimeSelect setAlert={setAlert} />
            <AddSubtask setSt={setSt} />
            <Stack display="flex" paddingTop={2} direction="row" justifyContent="flex-end" spacing={1}>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Clear
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained" endIcon={<SaveIcon />}>
                    Save
                </Button>
            </Stack>
        </Stack>
    )
}




export default AddTask;