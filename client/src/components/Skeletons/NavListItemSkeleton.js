import { ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from "@mui/material"

const NavListItemSkeleton = ({ key }) => {
    return (
        <ListItem key={key} sx={{ paddingY: 0.25 }} >
            <ListItemButton
                sx={{ minHeight: 30, borderRadius: '10px' }}>
                <ListItemIcon sx={{ justifyContent: 'center' }}>
                    < Skeleton variant="circular" width='40px' height='40px' />
                </ListItemIcon>
                <ListItemText
                    primary={<Skeleton variant='rounded' height='18px' width='90%' sx={{ marginBottom: 0.5 }} />}
                    secondary={<Skeleton variant='rounded' height='12px' width='70%' />}
                />
            </ListItemButton>
        </ListItem>
    )
}

export default NavListItemSkeleton