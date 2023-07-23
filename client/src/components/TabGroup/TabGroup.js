import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TaskContainer from '../TaskContainer/TaskContainer';
import { Chip, Stack } from '@mui/material';
import StyledToggleButton from '../StyledToggleButton/StyledToggleButton';
import MyCalendar from '../Calendar/Calendar';
import { selectTasksByStatusLength } from '../../features/tasks/tasksSlice';
import { tasksCompletedFilterChanged } from '../../features/filters/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';
import PeopleList from '../PeopleList/PeopleList';

export default function TabGroup() {

	const [value, setValue] = useState('1');
	const dispatch = useDispatch();
	const totalTasks = useSelector(selectTasksByStatusLength)

	const handleChange = (newValue) => {
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
			'4': <PeopleList />
		}
		return (
			tabPanel[value]
		)
	}


	return (
		<Stack position="relative" display="flex"
			sx={{ typography: 'body1', display: { lg: "block", md: "block", sm: "block", xs: "block" } }} >
			<TabContext value={value}>
				<Stack
					display="flex"
					direction="column"
					justifyContent="space-between"
					sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList aria-label="tab-list" sx={{ display: "flex" }}>
						{tabs?.map((tab) => {
							return (
								<Tab
									onClick={() => { handleChange(tab.value) }}
									selected={tab.value === value}
									label={tab.label}
									icon={
										(value === tab.value && (value === '1' || value === '2')) &&
										< Chip
											sx={{ fontSize: 'x-small', height: 'fit-content', paddingY: 0.5, top: '-3', position: 'relative', top: '-5px', marginLeft: 0.25 }}
											color='info' size='small'
											variant='filled'
											label={
												totalTasks > 999 ? '999+' : totalTasks
											} />
									}
									iconPosition='end'
									value={tab.value}
									key={tab.value}
									sx={{ minHeight: 'auto' }}
								/>

							)
						})}

					</TabList>
				</Stack >
				<Stack direction="row" sx={{ paddingLeft: 3, paddingTop: 3 }} >
					{(value === '1' || value === '2') &&
						< StyledToggleButton />}
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
	{ label: "People", value: '4' }
]