import { Avatar, Badge, Dialog, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, fabClasses, tabsClasses } from "@mui/material"
import TaskContainer from "../TaskContainer/TaskContainer"
import { stringToPastelColor } from "../../utils/color"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectTaskByListThenPerson, selectTasksByList } from "../../features/tasks/tasksSlice"
import { createSelector } from "@reduxjs/toolkit"

const PersonDialog = ({ person, open, setOpen, tabSelected, setTabSelect }) => {

    const initTask = useSelector((state) => selectTaskByListThenPerson(state, person && person.person_id))

    const [tasks, setTasks] = useState()
    const [tab, setTab] = useState('Doing');
    const [option, setOption] = useState(false)

    const handleCloseDialog = () => {
        setOpen(false)
        setTasks(null)
    }

    const handleChange = (event, changeTab) => {
        if (changeTab !== null) {
            setTab(changeTab);
            switch (changeTab) {
                case 'Doing':
                    setTabSelect(false);
                    setTasks(initTask.filter((task) => task.is_completed === false))
                    break
                case 'Completed':
                    setTabSelect(true);
                    setTasks(initTask.filter((task) => task.is_completed === true))
                    break
            }
        }
    };

    useEffect(() => {
        setTasks(initTask.filter((task) => task.is_completed === tabSelected))
    }, [ open])


    return (
        <Dialog
            open={open}
            onClose={() => { handleCloseDialog() }}
            maxWidth="sm"
            fullWidth={1}
            aria-labelledby="dialog"
            aria-describedby="dialog-person-task"
        >
            <Paper elevation={1} sx={{ padding: 2 }}>
                <Stack direction='row' sx={{ display: 'flex', width: '100%', }} >
                    <Stack direction='row' sx={{ margin: 1 }}>
                        <Badge color='info' badgeContent={tasks && tasks.length} max={999}>
                            <Avatar
                                sx={person && { bgcolor: stringToPastelColor(person.name, 'hex') }}
                                alt={person && person.name}
                            />
                        </Badge>
                        <Typography variant='h5' sx={{ marginLeft: 2 }}>
                            {person && person.name}
                        </Typography>
                    </Stack>
                    <ToggleButtonGroup
                        color="primary"
                        value={tab}
                        size='small'
                        exclusive
                        onChange={handleChange}
                        aria-label="person-tab"
                        sx={{ marginBottom: 0.1, marginLeft: 'auto', height: 'fit-content', alignSelf: 'flex-end' }}>
                        <ToggleButton sx={{
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 0,
                            borderEndStartRadius: 0,
                            borderEndEndRadius: 0
                        }} value="Doing">Doing</ToggleButton>
                        <ToggleButton value="Completed">Completed</ToggleButton>
                        <ToggleButton sx={{
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 12,
                            borderEndStartRadius: 0,
                            borderEndEndRadius: 0
                        }} value="Calendar">Calendar</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                {tasks && < TaskContainer tasks={tasks} />}
            </Paper>
        </Dialog>
    )
}

export default PersonDialog