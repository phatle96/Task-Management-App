import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TaskContainer from '../TaskContainer/TaskContainer';
import { Badge, Container, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material';
import StyledToggleButton from '../StyledToggleButton/StyledToggleButton';
import MyCalendar from '../Calendar/Calendar';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 9,
        top: 18,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export default function TabGroup() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Stack position="relative" display="flex" 
            sx={{ typography: 'body1', display: { lg: "block", md: "block", sm: "block", xs: "block" } }} >
            <TabContext value={value}>
                <Stack display="flex" direction="column" justifyContent="space-between" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ display: "flex" }}>
                        <Tab label="Doing" value="1" />
                        <StyledBadge badgeContent={4} color="primary" >
                        </StyledBadge>
                        <Tab label="Completed" value="2" />
                        <Tab label="People" value="3" />
                        <Tab label="Calendar" value="4" />
                    </TabList>
                </Stack >
                <Stack flexDirection="column" paddingRight={3} sx={{ alignSelf: "flex-end" }}>
                    <StyledToggleButton />
                </Stack>
                <TabPanel value="1" >
                    <TaskContainer />
                </TabPanel>
                <TabPanel value="2">Completed item</TabPanel>
                <TabPanel value="3">People here</TabPanel>
                <TabPanel value="4">
                    <MyCalendar />
                </TabPanel>
            </TabContext>
        </Stack>
    );
}