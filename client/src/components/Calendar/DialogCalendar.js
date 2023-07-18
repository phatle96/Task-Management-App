import React, { Fragment, useState, useEffect, useMemo, useCallback } from 'react'
import { Calendar, luxonLocalizer, Views } from 'react-big-calendar'
import { DateTime, Settings } from 'luxon'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectTaskById, selectTasksByList } from '../../features/tasks/tasksSlice'
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskDialog from '../TaskDialog/TaskDialog'

const defaultTZ = DateTime.local().zoneName

export default function DialogCalendar() {
    const [timezone, setTimezone] = useState(defaultTZ)
    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState();

    const events = useSelector(selectTasksByList);

    const selectTask = useSelector((state) => selectTaskById(state, select))

    const eventPropGetter = useCallback(
        (event, start, end, isSelected) => ({
            ...(event.color && {
                style: {
                    backgroundColor: event.color,
                    color: 'darkslategrey'

                },
            }),
            ...(event.is_completed && {
                style: {
                    backgroundColor: 'darkgrey',
                    color: 'black',
                    textDecoration: 'line-through',
                    textDecorationThickness: '0.5px',
                    textDecorationColor: 'darkslategrey'
                }
            }),
        }),
        []
    )

    const { defaultDate, getNow, localizer, myEvents, scrollToTime } =
        useMemo(() => {
            Settings.defaultZone = timezone
            return {
                defaultDate: DateTime.now().toJSDate(),
                getNow: () => DateTime.local().toJSDate(),
                localizer: luxonLocalizer(DateTime),
                myEvents: events.map(event => (
                    !event.is_errordate && {
                        title: event.content,
                        start: event.start_date,
                        end: event.end_date,
                        is_completed: event.is_completed,
                        color: event.color,
                        task_id: event.task_id,
                        allDay: event.is_allday
                    }
                )),
                scrollToTime: DateTime.local().toJSDate(),
            }
        }, [events])

    useEffect(() => {
        return () => {
            Settings.defaultZone = defaultTZ // reset to browser TZ on unmount
        }
    }, [])


    return (
        <Box sx={{ height: 600 }}>
            <Calendar
                defaultDate={defaultDate}
                defaultView={Views.MONTH}
                eventPropGetter={eventPropGetter}
                events={myEvents}
                getNow={getNow}
                localizer={localizer}
                scrollToTime={scrollToTime}
                popup
            />
        </Box>
    )
}