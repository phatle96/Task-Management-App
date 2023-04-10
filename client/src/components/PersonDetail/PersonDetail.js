import React from "react"
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const PersonDetail = () => {
    return (
        <Box display="flex" alignContent="stretch" position="relative" paddingBottom={1} maxWidth={1}  >
            <Accordion  >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ maxHeight: 49 }}>
                    <Stack display="flex" direction="row" alignItems="center">
                        <Typography>Person detail</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails >
                    <Box justifyContent="center">
                        Select Person to view detail here!
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default PersonDetail