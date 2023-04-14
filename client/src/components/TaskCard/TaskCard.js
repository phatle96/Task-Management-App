import * as React from 'react';
import {
	Box, Card, Typography, Checkbox, CardActions, Stack, Chip, Avatar, AccordionSummary, Accordion, AccordionDetails, TextField, CardContent, CardHeader, AvatarGroup, Tooltip
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

	const dateString = (date) => {
		const d = new Date(date);
		return d.toLocaleDateString();
	}

	const dateDiffInDays = (a, b) => {
		const _MS_PER_DAY = 1000 * 60 * 60 * 24;
		// Discard the time and time-zone information.
		const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
		const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
		return Math.floor((utc2 - utc1) / _MS_PER_DAY);
	}

	const alertTime = (time) => {
		const d = new Date(time);
		const now = new Date(Date.now());
		const datediff = dateDiffInDays(now, d)
		if (Math.sign(datediff) === -1) {
			const abs = Math.abs(datediff)
			return `(Over due ${abs} days)`
		} else {
			return `(${datediff} days left)`
		}
	}



	return (
		<Box sx={{ width: "100%", wordBreak: 'break-all', paddingY: 1 }}>
			<Stack direction="column" spacing={0.25} sx={{ width: "100%" }}>
				<Stack direction="row" sx={{ width: "100%", paddingRight: 1, paddingY: 2, borderBottom: 1, justifyContent: "space-between" }}>
					<Typography variant='body2'>
						{dateString(`${data.createdAt}`)}
					</Typography>
					{data.alert &&
						<Tooltip title={data.alert}>
							<Typography variant="body2">
								{alertTime(`${data.alert}`)}
							</Typography>
						</Tooltip>
					}
				</Stack>
				<Box sx={{ paddingTop: 1 }}>
					<Typography variant='body1'>
						{data.content}
					</Typography>
				</Box>
				<Box>
					{
						data.person.length >= 1 && (
							<AvatarGroup max={5} sx={{ '& .MuiAvatar-root': { width: 23, height: 23, fontSize: 15 }, justifyContent: "flex-end" }}>
								{data.person.map(person => (
									<Tooltip title={person.name}>
										<Avatar alt={person.name}
											sx={{ bgcolor: stringToColor(`${person.name}`), width: 23, height: 23 }}>
											{person.default_avatar}
										</Avatar>
									</Tooltip>
								))}
							</AvatarGroup>
						)
					}
				</Box>
			</Stack>
		</Box>

	);
}

export default TaskCard; 