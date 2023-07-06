import LoadingButton from '@mui/lab/LoadingButton';
import { Tooltip } from '@mui/material';
import { useSelector } from "react-redux";
import { selectCreateTaskStatus, selectDeleteTaskStatus, selectFetchTaskStatus, selectFocus, selectUpdateTaskStatus } from '../../features/tasks/tasksSlice';

const SynchronizeLoading = () => {

    const selectFocusState = useSelector(selectFocus);
    const selectFetchTaskStat = useSelector(selectFetchTaskStatus);
    const selectCreateTaskStat = useSelector(selectCreateTaskStatus);
    const selectUpdateTaskStat = useSelector(selectUpdateTaskStatus);
    const selectDeleteTaskStat = useSelector(selectDeleteTaskStatus)


    return (
        <>
            {
                (
                    selectFocusState.status ||
                    selectFetchTaskStat === 'loading' ||
                    selectCreateTaskStat === 'loading' ||
                    selectUpdateTaskStat === 'loading' ||
                    selectDeleteTaskStat === 'loading'
                ) &&
                <LoadingButton loading variant="text" loadingPosition='start' sx={{ marginLeft: 1.5 }} >

                </LoadingButton>
            }
        </>
    )
}

export default SynchronizeLoading;