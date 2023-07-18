import * as React from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Chip, Tooltip } from '@mui/material';

import { DateTime } from 'luxon'

const TimeChip = ({ data }) => {

    const [openInfo, setOpenInfo] = React.useState(false);

    const checkOverDue = () => {
        const now = DateTime.now()
        const startDate = DateTime.fromJSDate(data.start_date)
        const endDate = DateTime.fromJSDate(data.end_date)

        if (!data.is_errordate) {
            if (now < startDate) {
                return {
                    status: 'going',
                    color: 'info',
                    label: 'Start ' + data.relativeStartDate,
                    title:
                        ((startDate.toISODate() === endDate.toISODate()) && data.is_allday) ?
                            ('Event from: ' + startDate.toLocaleString() + ' - Allday event') :
                            ('From ' + startDate.toLocaleString() + ' to ' + endDate.toLocaleString())
                }
            } else if (startDate <= now && now <= endDate) {
                return {
                    status: 'now',
                    color: 'success',
                    label: 'On going until ' + data.relativeEndDate,
                    title:
                        ((startDate.toISODate() === endDate.toISODate()) && data.is_allday) ?
                            ('Allday event: ' + now.toLocaleString()) :
                            ('From ' + startDate.toLocaleString() + ' to ' + endDate.toLocaleString())
                }
            } else if (now > endDate) {
                return {
                    status: 'overdue',
                    color: 'secondary',
                    label: 'Ended ' + data.relativeEndDate,
                    title:
                        ((startDate.toISODate() === endDate.toISODate()) && data.is_allday) ?
                            ('Event started: ' + startDate.toLocaleString() + ' - Allday event') :
                            ('Started at ' + startDate.toLocaleString() + ' ended at ' + endDate.toLocaleString())
                }
            }
        } else {
            return {
                status: 'error',
                color: 'error',
                label: 'error date',
                title: 'error date'
            }
        }
    }

    const isOverDue = checkOverDue()

    return (
        <Tooltip title={openInfo ? isOverDue.label : isOverDue.title} >
            <Chip
                onClick={(e) => {
                    e.stopPropagation()
                    setOpenInfo(!openInfo)
                }}
                icon={<AccessTimeIcon />}
                label={openInfo ? isOverDue.title : isOverDue.label}
                color={isOverDue.color}
                size="small" />
        </Tooltip>
    )
}

export default TimeChip