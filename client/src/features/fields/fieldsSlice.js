import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    taskField: {
        status: 'idle',
        error: false
    },
    listField: {
        status: 'idle'
    },
    peopleField: {
        status: 'idle'
    },
    alertField: {
        status: 'idle'
    },
    subtaskField: {
        status: 'idle',
        error: false
    }
}

const fieldsSlice = createSlice({
    name: 'fields',
    initialState,
    reducers: {
        handleTaskField: {
            reducer: (state, action) => {
                const { status } = action.payload;
                state.taskField.status = status;
            },
            prepare: (status) => {
                return {
                    payload: { status }
                }
            }
        },
        handleTaskError: {
            reducer: (state, action) => {
                const { error } = action.payload;
                state.taskField.error = error;
            },
            prepare: (error) => {
                return {
                    payload: { error }
                }
            }
        },
        handleListField: {
            reducer: (state, action) => {
                const { status } = action.payload;
                state.listField.status = status;
            },
            prepare: (status) => {
                return {
                    payload: { status }
                }
            }
        },
        handlePeopleField: {
            reducer: (state, action) => {
                const { status } = action.payload;
                state.peopleField.status = status;
            },
            prepare: (status) => {
                return {
                    payload: { status }
                }
            }
        },
        handleAlertField: {
            reducer: (state, action) => {
                const { status } = action.payload;
                state.alert.status = status;
            },
            prepare: (status) => {
                return {
                    payload: { status }
                }
            }
        },
        handleSubtaskField: {
            reducer: (state, action) => {
                const { status } = action.payload;
                state.subtask.status = status;
            },
            prepare: (status) => {
                return {
                    payload: { status }
                }
            }
        },
    }
})

export const selectTaskFieldStatus = (state) => state.fields.taskField.status
export const selectTaskFieldError = (state) => state.fields.taskField.error

export const selectSubtaskFieldStatus = (state) => state.fields.subtaskField.status

export const selectListFieldStatus = (state) => state.fields.listField.status
export const selectPeopleFieldStatus = (state) => state.fields.peopleField.status
export const selectAlertFieldStatus = (state) => state.fields.alertField.status

export const {

    handleTaskField,
    handleTaskError,

    handleSubtaskField,

    handleListField,
    handlePeopleField,
    handleAlertField,
} = fieldsSlice.actions

export default fieldsSlice.reducer