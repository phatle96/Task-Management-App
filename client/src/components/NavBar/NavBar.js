import { Box, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Divider, ListItemIcon } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import { React, useState } from "react";
import axios from "axios";
import { useLists } from "../../context/ListsContext";
import AddIcon from '@mui/icons-material/Add';


const NavBar = () => {
	const { data } = useLists();
	console.log(data)
	return (
		<Box position="static"  >
			<Box sx={{ maxWidth: 300 }}>
				<List
					sx={{ display: { lg: "block", md: "none", sm: "none", xs: "none", height: 56 } }}>

					<ListItem>
						<ListItemButton sx={{ height: 60 }}>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText
								primary="Create new list"
								primaryTypographyProps={{
									letterSpacing: 0.5,
									noWrap: 1
								}} />

						</ListItemButton>
					</ListItem>
					<Divider />
					{data.map(list => (
						<ListItem key={list.list_id}>
							<ListItemButton sx={{ py: 0, minHeight: 30 }} component="a" href={`#${list.list_id}`}>
								<ListItemAvatar >
									<Avatar >
										<WorkIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={list.name}
									primaryTypographyProps={{
										fontWeight: 'medium',
										variant: 'body2',
										letterSpacing: 0.5,
										noWrap: 1
									}}
								//secondary={list.createdAt}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>

			<Box sx={{ maxWidth: 80 }}>
				<List
					sx={{ display: { lg: "none", md: "block", sm: "none", xs: "none", height: 56 } }}>
					<ListItem>
						<ListItemButton sx={{ height: 60 }}>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
					<Divider />

					{data.map(list => (
						<ListItem key={list.list_id}>
							<ListItemButton sx={{ py: 0, minHeight: 30 }} component="a" href={`#${list.list_id}`}>
								<ListItemAvatar >
									<Avatar >
										<WorkIcon />
									</Avatar>
								</ListItemAvatar>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Box >
	)
}

export default NavBar;