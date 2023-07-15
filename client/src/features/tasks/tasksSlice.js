import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from '@reduxjs/toolkit';
import { axiosPost, axiosPut, axiosFetch } from '../../utils/api';
import { selectFilters } from '../filters/filtersSlice';

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        const data = await axiosFetch('/task/all');
        return data;
    }
)

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (payload) => {
        const response = await axiosPost(payload);
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
        const response = await axiosPut(payload);
        return response;
    }
);

const tasksAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
    selectId: (e) => e.task_id,
})

export const selectTasks = (state) => state.tasks

const tasksSelectors = tasksAdapter.getSelectors(selectTasks)


export const {
    selectAll: selectAllTasks,
    selectIds: selectTaskIds,
    selectById: selectTaskById,
} = tasksSelectors

export const selectTasksByList = createSelector(
    [selectAllTasks, selectFilters],
    (tasks, filters) => {
        if (filters.list === null) {
            return tasks
        } else {
            return tasks.filter((task) => task.list && task.list.list_id === filters.list);
        };
    }
)

export const selectTasksByStatus = createSelector(
    [selectTasksByList, selectFilters],
    (tasks, filters) => {
        switch (filters.completed) {
            case true: {
                return tasks.filter((task) => task.is_completed === true);
            }
            case false: {
                return tasks.filter((task) => task.is_completed === false)
            }
            default:
                return;
        }
    }
)

export const selectTasksByStatusLength = createSelector(
    [selectTasksByStatus],
    (tasks) => {
        return tasks.length
    }
)

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksAdapter.getInitialState({
        status: 'idle',
        error: null,
        create: {
            status: 'idle',
            response: null,
            error: null
        },
        update: {
            status: 'idle',
            response: null,
            error: null
        },
        delete: {
            status: 'idle',
            response: null,
            error: null
        }
    }),
    reducers: {
        initTask: (state) => {
            state.create.status = 'idle';
            state.create.response = null
        },
    },
    extraReducers: {
        // Fetch state
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
        // Create state
        [createTask.pending]: (state, action) => {
            state.create.status = 'loading';
            state.create.response = null
            state.create.error = null;
        },
        [createTask.fulfilled]: (state, action) => {
            if (state.create.status === 'loading') {
                tasksAdapter.addOne(state, action.payload)
                state.create.response = action.payload;
                state.create.status = 'succeeded'
            }
        },
        [createTask.rejected]: (state, action) => {
            if (state.create.status === 'loading') {
                state.create.error = action.payload;
                state.create.status = 'failed'
            }
        },
        // Delete state
        [deleteTask.pending]: (state, action) => {
            state.delete.status = 'loading';
            state.delete.error = null;
            state.delete.response = null
        },
        [deleteTask.fulfilled]: (state, action) => {
            if (state.delete.status === 'loading') {
                tasksAdapter.removeOne(state, action.payload.task_id)
                state.delete.response = action.payload
                state.delete.status = 'succeeded'
            }
        },
        [deleteTask.rejected]: (state, action) => {
            if (state.delete.status === 'loading') {
                state.delete.error = action.payload;
                state.delete.status = 'failed'
            }
        },
        // Update state
        [updateTask.pending]: (state, action) => {
            state.update.status = 'loading';
            state.update.error = null;
            state.update.response = null
        },
        [updateTask.fulfilled]: (state, action) => {
            if (state.update.status === 'loading') {
                const taskId = action.payload.task_id;
                state.entities[taskId] = action.payload;
                state.update.response = action.payload;
                state.update.status = 'succeeded';
            }
        },
        [updateTask.rejected]: (state, action) => {
            if (state.update.status === 'loading') {
                state.update.response = action.payload;
                state.update.status = 'failed';
            }
        },

    }
})

export const selectFetchTaskStatus = (state) => state.tasks.status
export const selectCreateTaskStatus = (state) => state.tasks.create.status
export const selectUpdateTaskStatus = (state) => state.tasks.update.status
export const selectDeleteTaskStatus = (state) => state.tasks.delete.status

export const {
    initTask,
} = tasksSlice.actions

export default tasksSlice.reducer