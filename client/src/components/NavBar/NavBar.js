import { Box, Avatar, List, ListItem, ListItemText, ListItemButton, Divider, ListItemIcon, Typography, Button, Stack, IconButton, Toolbar, Badge, Switch, FormControlLabel, Skeleton, Grow } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';

import { useSelector, useDispatch } from 'react-redux'
import { selectAllLists, fetchLists, } from "../../features/lists/listsSlice";
import { listFilterChanged, selectFilters, } from "../../features/filters/filtersSlice";
import { selectAllTasks } from "../../features/tasks/tasksSlice";
import NavListItemSkeleton from "../Skeletons/NavListItemSkeleton";


const NavBar = () => {

	const dispatch = useDispatch();
	const status = useSelector((state) => state.lists.status);
	const lists = useSelector(selectAllLists);
	const filters = useSelector(selectFilters);
	const tasks = useSelector(selectAllTasks)

	const [checked, setChecked] = useState(false)

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

	const handleShowBadge = () => {
		setChecked(!checked)
	}

	return (
		<Box position="static" >
			<Stack id='logo' direction='row' sx={{ minHeight: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 2 }}>
				<IconButton back sx={{ display: { lg: "none", md: "none", sm: "flex", xs: "none" } }}>
					<Avatar variant="square" sx={{
						bgcolor: 'black', color: 'white', fontSize: 'small',
						textDecoration: 'underline', textDecorationStyle: 'wavy',
					}}>
						todo
					</Avatar>
				</IconButton>
				<Button
					size="large"
					fullWidth
					sx={{
						display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
						fontSize: 'x-large', fontStyle: 'italic', fontWeight: 100,
						color: 'black', fontFamily: 'cursive',
						'&:hover': { textDecoration: 'underline', textDecorationStyle: 'wavy', textDecorationThickness: 'from-font', }
					}}>
					A todo list
				</Button>
			</Stack>
			<Box overflow='auto' flexDirection="column" display="flex" sx={{ maxWidth: 245, height: 'calc(100% - 135px)' }}>
				<List
					sx={{ display: { lg: "block", md: "block", sm: "block", xs: "none", height: 56 }, }}>
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
								primary="New list"
								primaryTypographyProps={{ letterSpacing: 0.5, noWrap: true }}
								sx={{ display: { lg: "block", md: "block", sm: "none", xs: "none" }, paddingLeft: 0.5 }} />
						</ListItemButton>
					</ListItem>
					<Divider />
					<ListItem overflow='auto' >
						<ListItemButton
							onClick={handleResetFilter}
							selected={filters.list === null}
							sx={{ borderRadius: '10px' }}>
							<ListItemIcon sx={{ justifyContent: 'center' }}>
								<Badge
									variant={checked ? 'standard' : 'dot'}
									badgeContent={tasks.filter(task => task.is_completed === false).length}
									color="primary">
									<Avatar>
										A
									</Avatar>
								</Badge>
							</ListItemIcon>
							<ListItemText
								primary='View All tasks'
								secondary={
									checked ? false :
										(
											tasks.filter(task => task.is_completed === false).length ?
												`${tasks.filter(task => task.is_completed === false).length} remaining` : false
										)
								}
								primaryTypographyProps={{
									fontWeight: 'medium',
									variant: 'body2',
									letterSpacing: 0.5,
									noWrap: true,
									color: 'text.primary'
								}}
								sx={{
									display: { lg: "block", md: "block", sm: "none", xs: "none" },
									paddingLeft: 0.5
								}}
							//secondary={list.createdAt}
							/>
						</ListItemButton>
					</ListItem>
					{
						status === 'loading' ?

							Array.from(Array(5).keys()).map(
								element =>
									<NavListItemSkeleton key={element} />
							) :
							lists.map(list => (
								<Grow in={!list.is_deleted}>
									<ListItem key={list.list_id} sx={{ paddingY: 0.25 }}>
										<ListItemButton
											sx={{ minHeight: 30, borderRadius: '10px' }}
											component="a"
											onClick={() => handleFilter(list)}
											selected={filters.list === list.list_id}
										>
											<ListItemIcon sx={{ justifyContent: 'center' }}>
												<Badge
													variant={checked ? 'standard' : 'dot'}
													badgeContent={tasks.filter(task => (task.list?.list_id === list?.list_id && task.is_completed === false)).length}
													color="primary">
													<Avatar sx={{ bgcolor: list.color }}>
														<Typography variant="button">
															{list.name.charAt(0)}
														</Typography>
													</Avatar>
												</Badge>
											</ListItemIcon>
											<ListItemText
												primary={list.name}
												secondary={
													checked ? false :
														(
															tasks.filter(task => (task.list?.list_id === list?.list_id && task.is_completed === false)).length ?
																`${tasks.filter(task => (task.list?.list_id === list?.list_id && task.is_completed === false)).length} remaining` : false
														)
												}
												primaryTypographyProps={{
													fontWeight: 'medium',
													variant: 'body2',
													noWrap: true,
													color: 'text.primary'
												}}
												sx={{
													display: { lg: "block", md: "block", sm: "none", xs: "none" },
													paddingLeft: 0.5
												}}
											//secondary={list.createdAt}
											/>
										</ListItemButton>
									</ListItem>
								</Grow>

							))}
				</List>
			</Box>
			<Box sx={{
				display: 'flex', height: '60px', justifyContent: 'end', alignContent: 'center',
				borderTopStyle: 'solid', borderColor: 'rgba(0, 0, 0, 0.12)', borderTopWidth: 'thin'
			}}>
				<FormControlLabel
					sx={{ display: { lg: 'flex', md: 'flex', sm: 'flex', xs: 'none' } }}
					control={<Switch
						checked={checked}
						onChange={handleShowBadge}
						size="small" />}
					label='Badge'
					labelPlacement="end" />
			</Box>
		</Box >
	)
}

export default NavBar;