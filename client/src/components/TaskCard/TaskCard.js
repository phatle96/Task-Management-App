import * as React from 'react';
import {
	Box, Typography, Stack, Avatar, AvatarGroup, Tooltip, Chip
} from '@mui/material';

import { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


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

	const alertTime = (data) => {
		const d = new Date(data.alert);
		const now = new Date(Date.now());
		const datediff = dateDiffInDays(now, d)
		if (Math.sign(datediff) === -1) {
			const abs = Math.abs(datediff)
			const label = `Over due ${abs} days`
			return (
				<Tooltip title={data.alert} >
					<Chip icon={<AccessTimeIcon />} label={label} size="small" color='error' />
				</Tooltip>
			)
		} else {
			const label = `${datediff} days left`
			return (
				<Tooltip title={data.alert}>
					<Chip icon={<AccessTimeIcon />} label={label} size="small" color='info' />
				</Tooltip>
			)

		}
	}


	return (
		<Box sx={{ width: "100%", wordBreak: 'break-all', paddingY: 0.5 }}>
			<Stack direction="column" spacing={0.25} sx={{ width: "100%" }}>
				<Stack direction="row"
					sx={{ width: "100%", paddingRight: 1, paddingY: 1, borderBottom: 0.25, borderColor: "lightslategrey", justifyContent: "space-between", alignItems: "flex-end" }}>
					<Stack direction="row" spacing={1} sx={{ alignItems: "flex-end" }}>
						<Chip label={dateString(`${data.createdAt}`)} size="small" />
						{data.alert &&
							alertTime(data)
						}
					</Stack>
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
				<Box sx={{ paddingTop: 2 }}>
					{data.is_completed ?
						(
							<Typography variant='body1' sx={{ textDecoration: "line-through" }}>
								{data.content}
							</Typography>
						) :
						(
							<Typography variant='body1' >
								{data.content}
							</Typography>
						)
					}
				</Box>

			</Stack>
		</Box>

	);
}

export default TaskCard; 