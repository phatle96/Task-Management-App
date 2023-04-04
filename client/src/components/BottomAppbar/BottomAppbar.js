import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Chip } from '@mui/material';

import Fab from '@mui/material/Fab';



const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

export default function BottomAppBar() {
    return (
        <React.Fragment>
            <CssBaseline />

            <AppBar position="fixed"
                color="primary"
                sx={{ top: 'auto', bottom: 0, display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' } }}>
                <Toolbar>
                    <Chip label="Chip Outlined" variant="outlined"/>
                    <Chip label="Chip Outlined" variant="outlined"/>
                    <Chip label="Chip Outlined" variant="outlined"/>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}