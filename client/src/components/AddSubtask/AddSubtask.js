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

import { useDispatch, useSelector } from 'react-redux';

import { selectTaskFieldError } from "../../features/fields/fieldsSlice";
import { selectSubtasksByTaskId } from '../../features/subtasks/subtasksSlice';

const AddSubtask = ({ taskContent, setFocus, setSubtasks, task }) => {

	const [content, setContent] = useState('');
	const [error, setError] = useState(false);
	const [handleAdd, setHandleAdd] = useState(false);

	const dispatch = useDispatch();
	const taskFieldError = useSelector(selectTaskFieldError)
	const subtasks = useSelector((state) => selectSubtasksByTaskId(state, (task ? task.task_id : null)));

	const handleAddSubtask = () => {
		if (!taskFieldError && taskContent) {
			setHandleAdd(true);
			setError(false)
		} else {
			setFocus(true)
		}

	};

	const handleCancelAdd = () => {
		setHandleAdd(false);
		setContent("")
		setError(false)
	};

	const handleSaveAdd = () => {
		if (content.length > 0 && content.length < 300) {
			setHandleAdd(false);
			setSubtasks([...subtasks, { temp_id: nanoid(5), content: content }]);
			setError(false);
			setContent("");
		} else {
			setError(true)
		}
	}

	const handleEditAdd = (event) => {
		if (event.length > 0 && event.length < 300) {
			setContent(event)
			setError(false);
		} else {
			setContent(event)
			setError(true)
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
						onClick={() => { handleAddSubtask() }}
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
									error={error}
									helperText={error ? 'length should not be empty' : null}
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
							<ListItem key={subtask.subtask_id} sx={{ height: 35, paddingY: 2.5 }}>
								<ListItemIcon sx={{ minWidth: 35 }}>
									<SubdirectoryArrowRightIcon fontSize='inherit' />
								</ListItemIcon>
								<TextField
									sx={!subtask.isDeleted ? { width: "100%" } : { width: "100%", textDecoration: "line-through" }}
									variant="standard"
									value={subtask.content}
									error={error}
									helperText={error ? 'length should not be empty' : null}
									onFocus={() => { handleFocus(subtask.subtask_id) }}
									onBlur={() => { handleClose(subtask.subtask_id) }}
									onChange={(event) => { handleEdit(event.target.value, subtask.subtask_id); }} />
								<EditButton isEdit={subtask.isEdit} isDeleted={subtask.isDeleted} id={subtask.subtask_id} />
							</ListItem>
						)
					})
				}
			</List>
		</Stack>
	)
}

export default AddSubtask;