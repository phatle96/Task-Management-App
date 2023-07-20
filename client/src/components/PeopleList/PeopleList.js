import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { selectAllPeople } from "../../features/people/peopleSlice"
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { stringToPastelColor } from "../../utils/color";
import ClearIcon from '@mui/icons-material/Clear';

const PeopleList = () => {

    const dispatch = useDispatch();
    const people = useSelector(selectAllPeople)

    return (
        <Grid2 container spacing={2}>
            {
                people.map(person => {
                    console.log(people.name)
                    return (
                        <Grid2 xs={3} sm={3} md={3} lg={3} >
                            <Paper variant='outlined' sx={{ padding: 1 }}>
                                <Stack direction='column' spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton sx={{ marginLeft: 'auto', padding: 0 }}>
                                        <ClearIcon />
                                    </IconButton>
                                    <Badge color='info' badgeContent={99} >
                                        <Avatar
                                            sx={{ bgcolor: stringToPastelColor(person.name, 'hex') }}
                                            alt={person.name}
                                        />
                                    </Badge>
                                    <Typography variant='body2'>
                                        {person.name}
                                    </Typography>
                                    <Button fullWidth variant='outlined'>
                                        test
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid2>
                    )
                })
            }
        </Grid2>
    )
}

export default PeopleList