import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { axiosPost, axiosDelete, axiosPut, axiosFetch } from '../../utils/api';

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        const data = await axiosFetch('http://localhost:8080/api/task/all');
        return data;
    }
)

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (type, payload) => {
        const response = await axiosPost(type, payload);
        return response;
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (payload) => {
        const response = await axiosPut(payload);
        return response;
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (payload) => {
        const response = await axiosDelete(payload);
        return response;
    }
);

const tasksAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
    selectId: (e) => e.task_id,
})

const selectTasks = state => state.tasks

const tasksSelectors = tasksAdapter.getSelectors(selectTasks)

export const tasksFilterSelector = createSelector(
    [
        // Usual first input - extract value from `state`
        state => state.tasks,
        // Take the second arg, `list_id`, and forward to the output selector
        (state, list_id) => list_id
    ],
    // Output selector gets (`tasks, list_id)` as args
    (tasks, list_id) => {return tasks.filter(task => task.list_id === list_id)}
)

export const {
    selectAll: selectAllTasks,
    selectIds: selectTaskIds,
    selectById: selectTaskById,
} = tasksSelectors



const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksAdapter.getInitialState({
        status: 'idle',
        error: null,
    }),
    reducers: {
        taskList: (state, action) => {

        },
        taskFilter: (state, action) => {

        },
        taskSort: (state, action) => {

        },
    },
    extraReducers: {
        [fetchTasks.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTasks.fulfilled]: (state, action) => {
            if (state.status === 'loading') {
                tasksAdapter.upsertMany(state, action);
                state.status = 'succeeded';
            }
        },
        [fetchTasks.rejected]: (state, action) => {
            if (state.status === 'loading') {
                state.status = 'failed';
                state.error = action.payload;
            }
        },

        [createTask.fulfilled]: tasksAdapter.addOne,
        [createTask.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

        [deleteTask.fulfilled]: tasksAdapter.removeOne,
        [deleteTask.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

        [updateTask.fulfilled]: tasksAdapter.updateOne,
        [updateTask.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

    }
})

export const { taskFilter, taskSort, taskRemoved } = tasksSlice.actions

export default tasksSlice.reducer