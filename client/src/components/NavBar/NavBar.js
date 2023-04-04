import { Box, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import { React } from "react";



const NavBar = ({ data }) => {
	console.log({data})

	return (
		<Box position="fixed">
			<List sx={{
				width: '100%',
				display: { lg: "block", md: "block", sm: "block", xs: "none" }
			}}>
				{data.map(list => 
					<ListItem key={list.list_id}>
						<ListItemAvatar>
							<Avatar>
								<WorkIcon />
							</Avatar>
						</ListItemAvatar>F
						<ListItemText
							primary={list.name}
							secondary={list.createdAt}
							sx={{ display: { lg: "block", md: "none", sm: "none", xs: "none" } }}
						/>
					</ListItem>

				)}
			</List>
		</Box>
	)
}

export default NavBar;