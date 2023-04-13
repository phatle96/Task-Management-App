import * as React from 'react';
import {
	Box, Card, Typography, Checkbox, CardActions, Stack, Chip, Avatar, AccordionSummary, Accordion, AccordionDetails, TextField, CardContent, CardHeader, AvatarGroup
} from '@mui/material';
import { AccessAlarm } from '@mui/icons-material';
import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';


const TaskCard = ({ data }) => {
	const [rows, setRow] = useState(1)


	function stringToColor(string) {
		let hash = 0;
		let i;

		/* eslint-disable no-bitwise */
		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}

		let color = '#';

		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff;
			color += `00${value.toString(16)}`.slice(-2);
		}
		/* eslint-enable no-bitwise */

		return color;
	}

	function stringAvatar(name) {
		return {
			sx: {
				bgcolor: stringToColor(name),
			},
		};
	}


	return (
		<Box sx={{ width: "100%" }}>
			<Stack direction="row">
				<Box >
					<CardActions>
						<Checkbox />
					</CardActions>
				</Box>
				<Box sx={{ width: "100%" }}>
					<Stack direction="row">
						<Box>
							{
								data.person.length > 1 ? (
									<AvatarGroup total={data.person.length - 1}>
										<Avatar alt={data.person[0].name}  {...stringAvatar(`${data.person[0].name}`)}>
											{data.person[0].default_avatar}
										</Avatar>
									</AvatarGroup>
								) : (
									<></>
								)
							}
						</Box>

					</Stack>

					<Box>
						<Typography variant='body1'>
							testtttttttttttttttttttttttttttttttttttesttttttttttttttttttttttttttttttttttttesttttttttttttttttttttttttttttttttttt
						</Typography>

					</Box>
				</Box>
			</Stack>
		</Box>

	);
}

export default TaskCard; 