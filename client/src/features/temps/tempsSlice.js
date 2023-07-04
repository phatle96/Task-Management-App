import { createSlice, createSelector } from "@reduxjs/toolkit";


const initialState = {
    list: {
        list_id: '',
        name: '',
    },
    task: {
        create: {
            list_id: null,
            content: '',
            person: [],
            start_at: null,
            end_at: null,
            alert: null,
            is_completed: false,
        },
        edit: {

        }

    },
    subtasks: {
        create: [],
        edit: [],
    },
    people: [

    ]
}


const tempsSlice = createSlice({
    name: 'temps',
    initialState,
    reducers: {
        editTask: (state, action) => {
            const { task_id, list: { list_id }, content, person, alert } = action.payload;
            state.task.edit = { task_id, list_id, content, person, alert };
        },
        editSubtasks: (state, action) => {
            const payload = action.payload;
            state.subtasks.edit = payload
        },
        initTaskCreate: (state) => {
            state.task.create = initialState.task.create
        },
        initSubtaskCreate: (state) => {
            state.subtasks.create = initialState.subtasks.create
        },
        onCreateTask: (state, action) => {
            const tempPayload = action.payload;
            state.task.create = tempPayload
        },
        onCreateSubtask: (state, action) => {
            const tempPayload = action.payload;
            state.subtasks.create = tempPayload
        }
    }
})

export const selectTemps = (state) => state.temps

export const {
    editTask,
    editSubtasks,
    initTaskCreate,
    initSubtaskCreate,
    onCreateTask,
    onCreateSubtask,
} = tempsSlice.actions

export default tempsSlice.reducer