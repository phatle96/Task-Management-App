import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddTask from '../AddTask/AddTask';
import { Box, Stack, Button, IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


export default function AccordionAddTask() {
    return (
        <Box position="relative" paddingBottom={1} >
            <Accordion defaultExpanded="true" elevation={1} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{maxHeight:49}}>
                    <Stack display="flex" direction="row" alignItems="center">
                        <Typography>Create new task</Typography>
                        <IconButton size="small"
                            onClick={(e) => {
                                e.stopPropagation()
                                alert("open drawer")
                            }}>
                            <OpenInNewIcon />
                        </IconButton>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails >
                    <Box justifyContent="center">
                        <AddTask />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}