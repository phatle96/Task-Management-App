import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddIcon from '@mui/icons-material/Add';
import AddTask from '../AddTask/AddTask';
import TaskDetail from '../TaskDetail/TaskDetail';
import PersonDetail from '../PersonDetail/PersonDetail';

export default function TabTool() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Add"  value="1" />
                        <Tab label="Task detail" value="2" />
                        <Tab label="Person detail" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <AddTask />
                </TabPanel>
                <TabPanel value="2">
                    <TaskDetail />
                    <TaskDetail />
                </TabPanel>
                <TabPanel value="3">
                    <PersonDetail />
                    <PersonDetail />
                    <PersonDetail />
                </TabPanel>
            </TabContext>
        </Box>
    );
}