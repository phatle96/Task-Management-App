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
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography>Create new task</Typography>
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