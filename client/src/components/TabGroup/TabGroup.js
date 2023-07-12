import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TaskContainer from '../TaskContainer/TaskContainer';
import { Badge, Stack } from '@mui/material';
import { styled } from '@mui/material';
import StyledToggleButton from '../StyledToggleButton/StyledToggleButton';
import MyCalendar from '../Calendar/Calendar';
import { selectTasksByStatusLength } from '../../features/tasks/tasksSlice';
import { tasksCompletedFilterChanged, selectFilters } from '../../features/filters/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 9,
        top: 18,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export default function TabGroup() {

    const [value, setValue] = useState('1');
    const dispatch = useDispatch();
    const totalTasks = useSelector(selectTasksByStatusLength)
    const filters = useSelector(selectFilters);

    const handleChange = (e, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case '1': {
                dispatch(tasksCompletedFilterChanged({ completed: false }))
                break
            }

            case '2': {
                dispatch(tasksCompletedFilterChanged({ completed: true }))
                break
            }
            default:
                return;
        };
    };

    const renderTabPanel = () => {
        let tabPanel = {
            '1': <TaskContainer />,
            '2': <TaskContainer />,
            '3': <MyCalendar />,
        }
        return (
            tabPanel[value]
        )
    }

    return (
        <Stack position="relative" display="flex"
            sx={{ typography: 'body1', display: { lg: "block", md: "block", sm: "block", xs: "block" } }} >
            <TabContext value={value}>
                <Stack display="flex" direction="column" justifyContent="space-between" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList aria-label="tab-list" sx={{ display: "flex" }}>
                        {tabs?.map((tab) => {
                            return (
                                <>
                                    <Tab selected={tab.value === value} onChange={handleChange} label={tab.label} value={tab.value} key={tab.value} />
                                    {(tab.value === '1' || tab.value === '2') && value === tab.value &&
                                        <StyledBadge badgeContent={totalTasks} color="primary" />}
                                </>
                            )
                        })}
                    </TabList>
                </Stack >
                <Stack direction="row" sx={{ paddingLeft: 3, paddingTop: 3 }} >
                    <StyledToggleButton />
                </Stack>
                <TabPanel value={value}>
                    {renderTabPanel()}
                </TabPanel>
            </TabContext>
        </Stack>
    );
}



const tabs = [
    { label: "Doing", value: '1' },
    { label: "Complete", value: '2' },
    { label: "Calendar", value: '3' },
]