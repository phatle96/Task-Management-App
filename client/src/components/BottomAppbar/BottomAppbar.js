import * as React from 'react';
import { Avatar, BottomNavigation, BottomNavigationAction, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Typography } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllLists } from '../../features/lists/listsSlice';
import { listFilterChanged, selectFilters } from '../../features/filters/filtersSlice';
import { Link } from 'react-router-dom';
import TaskDialog from '../TaskDialog/TaskDialog';



export default function BottomAppbar() {

    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false)
    const [openAdd, setOpenAdd] = React.useState(false)

    const dispatch = useDispatch();
    const lists = useSelector(selectAllLists)
    const filters = useSelector(selectFilters);

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
            <List>
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
                {lists.map(list => (
                    <ListItem component={Link} to={list.name} key={list.list_id} sx={{ paddingY: 0.25 }}>
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
                ))}
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
                swipeAreaWidth={56}
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