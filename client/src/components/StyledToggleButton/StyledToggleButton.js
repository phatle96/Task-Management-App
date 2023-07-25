import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Chip, Divider, List, ListItem, ListSubheader, Stack, Tabs, } from '@mui/material';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function StyledToggleButton() {
	const [options, setOptions] = React.useState(() => []);

	const handleOptions = (event, nextControl) => {
		setOptions(nextControl);
	};

	return (
		<List sx={{ display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
			<Tabs
				scrollButtons='auto'>
				<ListSubheader>
					Filter:
				</ListSubheader>
				<ListItem sx={{ paddingY: 0, paddingX: 0.5 }}>
					<Chip
						clickable
						variant='outlined'
						icon={<ArrowUpwardIcon fontSize='inherit' />}
						label='Sort by xxx'
					/>
				</ListItem>
				<ListItem sx={{ paddingY: 0, paddingX: 0.5 }}>
					<Chip
						clickable
						variant='outlined'
						icon={<ArrowUpwardIcon fontSize='inherit' />}
						label='Sort by aaa'
					/>
				</ListItem>
				<ListItem sx={{ paddingY: 0, paddingX: 0.5 }}>
					<Chip
						clickable
						variant='outlined'
						icon={<ArrowUpwardIcon fontSize='inherit' />}
						label='Sort by aaa'
					/>
				</ListItem>
				<ListItem sx={{ paddingY: 0, paddingX: 0.5 }}>
					<Chip
						clickable
						variant='outlined'
						icon={<ArrowUpwardIcon fontSize='inherit' />}
						label='Sort by aaa'
					/>
				</ListItem>
				<ListItem sx={{ paddingY: 0, paddingX: 0.5 }}>
					<Chip
						clickable
						variant='outlined'
						icon={<ArrowUpwardIcon fontSize='inherit' />}
						label='Sort by aaa'
					/>
				</ListItem>
				<ListItem sx={{ paddingY: 0, paddingX: 0.5 }}>
					<Chip
						clickable
						variant='outlined'
						icon={<ArrowUpwardIcon fontSize='inherit' />}
						label='Sort by aaa'
					/>
				</ListItem>
				<Divider orientation="vertical" />
				<ListSubheader>
					Sort:
				</ListSubheader>
				<ListItem sx={{ paddingY: 0, paddingX: 0.5 }}>
					<Chip
						clickable
						variant='outlined'
						icon={<ArrowUpwardIcon fontSize='inherit' />}
						label='Sort by aaa'
					/>
				</ListItem>
				<ListItem sx={{ paddingY: 0, paddingX: 0.5 }}>
					<Chip
						clickable
						variant='outlined'
						icon={<ArrowUpwardIcon fontSize='inherit' />}
						label='Sort by aaa'
					/>
				</ListItem>
				<ListItem sx={{ paddingY: 0, paddingX: 0.5 }}>
					<Chip
						clickable
						variant='outlined'
						icon={<ArrowUpwardIcon fontSize='inherit' />}
						label='Sort by aaa'
					/>
				</ListItem>
			</Tabs>
		</List>
	);
}

const filterMenu = ['have_assigned', 'have_subtasks', 'is_setDay', 'have_people', 'is_coming', 'on_going', 'is_ended', 'is_error',]

const sortMenu = ['by_createdDate', 'by_startDate', 'by_peopleAssigned', 'by_subtaskLength']