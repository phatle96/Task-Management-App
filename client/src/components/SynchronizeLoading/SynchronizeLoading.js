import { DataContext } from "../../context/DataContext";
import { useContext } from "react";
import LoadingButton from '@mui/lab/LoadingButton';

const SynchronizeLoading = () => {
    const {
        listsLoading,
        tasksLoading,
        subtasksLoading,
        peopleLoading } = useContext(DataContext)

    return (
        <>
            {
                (listsLoading || tasksLoading || subtasksLoading || peopleLoading) &&
                <LoadingButton loading variant="text">
                    loading
                </LoadingButton>
            }
        </>
    )
}

export default SynchronizeLoading;