import { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import PeopleChipSelect from "../PeopleChipSelect/PeopleChipSelect";
import DateTimeSelect from "../DataTimeSelect/DateTimeSelect";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSubtask from "../AddSubtask/AddSubtask";
import ListFolder from "../ListFolder/ListFolder";

const AddTask = () => {

    const [taskContent, setTaskContent] = useState({})
    const [list, setList] = useState(null)
    const [selectPeople, setSelectPeople] = useState([])
    const [alert, setAlert] = useState('')
    const [st, setSt] = useState([])
    const [error, setError] = useState(null)
    const [payload, setPayload] = useState({})


    const handleOnchange = (event) => {
        if (event.length > 0 && event.length < 300) {
            setTaskContent({ content: event, error: false, helperText: "" })
        } else {
            setTaskContent({ content: event, error: true, helperText: "length should be 1 to 300 characters" })
        }
    }

    const handleSave = (e) => {
        console.log("list: ", list._id);
        console.log("task:", taskContent.content);
        console.log("people: ", selectPeople)
        console.log("alert:", alert.format());
        console.log("subtasks:", st)

        const pl = {
            payload: {
                list: list._id,
                content: taskContent.content,
                person: selectPeople,
                alert: alert.format(),
                subtasks: st
            }
        }

        setPayload(pl)


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
                value={taskContent.content}
                error={taskContent.error}
                helperText={taskContent.helperText}
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
        </Stack>
    )
}




export default AddTask;