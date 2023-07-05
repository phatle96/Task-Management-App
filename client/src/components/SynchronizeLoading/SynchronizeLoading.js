import LoadingButton from '@mui/lab/LoadingButton';
import { Tooltip } from '@mui/material';
import { useSelector } from "react-redux";

const SynchronizeLoading = ({ state }) => {

    return (
        <>
            {
                state &&
                <LoadingButton loading variant="text" loadingPosition='start' sx={{ marginLeft: 1.5 }} >

                </LoadingButton>
            }
        </>
    )
}

export default SynchronizeLoading;