import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { selectAllPeople } from "../../features/people/peopleSlice"
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { stringToPastelColor } from "../../utils/color";
import ClearIcon from '@mui/icons-material/Clear';
import { selectTasksByList } from "../../features/tasks/tasksSlice";
import { useState } from "react";
import PersonDialog from "../PersonDialog/PersonDialog";

const PeopleList = () => {

    const dispatch = useDispatch();
    const people = useSelector(selectAllPeople)
    const taskByList = useSelector(selectTasksByList)

    const [selectPerson, setSelectPerson] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [tabSelected, setTabSelect] = useState(false)
    const [trackCard, setTrackCard] = useState()

    const handleClickPerson = (person) => {
        setOpenDialog(true)
        setSelectPerson(person)
    }

    const handleMouseOnCard = (person) => {
        setTrackCard(person.person_id)
    }

    const handleMouseOutCard = () => {
        setTrackCard(null)
    }



    return (
        <Grid2 container spacing={2}>
            {
                people.map(person => {
                    const personDoingTask = taskByList.filter((task) => {
                        if (task.person.some((p) => p.person_id === person.person_id) && task.is_completed === tabSelected) {
                            return task
                        }
                    })
                    return (
                        <Grid2 xs={3} sm={3} md={3} lg={3} >
                            <Paper
                                variant='outlined'
                                sx={{ minHeight: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                onClick={() => { handleClickPerson(person) }}
                                onMouseOver={() => { handleMouseOnCard(person) }}
                                onMouseOut={() => { handleMouseOutCard() }}
                            >
                                <Stack direction='column' spacing={1} sx={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '-15px' }}>
                                    <IconButton sx={{
                                        padding: 0,
                                        position: 'relative',
                                        marginLeft: 'auto',
                                        display: 'flex',
                                        alignSelf: 'flex-end',
                                        right: '10px',
                                        top: '-10px',
                                        visibility: trackCard === person.person_id ? 'visible' : 'hidden'
                                    }}>
                                        <ClearIcon />
                                    </IconButton>
                                    <Badge color='info' badgeContent={personDoingTask && personDoingTask.length} max={999}>
                                        <Avatar
                                            sx={{ bgcolor: stringToPastelColor(person.name, 'hex') }}
                                            alt={person.name}
                                        />
                                    </Badge>
                                    <Typography variant='body2'>
                                        {person.name}
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Grid2>
                    )
                })
            }
            <PersonDialog
                open={openDialog}
                setOpen={setOpenDialog}
                person={selectPerson}
                tabSelected={tabSelected}
                setTabSelect={setTabSelect} />
        </Grid2>
    )
}

export default PeopleList