import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector } from "react-redux";

const SynchronizeLoading = () => {
    const subtasksStatus = useSelector((state) => state.subtasks.status)
    const tasksStatus = useSelector((state) => state.tasks.status)
    const listsStatus = useSelector((state) => state.lists.status)

    return (
        <>
            {
                (subtasksStatus === 'loading' ||
                    tasksStatus === 'loading' ||
                    listsStatus === 'loading') &&
                <LoadingButton loading variant="text">
                    loading
                </LoadingButton>
            }
        </>
    )
}

export default SynchronizeLoading;