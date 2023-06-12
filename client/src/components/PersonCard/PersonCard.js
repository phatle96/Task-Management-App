import { Accordion, AccordionDetails, Avatar, AvatarGroup, Box, Checkbox, Chip, Paper, Stack, Tooltip, Typography } from "@mui/material";
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';

const PersonCard = () => {

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', marginLeft: 1 }} />}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
            marginLeft: 1
        },
        '& .MuiAccordionSummary-content': {
            flexGrow: 0,
        },
    }));


    return (
        <Paper variant="outlined" >
            <Box sx={{ width: "100%", wordBreak: 'break-all', paddingY: 0.5, paddingLeft: 1 }}>
                <Stack direction="column" spacing={0.25} sx={{ width: "100%" }}>
                    <Stack direction="row"
                        sx={{ width: "100%", paddingRight: 1, paddingY: 1, borderBottom: 0.25, borderColor: "lightslategrey", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <Chip
                            avatar={<Avatar>M</Avatar>}
                            label="Phat"
                            variant="outlined" />
                        <Chip
                            label="Doing"
                            variant="outlined" />
                    </Stack>
                    <Box>
                        <Accordion elevation={0}>
                            <AccordionSummary
                                sx={{ padding: 0, justifyContent: "start" }}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography variant="button">
                                    Doing
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack key={123} direction="row" sx={{ alignItems: "center" }}>
                                    <Checkbox
                                        inputProps={{ 'aria-label': 'id' }}
                                        icon={<RadioButtonUncheckedIcon />}
                                        checkedIcon={<RadioButtonCheckedIcon />}
                                        onChange={() => { alert('clicked') }}
                                        checked={true}
                                    />
                                    <Typography variant="body2"
                                        sx={{ textDecoration: "line-through", borderBottom: 0.5, borderColor: "lightslategrey", width: "100%" }}>
                                        Task 1
                                    </Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Stack>
            </Box >
        </Paper >
    )
}

export default PersonCard;