import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Avatar, Box, Chip, Typography } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const ListFolder = () => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get('http://localhost:8080/api/list/all/');
				if (response.status !== 200) {
					throw new Error(
						`This is an HTTP error: The status is ${response.status}`
					)
				}
				setData(response.data);
				setError(null);
			} catch (err) {
				setError(err.message);
				setData(null);
			}
		}

		getData();

	}, []);

	const [anchorEl, setAnchorEl] = useState(null);

	const [listname, setListname] = useState("select list")

	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (list_name = listname) => {
		setAnchorEl(null);
		setListname(list_name)
	};


	return (
		<Box>
			<Chip
				icon={<FolderOpenIcon />}
				label={
					<Typography variant='caption' sx={{ display: "flex", alignItems: "center" }}>
						{listname} <UnfoldMoreIcon fontSize='inherit' />
					</Typography>
				}
				size="small"
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			/>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={() => handleClose()}
				MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
				{
					data.map(list => {
						return (
							<MenuItem key={list.list_id} onClick={() => handleClose(list.name)}>
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