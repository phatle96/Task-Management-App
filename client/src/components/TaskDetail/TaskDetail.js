import React from "react"
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const TaskDetail = () => {
    return (
        <Box position="relative" paddingBottom={1} >
            <Accordion elevation={1} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ maxHeight: 49 }}>
                    <Stack display="flex" direction="row" alignItems="center">
                        <Typography>Task detail</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails >
                    <Box justifyContent="center">
                        Select Task to view detail here!
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default TaskDetail