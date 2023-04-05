import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AccordionAddTask from '../AccordionAddTask/AccordionAddTask';
import TaskContainer from '../TaskContainer/TaskContainer';
import { Badge, Stack, Typography } from '@mui/material';
import {styled} from '@mui/material';
import StyledToggleButton from '../StyledToggleButton/StyledToggleButton';

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
        <Box sx={{ typography: 'body1' }}>
            <Typography variant='h3' paddingBottom={1}>
                another task
            </Typography>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Doing" value="1" />
                        <StyledBadge badgeContent={4} color="primary" >
                        </StyledBadge>
                        <Tab label="Completed" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">

                    <AccordionAddTask />
                    <Stack direction="row" justifyContent="end" paddingBottom={1}>
                        <StyledToggleButton />
                    </Stack>
                    <TaskContainer />
                </TabPanel>
                <TabPanel value="2">Completed item</TabPanel>
            </TabContext>
        </Box>
    );
}