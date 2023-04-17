import React from "react"
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const TaskDetail = () => {
    return (
        <Box sx={{ width: "100%", paddingBottom:1 }} >
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1a-header"
                    sx={{ maxHeight: 49 }}>
                    <Typography>Task detail</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    test
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default TaskDetail