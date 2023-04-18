import { useState, useEffect } from 'react';
import {
	Button, ClickAwayListener, FormControl, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemIcon, Stack, TextField, Tooltip,
} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { nanoid } from 'nanoid'

const AddSubtask = ({ list, task }) => {

	const [subtasks, setSubtasks] = useState([]);
	const [content, setContent] = useState('');
	const [error, setError] = useState({ state: false, helperText: "" });
	const [putPayload, setPut] = useState([]);
	const [handleAdd, setHandleAdd] = useState(false);
	const [edit, setEdit] = useState("")

	const handleAddSubtask = () => {
		setHandleAdd(true);
		setError({ state: false, helperText: "" })
	};

	const handleCancelAdd = () => {
		setHandleAdd(false);
		setError({ state: false, helperText: "" })
	};

	const handleSaveAdd = () => {
		if (content.length > 0 && content.length < 300) {
			setHandleAdd(false);
			setSubtasks([...subtasks, { temp_id: nanoid(5), content: content }]);
			setError({ state: false, helperText: "" });
			setContent("");
		} else {
			setError({ state: true, helperText: "length should be 1 to 299 characters" })
		}
	}

	const handleEdit = (event, id) => {
		const editing = subtasks.map((subtask) => {
			if (subtask.temp_id === id) {
				if (event.length > 0 && event.length < 300) {
					return (
						{ ...subtask, content: event, error: false }
					)
				} else {
					return (
						{ ...subtask, content: event, error: true }
					)
				}
			} else {
				return { ...subtask }
			}
		})
		setSubtasks(editing);
	}

	const handleFocus = (id) => {
		const editing = subtasks.map((subtask) => {
			if (subtask.temp_id === id) {
				return (
					{ ...subtask, isEdit: true }
				)
			} else {
				return { ...subtask, isEdit: false }
			}
		})
		setSubtasks(editing);
	}

	const handleClose = (id) => {
		const editing = subtasks.map((subtask) => {
			if (subtask.temp_id === id) {
				return (
					{ ...subtask, isEdit: false }
				)
			} else {
				return { ...subtask }
			}
		})
		setSubtasks(editing);
	}


	const handleDelete = (id) => {
		const deleted = subtasks.map((subtask) => {
			if (subtask.temp_id === id) {
				return (
					{ ...subtask, isDeleted: true }
				)
			} else {
				return { ...subtask }
			}
		})
		setSubtasks(deleted);
	}


	const EditButton = ({ isEdit, id }) => {
		return (
			<>
				{
					isEdit && (
						<Stack direction="row">
							<Tooltip title="delete">
								<IconButton onClick={() => { handleDelete(id) }} size="small" aria-label="cancel edit">
									<CloseIcon fontSize='inherit' />
								</IconButton>
							</Tooltip>
							<Tooltip title="save">
								<IconButton onClick={() => { handleClose(id) }} size="small" aria-label="save edit" >
									<DoneIcon fontSize='inherit' />
								</IconButton>
							</Tooltip>
						</Stack>
					)
				}
			</>
		)
	}

	return (
		<Stack direction="column">
			<Stack direction="row" >
				<Button
					onClick={handleAddSubtask}
					startIcon={<FormatListBulletedIcon />}>
					Add subtask
				</Button>
			</Stack>
			{
				handleAdd &&
				(
					<Stack direction="row" sx={{ alignItems: "center" }}>
						<ClickAwayListener onClickAway={handleSaveAdd}>
							<TextField
								sx={{ width: "100%", paddingRight: 0.5 }}
								variant="standard"
								autoFocus
								id="standard-basic"
								label="Subtask"
								error={error.state}
								helperText={error.helperText}
								value={content}
								onChange={(event) => { setContent(event.target.value) }} />

						</ClickAwayListener>
						<IconButton onClick={handleCancelAdd} aria-label="cancel" size="small">
							<CloseIcon fontSize='inherit' />
						</IconButton>
						<IconButton onClick={handleSaveAdd} aria-label="save" size="small">
							<DoneIcon fontSize='inherit' />
						</IconButton>
					</Stack>
				)
			}
			<List>
				{
					subtasks.map((subtask) => {
						return (
							<ListItem key={subtask.temp_id} sx={{ height: 35, paddingY: 2.5 }}>
									<ListItemIcon sx={{ minWidth: 35 }}>
										<SubdirectoryArrowRightIcon fontSize='inherit' />
									</ListItemIcon>
									<TextField
										sx={{ width: "100%" }}
										variant="standard"
										value={subtask.content}
										error={subtask.error}
										helperText={subtask.helperText}
										onFocus={() => { handleFocus(subtask.temp_id) }}
										onChange={(event) => { handleEdit(event.target.value, subtask.temp_id); }} />
									<EditButton isEdit={subtask.isEdit} id={subtask.temp_id} />
							</ListItem>
						)
					})
				}
			</List>
		</Stack>
	)
}

export default AddSubtask;