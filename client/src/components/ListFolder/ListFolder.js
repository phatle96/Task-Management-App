import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Avatar, Box, Chip, Typography } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { DataContext } from '../../context/DataContext';

const ListFolder = ({ setList }) => {

	const [error, setError] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [select, setSelect] = useState("");
	
	const { lists } = useContext(DataContext);

	const open = Boolean(anchorEl);

	const handleOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (list) => {
		setAnchorEl(null);
		setSelect(list.name);
		setList(list);
	};


	return (
		<Box sx={{ paddingBottom: 1 }}>
			<Chip
				icon={<FolderOpenIcon />}
				label={
					<Typography variant='caption' sx={{ display: "flex", alignItems: "center" }}>
						{select} <UnfoldMoreIcon fontSize='inherit' />
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
					lists.map(list => {
						return (
							<MenuItem key={list.list_id} onClick={() => { handleClose(list) }}>
								{list.name}
							</MenuItem>
						)
					})
				}
			</Menu>
		</Box>
	);
}

export default ListFolder