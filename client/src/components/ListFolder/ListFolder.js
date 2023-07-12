import { useState, } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { selectAllLists } from '../../features/lists/listsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { handleListField, selectListFieldStatus } from '../../features/fields/fieldsSlice';

const ListFolder = ({ list, setList }) => {

	const [anchorEl, setAnchorEl] = useState(null);

	const dispatch = useDispatch();
	const lists = useSelector(selectAllLists)

	const open = Boolean(anchorEl);

	const handleOpen = (event) => {
		setAnchorEl(event.currentTarget);
		dispatch(handleListField('on'))
	};

	const handleClose = (select) => {
		if (select === undefined) {
			setAnchorEl(null);

		} else if (select === 'none') {
			setAnchorEl(null);
			setList(null);
		} else {
			setAnchorEl(null);
			setList(select);
		}
		dispatch(handleListField('off'))
	};


	return (
		<Box sx={{ paddingBottom: 1, display: 'flex' }}>
			<Chip
				icon={<FolderOpenIcon />}
				label={
					<Stack direction='row' spacing={1} display='flex' sx={{ alignItems: 'center' }}>
						<Typography variant='caption' sx={{ marginBottom: -0.5 }}>
							{list === null || list === undefined ? '' : list.name}
						</Typography>
						<UnfoldMoreIcon fontSize='inherit' />
					</Stack>
				}
				size="small"
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={(e) => { handleOpen(e) }}
				sx={{ paddingBottom: 0 }}
			/>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={() => { handleClose() }}
				MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
				<MenuItem onClick={() => { handleClose('none') }}>
					{'None'}
				</MenuItem>
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