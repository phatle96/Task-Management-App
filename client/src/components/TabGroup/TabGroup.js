import { useState, useContext } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TaskContainer from '../TaskContainer/TaskContainer';
import { Badge, Stack } from '@mui/material';
import { styled } from '@mui/material';
import StyledToggleButton from '../StyledToggleButton/StyledToggleButton';
import MyCalendar from '../Calendar/Calendar';
import { DataContext } from '../../context/DataContext';
import PeopleContainer from '../PeopleContainer/PeopleContainer';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 9,
        top: 18,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export default function TabGroup() {

    const { filterResults } = useContext(DataContext);
    const [value, setValue] = useState('1');


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const count_completed = (is_completed) => {
        return filterResults.filter(task => task.is_completed === is_completed).length
    };



    return (
        <Stack position="relative" display="flex"
            sx={{ typography: 'body1', display: { lg: "block", md: "block", sm: "block", xs: "block" } }} >
            <TabContext value={value}>
                <Stack display="flex" direction="column" justifyContent="space-between" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ display: "flex" }}>
                        <Tab label="Doing" value="1" />
                        {
                            value === '1' &&
                            <StyledBadge badgeContent={count_completed(false)} color="primary" >
                            </StyledBadge>
                        }
                        <Tab label="Completed" value="2" />
                        {
                            value === '2' &&
                            (<StyledBadge badgeContent={count_completed(true)} color="primary" >
                            </StyledBadge>)
                        }
                        <Tab label="People" value="3" />
                        <Tab label="Calendar" value="4" />
                    </TabList>
                </Stack >
                <Stack direction="row" sx={{ paddingLeft: 3, paddingTop: 3 }} >
                    <StyledToggleButton />
                </Stack>
                <TabPanel value="1" >
                    <TaskContainer isCompleted={false} />
                </TabPanel>
                <TabPanel value="2">
                    <TaskContainer isCompleted={true} />
                </TabPanel>
                <TabPanel value="3">
                    <PeopleContainer />
                </TabPanel>
                <TabPanel value="4">
                    <MyCalendar />
                </TabPanel>
            </TabContext>
        </Stack>
    );
}