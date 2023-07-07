import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector } from "react-redux";
import { selectCreateTaskStatus, selectDeleteTaskStatus, selectFetchTaskStatus, selectUpdateTaskStatus } from '../../features/tasks/tasksSlice';
import { selectAlertFieldStatus, selectListFieldStatus, selectPeopleFieldStatus, selectTaskFieldStatus, } from '../../features/fields/fieldsSlice';

const SynchronizeLoading = () => {

    const taskStatus = useSelector(selectTaskFieldStatus);
    const listStatus = useSelector(selectListFieldStatus);
    const peopleStatus = useSelector(selectPeopleFieldStatus);
    const alertStatus = useSelector(selectAlertFieldStatus);

    const selectFetchTaskStat = useSelector(selectFetchTaskStatus);
    const selectCreateTaskStat = useSelector(selectCreateTaskStatus);
    const selectUpdateTaskStat = useSelector(selectUpdateTaskStatus);
    const selectDeleteTaskStat = useSelector(selectDeleteTaskStatus)


    return (
        <>
            {
                (
                    taskStatus === 'on' ||
                    listStatus === 'on' ||
                    peopleStatus === 'on' ||
                    alertStatus === 'on' ||
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