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


    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    const count_completed = (is_completed) => {
        return filterResults.filter(task => task.is_completed === is_completed).length
    };

    const renderTabPanel = () => {
        let obb = {
            '1': <TaskContainer isCompleted={false} />,
            '2': <TaskContainer isCompleted={true} />,
            '3': <PeopleContainer />,
            '4': <MyCalendar />,
        }
        return (
            obb[value]
        )
    }

    return (
        <Stack position="relative" display="flex"
            sx={{ typography: 'body1', display: { lg: "block", md: "block", sm: "block", xs: "block" } }} >
            <TabContext value={value}>
                <Stack display="flex" direction="column" justifyContent="space-between" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList aria-label="tab-list" sx={{ display: "flex" }}>
                        {a?.map((x) => {
                            return (
                                <>
                                    <Tab selected={x.value === value} onChange={handleChange} label={x.label} value={x.value} key={x.value} />
                                    {x.value === '1' && value === x.value && <StyledBadge badgeContent={count_completed(false)} color="primary" />}
                                    {x.value === '2' && value === x.value && <StyledBadge badgeContent={count_completed(true)} color="primary" />}
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

const a = [
    { label: "Doing", value: '1' },
    { label: "Complete", value: '2' },
    { label: "People", value: '3' },
    { label: "Calendar", value: '4' },
]