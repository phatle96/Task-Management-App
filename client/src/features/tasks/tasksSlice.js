import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from '@reduxjs/toolkit';
import { axiosPost, axiosDelete, axiosPut, axiosFetch } from '../../utils/api';
import { selectFilters } from '../filters/filtersSlice';

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

const selectTasks = (state) => state.tasks

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
            return tasks.filter((task) => task.list.list_id === filters.list);
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
        [updateTask.fulfilled]: (state, action) => {
            const taskId = action.payload.task_id;
            state.entities[taskId] = action.payload;
            state.status = 'succeeded';
        },
        [updateTask.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

    }
})

export const { taskFilter, taskSort, taskRemoved } = tasksSlice.actions

export default tasksSlice.reducer