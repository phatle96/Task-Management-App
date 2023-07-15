import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { DateTime } from "luxon";
import { Box } from '@mui/material'
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = (props) => (
    <div className="myCustomHeight">
        <Box  sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' } }}>

            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
            />

        </Box>
    </div>
)

export default MyCalendar;