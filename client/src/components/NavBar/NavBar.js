import { Box, Avatar, List, ListItem, ListItemText, ListItemButton, Divider, ListItemIcon } from "@mui/material";
import { DataContext } from "../../context/DataContext";
import { useContext, useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import WorkIcon from '@mui/icons-material/Work';
import { Link } from 'react-router-dom';



const NavBar = () => {
	const { lists, setLists, filter, setFilter } = useContext(DataContext);

	const handleFilter = (list) => {
		setFilter({
			list_id: list.list_id,
			list_name: list.name
		});
	}

	const handleResetFilter = () => {
		setFilter({
			list_id: '',
			list_name: ''
		})
	}

	return (
		<Box position="static">
			<Box sx={{ maxWidth: 300 }}>
				<List
					sx={{ display: { lg: "block", md: "block", sm: "none", xs: "none", height: 56 }, }}>
					<ListItem>
						<ListItemButton sx={{ height: 60 }}>
							<ListItemIcon sx={{ justifyContent: 'center' }}>
								<Avatar>
									<AddIcon />
								</Avatar>
							</ListItemIcon>
							<ListItemText
								primary="Create new list"
								primaryTypographyProps={{
									letterSpacing: 0.5,
									noWrap: true
								}}
								sx={{
									display: { lg: "block", md: "none", sm: "none", xs: "none" },
									paddingLeft: 0.5
								}} />
						</ListItemButton>
					</ListItem>
					<Divider />
					<ListItem component={Link} to="/">
						<ListItemButton
							onClick={handleResetFilter}
							selected={filter.list_id === ''}
							sx={{ borderRadius: '10px' }}>
							<ListItemIcon sx={{ justifyContent: 'center' }}>
								<Avatar>
									<DensitySmallIcon />
								</Avatar>
							</ListItemIcon>
							<ListItemText
								primary='View All tasks'
								primaryTypographyProps={{
									fontWeight: 'medium',
									variant: 'body2',
									letterSpacing: 0.5,
									noWrap: true,
									color: 'text.primary'
								}}
								sx={{
									display: { lg: "block", md: "none", sm: "none", xs: "none" },
									paddingLeft: 0.5
								}}
							//secondary={list.createdAt}
							/>
						</ListItemButton>
					</ListItem>
					{lists.map(list => (
						<ListItem component={Link} to={list.name} key={list.list_id} sx={{ paddingY: 0.25 }}>
							<ListItemButton
								sx={{ minHeight: 30, borderRadius: '10px' }}
								component="a"
								onClick={() => handleFilter(list)}
								selected={filter.list_id === list.list_id}>
								<ListItemIcon sx={{ justifyContent: 'center' }}>
									<Avatar >
										<WorkIcon />
									</Avatar>
								</ListItemIcon>
								<ListItemText
									primary={list.name}
									primaryTypographyProps={{
										fontWeight: 'medium',
										variant: 'body2',
										noWrap: true,
										color: 'text.primary'
									}}
									sx={{
										display: { lg: "block", md: "none", sm: "none", xs: "none" },
										paddingLeft: 0.5
									}}
								//secondary={list.createdAt}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Box >
	)
}

export default NavBar;