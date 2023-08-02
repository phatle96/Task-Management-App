import * as React from 'react';
import { Avatar, Badge, BottomNavigation, BottomNavigationAction, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Typography } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllLists } from '../../features/lists/listsSlice';
import { listFilterChanged, resetFilter, selectFilters } from '../../features/filters/filtersSlice';
import TaskDialog from '../TaskDialog/TaskDialog';
import HomeIcon from '@mui/icons-material/Home';
import { selectAllTasks } from '../../features/tasks/tasksSlice';
import NavListItemSkeleton from '../Skeletons/NavListItemSkeleton';


export default function BottomAppbar() {

    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false)
    const [openAdd, setOpenAdd] = React.useState(false)

    const dispatch = useDispatch();
    const lists = useSelector(selectAllLists)
    const filters = useSelector(selectFilters);
    const tasks = useSelector(selectAllTasks)
    const status = useSelector((state) => state.lists.status);

    const toggleDrawer = (list, openState) => {
        // if (
        //     event &&
        //     event.type === 'keydown' &&
        //     (event.key === 'Tab' || event.key === 'Shift')
        // ) {
        //     return;
        // }
        if (list) {
            if (list === 'None') {
                dispatch(listFilterChanged({ list: null }))
            }
            else {
                dispatch(listFilterChanged({ list: list.list_id }))
            }
        }
        setOpen(openState)
        console.log('open', open)
    }

    const handleCreateList = () => {
        dispatch(listFilterChanged({ list: 'create' }))
        setOpen(false)
    }

    const list = () => (
        <Box role='presentation'>
            <List >
                <ListItem sx={{ paddingY: 0.25 }}>
                    <ListItemButton
                        sx={{ minHeight: 30, borderRadius: '10px' }}
                        component="a"
                        onClick={() => { handleCreateList() }}
                        onKeyDown={() => { handleCreateList() }}
                        selected={filters.list === 'create'}
                    >
                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                            <Avatar >
                                <AddIcon />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText
                            primary='New list'
                            primaryTypographyProps={{
                                fontWeight: 'medium',
                                variant: 'body2',
                                noWrap: true,
                                color: 'text.primary'
                            }}
                            sx={{
                                paddingLeft: 0.5
                            }}
                        />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem sx={{ paddingY: 0.25 }}>
                    <ListItemButton
                        sx={{ minHeight: 30, borderRadius: '10px' }}
                        component="a"
                        onClick={() => { toggleDrawer('None', false) }}
                        onKeyDown={() => { toggleDrawer('None', false) }}
                        selected={filters.list === null}
                    >
                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                            <Avatar >
                                <Typography variant="button">
                                    A
                                </Typography>
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText
                            primary='View All Tasks'
                            secondary={tasks.filter(task => task.is_completed === false).length &&
                                `${tasks.filter(task => task.is_completed === false).length} remaining`}
                            primaryTypographyProps={{
                                fontWeight: 'medium',
                                variant: 'body2',
                                noWrap: true,
                                color: 'text.primary'
                            }}
                            sx={{
                                paddingLeft: 0.5
                            }}
                        />
                    </ListItemButton>
                </ListItem>
                {
                    status === 'loading' ?
                        Array.from(Array(5).keys()).map(
                            element =>
                                <NavListItemSkeleton key={element} />
                        ) :
                        lists.map(list => (
                            <ListItem key={list.list_id} sx={{ paddingY: 0.25 }}>
                                <ListItemButton
                                    sx={{ minHeight: 30, borderRadius: '10px' }}
                                    component="a"
                                    onClick={() => { toggleDrawer(list, false) }}
                                    onKeyDown={() => { toggleDrawer(list, false) }}
                                    selected={filters.list === list.list_id}
                                >
                                    <ListItemIcon sx={{ justifyContent: 'center' }}>
                                        <Avatar sx={{ bgcolor: list.color }}>
                                            <Typography variant="button">
                                                {list.name.charAt(0)}
                                            </Typography>
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={list.name}
                                        secondary={tasks.filter(task => (task.list?.list_id === list?.list_id && task.is_completed === false)).length ?
                                            `${tasks.filter(task => (task.list?.list_id === list?.list_id && task.is_completed === false)).length} remaining` : false}
                                        primaryTypographyProps={{
                                            fontWeight: 'medium',
                                            variant: 'body2',
                                            noWrap: true,
                                            color: 'text.primary'
                                        }}
                                        sx={{
                                            paddingLeft: 0.5
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))
                }
            </List>
        </Box>
    )

    return (
        <Box sx={{
            display: { lg: "none", md: "none", sm: "block", xs: "block" },
            position: 'fixed', bottom: 0, left: 0, right: 0,
            borderTop: 1, borderColor: "gray"
        }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    onClick={() => { toggleDrawer(null, true) }}
                    label="Select list"
                    icon={<FormatListBulletedIcon />}
                />
                <BottomNavigationAction
                    onClick={() => { setOpenAdd(true) }}
                    label="add"
                    icon={<AddIcon />}
                />
            </BottomNavigation>
            <SwipeableDrawer
                anchor='bottom'
                open={open}
                onClose={() => { toggleDrawer(null, false) }}
            >
                {list()}
            </SwipeableDrawer>
            <TaskDialog open={openAdd} setOpen={setOpenAdd} />
        </Box >
    );
}