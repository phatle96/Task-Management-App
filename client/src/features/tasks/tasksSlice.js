import { createSlice } from '@reduxjs/toolkit'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        status: 'idle',
        error: null
    },
    reducers: {
        createTask: (state, action) => {

        },
        updateTask: (state, action) => {

        },
        deleteTask: (state, action) => {

        }
    }
})

export const { createTask, updateTask, deleteTask } = tasksSlice.actions

export default tasksSlice.reducer