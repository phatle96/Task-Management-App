import { Box, Avatar, List, ListItem, ListItemText, ListItemButton, Divider, ListItemIcon, Typography } from "@mui/material";
import { useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { selectAllLists, fetchLists, } from "../../features/lists/listsSlice";
import { listFilterChanged, selectFilters, } from "../../features/filters/filtersSlice";


const NavBar = () => {

	const dispatch = useDispatch();
	const status = useSelector((state) => state.lists.status);
	const lists = useSelector(selectAllLists);
	const filters = useSelector(selectFilters);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchLists())
		}
	}, [status, dispatch])

	const handleFilter = (list) => {
		dispatch(listFilterChanged({ list: list.list_id }))
	}

	const handleResetFilter = () => {
		dispatch(listFilterChanged({ list: null }))
	}

	const handleCreateList = () => {
		dispatch(listFilterChanged({ list: 'create' }))
	}

	return (
		<Box position="static">
			<Box sx={{ maxWidth: 245 }}>
				<List
					sx={{ display: { lg: "block", md: "block", sm: "none", xs: "none", height: 56 }, }}>
					<ListItem>
						<ListItemButton
							selected={filters.list === 'create'}
							onClick={handleCreateList}
							sx={{ minHeight: 30, borderRadius: '10px' }}>
							<ListItemIcon sx={{ justifyContent: 'center' }}>
								<Avatar>
									<AddIcon />
								</Avatar>
							</ListItemIcon>
							<ListItemText
								primary="Create new list"
								primaryTypographyProps={{ letterSpacing: 0.5, noWrap: true }}
								sx={{ display: { lg: "block", md: "none", sm: "none", xs: "none" }, paddingLeft: 0.5 }} />
						</ListItemButton>
					</ListItem>
					<Divider />
					<ListItem component={Link} to="/">
						<ListItemButton
							onClick={handleResetFilter}
							selected={filters.list === null}
							sx={{ borderRadius: '10px' }}>
							<ListItemIcon sx={{ justifyContent: 'center' }}>
								<Avatar>
									A
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
								selected={filters.list === list.list_id}
							>
								<ListItemIcon sx={{ justifyContent: 'center' }}>
									<Avatar sx={{ bgcolor: list.color }}>
										<Typography variant="button">
											{list.name.charAt(0)}
										</Typography>
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