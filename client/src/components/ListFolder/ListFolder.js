import { useState, } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Avatar, Box, Chip, Typography } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { selectAllLists } from '../../features/lists/listsSlice';
import { useSelector } from 'react-redux';

const ListFolder = ({ list, setList }) => {


	const [anchorEl, setAnchorEl] = useState(null);

	const lists = useSelector(selectAllLists)


	const open = Boolean(anchorEl);

	const handleOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (select) => {
		if (select === undefined) {
			setAnchorEl(null);
		} else {
			setAnchorEl(null);
			setList(select);
		}
	};


	return (
		<Box sx={{ paddingBottom: 1 }}>
			<Chip
				icon={<FolderOpenIcon />}
				label={
					<Typography variant='caption' sx={{ display: "flex", alignItems: "center" }}>
						{list === null || list === undefined ? '' : list.name} <UnfoldMoreIcon fontSize='inherit' />
					</Typography>
				}
				size="small"
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={(e) => { handleOpen(e) }}
			/>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={() => { handleClose() }}
				MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
				{
					lists.map(select => {
						return (
							<MenuItem key={select.list_id} onClick={() => { handleClose(select) }}>
								{select.name}
							</MenuItem>
						)
					})
				}
			</Menu>
		</Box>
	);
}

export default ListFolder