import * as React from 'react';
import {
    CardContent,
    Grid,
    Box,
    Card,
    Typography,
    Checkbox,
    CardActions,
    Stack,
    Chip,
    Avatar,
    AccordionSummary,
    Accordion,
    AccordionDetails,
    TextField
} from '@mui/material';
import { AccessAlarm, ExpandMoreIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Subtask from '../Subtask/Subtask'

const theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body1",
                    },
                    style: {
                        fontSize: 15,
                    },
                },
            ]
        }
    }
})

const TaskCard = () => {
    return (
            <ThemeProvider theme={theme}>
                <Card variant='outlined' sx={{ display: 'flex', justifyContent: "center" }}>
                    <Box >
                        <CardActions>
                            <Checkbox />
                        </CardActions>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <TextField
                            id="outlined-multiline-static"
                            label=""
                            multiline
                            rows={1}
                            defaultValue="Todo"
                        />
                        <CardActions sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: "flex-start",
                            justifyContent: "flex-end"
                        }}>
                            <Stack direction='row'
                                spacing={0.5}>
                                <Chip
                                    avatar={<Avatar>P</Avatar>}
                                    label="people"
                                    size="small"
                                    variant="outlined" />
                                <Chip
                                    avatar={<Avatar>A</Avatar>}
                                    label="another people"
                                    size="small"
                                    variant="outlined" />
                            </Stack>
                            <Box paddingTop={0.5}
                                sx={{
                                    display: "flex",
                                }}>
                                <Chip
                                    avatar={<Avatar> <AccessAlarm sx={{ width: 13.5 }} /> </Avatar>}
                                    label="2023/05/01 17:00:00"
                                    size="small"
                                    variant="outlined" />
                            </Box>
                            <Box>
                                <Accordion>
                                    <AccordionSummary
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                        <Typography>2 Subtasks</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Subtask
                                            defaultValue="todo list" />
                                        <Subtask
                                            defaultValue="todo list 2" />
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </CardActions>
                    </Box>
                </Card>
            </ThemeProvider>
    );
}

export default TaskCard; 