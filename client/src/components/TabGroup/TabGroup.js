import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TaskContainer from '../TaskContainer/TaskContainer';
import { Button, Chip, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import StyledToggleButton from '../StyledToggleButton/StyledToggleButton';
import MyCalendar from '../Calendar/Calendar';
import { selectTasksByStatus, selectTasksByStatusLength } from '../../features/tasks/tasksSlice';
import { tasksCompletedFilterChanged } from '../../features/filters/filtersSlice';
import { useDispatch, useSelector } from 'react-redux';
import PeopleList from '../PeopleList/PeopleList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function TabGroup() {
	const taskByStatus = useSelector(selectTasksByStatus)

	const tabs = [
		{ value: '1', label: "Doing" },
		{ value: '2', label: "Complete" },
		{ value: '0', label: '' }
	]

	const tabPanel = {
		'1': <TaskContainer />,
		'2': <TaskContainer />,
	}

	const [anchorEl, setAnchorEl] = useState(null);
	const openMore = Boolean(anchorEl);

	const [tabList, setTabList] = useState(tabs)
	const [panel, setPanel] = useState(tabPanel)
	const [value, setValue] = useState('1');
	const dispatch = useDispatch();
	const totalTasks = useSelector(selectTasksByStatusLength)



	const renderTabPanel = () => {
		return (
			panel[value]
		)
	}

	const TabIcon = ({ value, tabValue }) => {
		if (tabValue === value) {
			switch (value) {
				case '1':
				case '2': {
					return (
						< Chip
							sx={{
								fontSize: 'x-small',
								height: 'fit-content',
								paddingY: 0.5,
								position: 'relative',
								top: '-5px',
								marginLeft: 0.25
							}}
							color='info' size='small'
							variant='filled'
							label={totalTasks > 999 ? '999+' : totalTasks}
						/>
					)
				}
				case '0': {
					return (
						<IconButton sx={{ '& .MuiIconButton-root.Mui-disabled': { padding: 0 } }} color='info'  >
							<ArrowDropDownIcon />
						</IconButton>
					)
				}

			}
		} else if (tabValue === '0') {
			return (
				<IconButton color='info' disabled={value !== '0'}>
					<ArrowDropDownIcon />
				</IconButton>
			)
		}

	}

	const MoreMenu = () => {
		return (
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={openMore}
				onClose={() => { handleSelectMore() }}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={() => { handleSelectMore('Calendar') }}>Calendar</MenuItem>
				<MenuItem onClick={() => { handleSelectMore('People') }}>People</MenuItem>
			</Menu>
		)
	}

	const handleChange = (event, newValue) => {
		switch (newValue) {
			case '1': {
				setValue(newValue);
				dispatch(tasksCompletedFilterChanged({ completed: false }))
				break
			}
			case '2': {
				setValue(newValue);
				dispatch(tasksCompletedFilterChanged({ completed: true }))
				break
			}
			case '0': {
				setAnchorEl(event.currentTarget);
				break
			}
			default:
				return;
		};
	};

	const handleSelectMore = (value) => {
		if (value) {
			setValue('0')
			const tabsIndex = tabs.findIndex(tab => tab.value === '0')
			switch (value) {
				case 'Calendar': {
					tabPanel['0'] = <MyCalendar />
					break
				}
				case 'People': {
					tabPanel['0'] = <PeopleList />
					break
				}
			}
			tabs[tabsIndex].label = value
			setTabList(tabs)
			setPanel(tabPanel)
		}
		setAnchorEl(null);
	};


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
						{tabList?.map((tab) => {
							return (
								<Tab
									onClick={(event) => { handleChange(event, tab.value) }}
									selected={tab.value === value}
									label={tab.label}
									icon={<TabIcon value={value} tabValue={tab.value} />}
									iconPosition='end'
									value={tab.value}
									key={tab.value}
									sx={{ minHeight: 'auto', paddingY: 0 }}
								/>
							)
						})}
					</TabList>
					<MoreMenu />
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



