import * as React from 'react';
import { Alert, Box, Chip, Divider, List, ListItem, ListSubheader, Snackbar, Stack, } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import EventIcon from '@mui/icons-material/Event';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MuiAlert from '@mui/material/Alert';

export default function FilterOptions() {

	const [options, setOptions] = React.useState(() => []);

	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	return (
		<>
			<Stack
				direction='row'
				spacing={1}
				sx={{
					overflow: 'auto', width: '100%', position: 'relative', display: 'flex', alignItems: 'center',
					paddingY: 1, paddingLeft: 2
				}}>
				{
					featureOptions.map((feature) => (
						<>
							<Box key={feature.name}>
								{feature.name}
							</Box>
							{
								feature.options.map(
									(option) => (
										<Box key={option.name}
											onClick={handleClick}>
											<Chip
												clickable
												variant='outlined'
												icon={option.icon}
												label={option.name}
											/>
										</Box>
									)
								)
							}
							<Divider orientation='vertical' sx={{ paddingRight: 2 }} />
						</>
					))
				}
			</Stack >
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
					Work in progress, feature is coming soon...
				</Alert>
			</Snackbar>
		</>
	);
}

const featureOptions = [
	{
		name: 'Filter',
		options:
			[
				{ name: 'have assigned', icon: <PersonAddAlt1Icon fontSize='inherit' /> },
				{ name: 'have subtasks', icon: <ClearAllIcon fontSize='inherit' /> },
				{ name: 'have event', icon: <EventIcon fontSize='inherit' /> },
				{ name: 'is coming', icon: <EventNoteIcon fontSize='inherit' /> },
				{ name: 'on going', icon: <CelebrationIcon fontSize='inherit' /> },
				{ name: 'is ended', icon: <EventRepeatIcon fontSize='inherit' /> },
				{ name: 'is error date', icon: <EventBusyIcon fontSize='inherit' /> },
			]
	},
	{
		name: 'Sort',
		options:
			[
				{ name: 'created date', icon: <ArrowUpwardIcon fontSize='inherit' /> },
				{ name: 'event date', icon: <ArrowUpwardIcon fontSize='inherit' /> },
				{ name: 'total subtasks', icon: <ArrowUpwardIcon fontSize='inherit' /> }
			]
	},
]
