import { Chip, Divider, Paper, Skeleton, Stack } from "@mui/material"

const TaskCardSkeleton = ({ key }) => {
    return (
        <Paper key={key} display="flex" variant="outlined" sx={{ paddingBottom: 2, width: 'inherit', marginBottom: 1, borderColor: 'rgba(0, 0, 0, 0.11)' }} >
            <Stack direction='row' sx={{ display: 'flex', justifyContent: 'flex-end', paddingY: '8px', paddingX: '8px' }}>
                < Skeleton variant="circular" width='27px' height='27px' sx={{ position: 'relative', right: '-18px', border: '2px solid #fff' }} />
                < Skeleton variant="circular" width='27px' height='27px' sx={{ position: 'relative', right: '-9px', border: '2px solid #fff' }} />
                < Skeleton variant="circular" width='27px' height='27px' sx={{ position: 'relative', border: '2px solid #fff' }} />
            </Stack>
            <Divider sx={{ width: '95%', marginLeft: 'auto' }} />
            <Skeleton variant='rounded' height='16x' width='25%' sx={{ marginTop: '16px', marginLeft: '5%' }} />
            <Skeleton variant='rounded' height='16x' width='30%' sx={{ marginTop: 0.5, marginLeft: '5%' }} />
            <Skeleton variant='rounded' height='20px' width='20%' sx={{ marginY: '24px', marginLeft: '5%' }} />
            <Skeleton variant='rounded' height='24px' width='97px' sx={{ marginLeft: 'auto', marginTop: '16px', marginRight: '8px' }} />
        </Paper >
    )
}

export default TaskCardSkeleton