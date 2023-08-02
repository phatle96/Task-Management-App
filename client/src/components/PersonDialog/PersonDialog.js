import { Avatar, Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputBase, Menu, MenuItem, Paper, Stack, ToggleButton, ToggleButtonGroup, } from "@mui/material"
import TaskContainer from "../TaskContainer/TaskContainer"
import { stringToPastelColor } from "../../utils/color"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTasks, selectTaskByListThenPerson, } from "../../features/tasks/tasksSlice"
import Lottie from "lottie-react";
import animation_lkdloo8y from '../../utils/animation/animation_lkdloo8y.json'
import EditIcon from '@mui/icons-material/Edit';
import { deletePerson, selectAllPeople, updatePerson } from "../../features/people/peopleSlice"

const PersonDialog = ({ person, open, setOpen, tabSelected, setTabSelect, setPreDeletePerson, setOpenDeleteDialog }) => {

    const dispatch = useDispatch()
    const initTask = useSelector((state) => selectTaskByListThenPerson(state, person && person.person_id))
    const allPerson = useSelector(selectAllPeople)
    const peopleDeletedStatus = useSelector((state) => state.people.delete.status)

    const [tasks, setTasks] = useState()
    const [tab, setTab] = useState('Doing');
    const [hover, setHover] = useState(false)
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const openPersonOption = Boolean(anchorEl);

    const nameRef = useRef()

    const handleCloseDialog = () => {
        setOpen(false)
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

    const handleHoverInName = () => {
        setHover(true)
    }

    const handleHoverOutName = () => {
        setHover(false)
    }

    const handleChangeName = (event) => {
        setName(event)
    }

    const handleBlurName = () => {
        if (name && name !== nameRef.current && !allPerson.some(person => person.name === name)) {
            const payload = {
                id: person.person_id,
                payload: {
                    name: name
                }
            }
            dispatch(updatePerson(payload))
            dispatch(fetchTasks())
        } else {
            setName(nameRef.current)
        }

        setEditing(false)
    }

    const handleOpenPerson = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosePerson = () => {
        setAnchorEl(null);
    };

    const handleDeletePerson = (person) => {
        setPreDeletePerson(person)
        setOpenDeleteDialog(true)
    }

    useEffect(() => {
        setTasks(initTask.filter((task) => task.is_completed === tabSelected))
        setName(person?.name)
        nameRef.current = person?.name
    }, [open])

    return (
        <Dialog
            open={open}
            onClose={() => { handleCloseDialog() }}
            maxWidth="sm"
            fullWidth={1}
            aria-labelledby="dialog"
            aria-describedby="dialog-person-task"
        >
            <DialogTitle>
                <Stack direction='column' sx={{ display: 'flex', width: '100%', }} >
                    <Stack
                        onMouseOver={() => { handleHoverInName() }}
                        onMouseOut={() => { handleHoverOutName() }}
                        direction='row' spacing={1} sx={{ margin: 1 }}>
                        <Badge color='info' badgeContent={tasks && tasks.length} max={999} sx={{ marginRight: 2 }}>
                            <Avatar
                                onClick={(event) => { handleOpenPerson(event) }}
                                sx={person && { bgcolor: stringToPastelColor(person.person_id, 'hex'), }}
                                alt={person && person.name}
                            />
                        </Badge>
                        <Menu
                            id="person-option"
                            anchorEl={anchorEl}
                            open={openPersonOption}
                            onClose={() => { handleClosePerson() }}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => { handleDeletePerson(person) }}>Delete</MenuItem>
                        </Menu>
                        {
                            (hover && !editing) &&
                            <IconButton
                                sx={{ padding: 0 }}
                                onClick={() => { setEditing(true) }}>
                                <EditIcon />
                            </IconButton>
                        }
                        <InputBase
                            fullWidth
                            disabled={!editing}
                            value={name}
                            inputProps={{ maxLength: 150 }}
                            inputRef={input => (input && editing) && input.focus()}
                            onFocus={(event) => { event.target.select() }}
                            onChange={(event) => { handleChangeName(event.target.value) }}
                            onBlur={() => { handleBlurName() }}
                            sx={{
                                fontSize: 'x-large', fontWeight: 400,
                                '& .Mui-disabled': { WebkitTextFillColor: 'rgba(0,0,0,0.87)' }
                            }}
                        />
                    </Stack>
                    <ToggleButtonGroup
                        color="primary"
                        value={tab}
                        size='small'
                        exclusive
                        onChange={handleChange}
                        aria-label="person-tab"
                        sx={{ marginBottom: 0.1, marginLeft: 'auto', height: 'fit-content', alignSelf: 'flex-end' }}>

                        <ToggleButton
                            sx={{
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 0,
                                borderEndStartRadius: 0,
                                borderEndEndRadius: 0
                            }}
                            value="Doing">
                            {'Doing (' + initTask?.filter((task) => task.is_completed === false).length + ')'}
                        </ToggleButton>

                        <ToggleButton value="Completed">
                            {'Completed (' + initTask?.filter((task) => task.is_completed === true).length + ')'}
                        </ToggleButton>
                        <ToggleButton sx={{
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 12,
                            borderEndStartRadius: 0,
                            borderEndEndRadius: 0
                        }} value="Calendar">Calendar</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </DialogTitle>
            <DialogContent>
                {
                    tasks?.length > 0 ?
                        < TaskContainer tasks={tasks} /> :
                        <Lottie animationData={animation_lkdloo8y} loop={true} />
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { handleCloseDialog() }}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PersonDialog