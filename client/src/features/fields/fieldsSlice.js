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
    subtaskAddField: {
        status: 'idle'
    },
    subtaskField: {
        status: 'idle',
        id: null,
        error: false
    },
    setDayField: {
        status: 'idle'
    },
    updateDateTimeField: {
        status: 'idle'
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
                state.alertField.status = status;
            },
            prepare: (status) => {
                return {
                    payload: { status }
                }
            }
        },
        handleSubtaskAddField: {
            reducer: (state, action) => {
                const { status } = action.payload;
                state.subtaskAddField.status = status
            },
            prepare: (status) => {
                return {
                    payload: { status }
                }
            }
        },
        handleSubtaskField: (state, action) => {
            const { status, id, error } = action.payload
            state.subtaskField.status = status;
            state.subtaskField.id = id;
            state.subtaskField.error = error;
        },
        handleSetDayField: {
            reducer: (state, action) => {
                const { status } = action.payload;
                state.setDayField.status = status
            },
            prepare: (status) => {
                return {
                    payload: { status }
                }
            }
        },
        handleUpdateDateTimeField: {
            reducer: (state, action) => {
                const { status } = action.payload;
                state.updateDateTimeField.status = status
            },
            prepare: (status) => {
                return {
                    payload: { status }
                }
            }
        }

    }
})

export const selectTaskFieldStatus = (state) => state.fields.taskField.status
export const selectTaskFieldError = (state) => state.fields.taskField.error

export const selectSubtaskField = (state) => state.fields.subtaskField
export const selectSubtaskAddField = (state) => state.fields.subtaskAddField

export const selectSetDayField = (state) => state.fields.setDayField.status
export const selectUpdateDateTimeFieldStatus = (state) => state.fields.updateDateTimeField.status

export const selectListFieldStatus = (state) => state.fields.listField.status
export const selectPeopleFieldStatus = (state) => state.fields.peopleField.status
export const selectAlertFieldStatus = (state) => state.fields.alertField.status

export const {

    handleTaskField,
    handleTaskError,

    handleSubtaskAddField,
    handleSubtaskField,
    handleSubtaskError,

    handleSetDayField,
    handleUpdateDateTimeField,

    handleListField,
    handlePeopleField,
    handleAlertField,
} = fieldsSlice.actions

export default fieldsSlice.reducer