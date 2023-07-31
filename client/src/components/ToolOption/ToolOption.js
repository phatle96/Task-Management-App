import { Box, IconButton, InputBase, Snackbar, Tooltip } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import NotificationsIcon from '@mui/icons-material/Notifications';
// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

import MuiAlert from '@mui/material/Alert';
import React from 'react';



const ToolOption = () => {
    //Search bar

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));


    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('xs')]: {
                width: '8ch',
                '&:focus': {
                    width: '15ch',
                },
            },
        },
    }));


    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingRight: 2 }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon color='info' />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onClick={handleClick}
                />
            </Search>
            <IconButton size='small' onClick={handleClick}>
                <Tooltip title='Notification'>
                    <NotificationsIcon color='info' />
                </Tooltip>
            </IconButton>
            <IconButton size='small' onClick={handleClick}>
                <Tooltip title='Account'>
                    <PersonIcon color="info" />
                </Tooltip>
            </IconButton>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    Work in progress, feature is coming soon...
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default ToolOption