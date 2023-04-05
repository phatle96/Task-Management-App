import { Box, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemButton } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import { React, useState } from "react";
import axios from "axios";
import { useLists } from "../../context/ListsContext";


const NavBar = () => {
	const { data } = useLists();
	console.log(data)
	return (
		<Box position="static" sx={{ maxWidth:360 }} >
			<List  sx={{
				display: { lg: "block", md: "block", sm: "none", xs: "none" }
			}}>

				{data.map(list => (
					<ListItem key={list.list_id}>
						<ListItemButton component="a" href={`#${list.list_id}`}>
							<ListItemAvatar >
								<Avatar>
									<WorkIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={list.name}
								//secondary={list.createdAt}
								sx={{display: { lg: "block", md: "none", sm: "none", xs: "none" } }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)
}

export default NavBar;