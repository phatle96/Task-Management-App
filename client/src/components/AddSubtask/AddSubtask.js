import { useState } from 'react';
import {
	Button, ClickAwayListener, IconButton, List, ListItem, ListItemIcon, Stack, TextField, Tooltip,
} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { nanoid } from 'nanoid'

const AddSubtask = ({ subtasks, setSubtasks }) => {

	const [content, setContent] = useState('');
	const [error, setError] = useState({ state: false, helperText: "" });
	const [handleAdd, setHandleAdd] = useState(false);


	const handleAddSubtask = () => {
		setHandleAdd(true);
		setError({ state: false, helperText: "" })
	};

	const handleCancelAdd = () => {
		setHandleAdd(false);
		setContent("")
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

	const handleEditAdd = (event) => {
		if (event.length > 0 && event.length < 300) {
			setContent(event)
			setError({ state: false, helperText: "" });
		} else {
			setContent(event)
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

	const handleUndoDelete = (id) => {
		const undoDelete = subtasks.map((subtask) => {
			if (subtask.temp_id === id) {
				return (
					{ ...subtask, isDeleted: false }
				)
			} else {
				return { ...subtask }
			}
		})
		setSubtasks(undoDelete);
	}

	const handleConfirmDelete = (id) => {
		const confirmDelete = subtasks.filter(subtask => subtask.temp_id !== id);
		setSubtasks(confirmDelete);
	}

	const IconButtonStyled = ({ title, onClick, style }) => {
		return (
			<Tooltip title={title}>
				<IconButton onMouseDown={onClick} aria-label={title} size="small">
					{style === 'close' && <CloseIcon fontSize='inherit' />}
					{style === 'done' && <DoneIcon fontSize='inherit' />}
					{style === 'undo' && <UndoIcon fontSize='inherit' />}
					{style === 'delete' && <DeleteIcon fontSize='inherit' />}
				</IconButton>
			</Tooltip>
		)
	}

	const AddButton = () => {
		return (
			<>
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
									onChange={(event) => { handleEditAdd(event.target.value) }} />

							</ClickAwayListener>
							<IconButtonStyled title='Cancel' onClick={handleCancelAdd} style='close' />
							<IconButtonStyled title='Save' onClick={handleSaveAdd} style='done' />

						</Stack>
					)
				}

			</>
		)
	}


	const EditButton = ({ isDeleted, isEdit, id }) => {
		return (
			<Stack direction="row">
				{
					(isEdit && !isDeleted) && (
						<>
							<IconButtonStyled title='Delete' onClick={() => { handleDelete(id) }} style='close' />
							<IconButtonStyled title='Save' onClick={() => { handleClose(id) }} style='done' />
						</>
					)
				}
				{
					(isDeleted && isEdit) && (
						<>
							<IconButtonStyled title='Undo' onClick={() => { handleUndoDelete(id) }} style='undo' />
							<IconButtonStyled title='Delete' onClick={() => { handleConfirmDelete(id) }} style='delete' />
						</>
					)
				}
			</Stack>
		)
	}




	return (
		<Stack direction="column">
			<AddButton />
			<List sx={{ display: "flex", flexDirection: "column-reverse" }}>
				{
					subtasks.map((subtask) => {
						return (
							<ListItem key={subtask.temp_id} sx={{ height: 35, paddingY: 2.5 }}>
								<ListItemIcon sx={{ minWidth: 35 }}>
									<SubdirectoryArrowRightIcon fontSize='inherit' />
								</ListItemIcon>
								<TextField
									sx={!subtask.isDeleted ? { width: "100%" } : { width: "100%", textDecoration: "line-through" }}
									variant="standard"
									disabled={subtask.isDeleted}
									value={subtask.content}
									error={subtask.error}
									helperText={subtask.helperText}
									onFocus={() => { handleFocus(subtask.temp_id) }}
									onBlur={() => { handleClose(subtask.temp_id) }}
									onChange={(event) => { handleEdit(event.target.value, subtask.temp_id); }} />
								<EditButton isEdit={subtask.isEdit} isDeleted={subtask.isDeleted} id={subtask.temp_id} />
							</ListItem>
						)
					})
				}
			</List>
		</Stack>
	)
}

export default AddSubtask;