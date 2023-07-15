import { useEffect, useState } from 'react';
import {
	Button, IconButton, List, ListItem, ListItemIcon, Paper, Stack, TextField, Tooltip,
} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

import { useDispatch, useSelector } from 'react-redux';

import { handleSubtaskAddField, selectSubtaskAddField, selectTaskFieldError } from "../../features/fields/fieldsSlice";
import { createSubtask, selectSubtasksByTaskId } from '../../features/subtasks/subtasksSlice';
import SubtaskTextField from '../SubtaskTextField/SubtaskTextField';

const AddSubtask = ({ taskContent, setFocus, task }) => {

	const [content, setContent] = useState('');
	const [error, setError] = useState(false);
	const [add, setAdd] = useState(false);


	const dispatch = useDispatch();
	const taskFieldError = useSelector(selectTaskFieldError)
	const subtaskAddField = useSelector(selectSubtaskAddField)
	const subtasks = useSelector((state) => selectSubtasksByTaskId(state, (task ? task.task_id : null)));

	useEffect(() => {
		switch (subtaskAddField.status) {
			case 'idle': break
			case 'on': break
			case 'off': {
				if (content.length) {
					const payload = {
						type: 'subtask',
						payload: {
							list: (task.list ? task.list._id : null),
							task: task._id,
							content: content
						}
					}
					dispatch(createSubtask(payload))
				}
				setContent("")
				dispatch(handleSubtaskAddField('idle'))
				break
			}
		}
	}, [subtaskAddField])

	const handleAdd = () => {
		if (!taskFieldError && taskContent) {
			setAdd(true);
		} else {
			setFocus(true)
		}

	};

	const handleCancel = () => {
		setContent("")
		setAdd(false);
		setError(false)
	};

	const handleFocus = () => {
		dispatch(handleSubtaskAddField('on'))
	}

	const handleBlur = () => {
		setAdd(false)
		setError(false)
		dispatch(handleSubtaskAddField('off'))
	}

	const handleEdit = (event) => {
		if (event && event.length < 300) {
			setContent(event)
			setError(false);
		} else {
			setContent(event)
			setError(true)
		}
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
						onClick={() => { handleAdd() }}
						startIcon={<FormatListBulletedIcon />}>
						Add subtask
					</Button>
				</Stack>
				{
					add &&
					(
						<Stack direction="row" sx={{ alignItems: "center" }}>
							<TextField
								sx={{ width: "100%", paddingRight: 0.5 }}
								variant="standard"
								autoFocus
								id="standard-basic"
								label="Subtask"
								error={error}
								helperText={error ? 'length should not be empty' : null}
								value={content}
								onFocus={() => { handleFocus() }}
								onBlur={() => { handleBlur() }}
								onChange={(event) => { handleEdit(event.target.value) }} />
							<IconButtonStyled title='Cancel' onClick={() => { handleCancel() }} style='close' />
							<IconButtonStyled title='Save' onClick={() => { handleBlur() }} style='done' />

						</Stack>
					)
				}

			</>
		)
	}

	return (
		<Paper variant="outlined" sx={{ borderColor: 'darkgray', backgroundColor: "whitesmoke", borderRadius: 3 }}>
			<Stack direction="column" sx={{ margin: 1 }}>
				<AddButton />
				<List sx={{ display: "flex", flexDirection: "column-reverse", padding: 0 }}>
					{
						subtasks.map((subtask) => {
							return (
								<ListItem key={subtask.subtask_id} sx={{ height: 35 }}>
									<ListItemIcon sx={{ minWidth: 35 }}>
										<SubdirectoryArrowRightIcon fontSize='inherit' />
									</ListItemIcon>
									<SubtaskTextField subtask={subtask} />
								</ListItem>
							)
						})
					}
				</List>
			</Stack>
		</Paper>
	)
}

export default AddSubtask;