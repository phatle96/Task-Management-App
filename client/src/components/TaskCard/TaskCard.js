import * as React from 'react';
import { Box, Typography, Stack, Avatar, AvatarGroup, Tooltip } from '@mui/material';

import TimeChip from '../TimeChip/TimeChip';

import { stringToPastelColor } from '../../utils/color';


const TaskCard = ({ data }) => {

	return (
		<Box sx={{ width: "100%", wordBreak: 'break-all', paddingY: 0.5 }}>
			<Stack direction="column" spacing={0.25}>
				{(data.person.length || data.start_date) &&
					<Stack direction="row"
						sx={{
							width: "100%", paddingRight: 1, paddingY: 1,
							borderBottom: 0.25, borderColor: 'darkgray', justifyContent: "space-between",
							minHeight: 45
						}}>
						<Stack direction="row" spacing={1}>
							{data.start_date &&
								<TimeChip data={data} />
							}
						</Stack>
						<Box>
							{
								data?.person && (
									<AvatarGroup max={5} sx={{ '& .MuiAvatar-root': { width: 23, height: 23, fontSize: 15 }, justifyContent: "flex-end" }}>
										{data.person.map(person => (
											<Tooltip title={person.name} key={person.person_id}>
												<Avatar alt={person.name}
													sx={{ bgcolor: stringToPastelColor(person.person_id, 'hex'), width: 23, height: 23 }}>
													{person.default_avatar}
												</Avatar>
											</Tooltip>
										))}
									</AvatarGroup>
								)
							}
						</Box>
					</Stack>
				}
				<Box sx={{ paddingTop: 2 }}>
					<Typography variant='body1' sx={data.is_completed && { textDecoration: "line-through" }}>
						{data.content}
					</Typography>

				</Box>

			</Stack >
		</Box >

	);
}

export default TaskCard; 