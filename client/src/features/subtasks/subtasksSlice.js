import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from '@reduxjs/toolkit';
import { axiosPost, axiosPut, axiosFetch } from '../../utils/api';
import { selectFilters } from '../filters/filtersSlice';

export const fetchSubtasks = createAsyncThunk(
    'subtasks/fetchSubtasks',
    async () => {
        const data = await axiosFetch('/subtask/all');
        return data;
    }
)

export const createSubtask = createAsyncThunk(
    'subtasks/createSubtask',
    async (payload) => {
        const response = await axiosPost(payload);
        return response;
    }
);

export const updateSubtask = createAsyncThunk(
    'subtasks/updateSubtask',
    async (payload) => {
        const response = await axiosPut(payload);
        return response;
    }
);

export const deleteSubtask = createAsyncThunk(
    'subtasks/deleteSubtask',
    async (payload) => {
        const response = await axiosPut(payload);
        return response;
    }
);

const subtasksAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
    selectId: (e) => e.subtask_id,
})

const selectSubtasks = (state) => state.subtasks

const subtasksSelectors = subtasksAdapter.getSelectors(selectSubtasks)


export const {
    selectAll: selectAllSubtasks,
    selectIds: selectSubtaskIds,
    selectById: selectSubtaskById,
} = subtasksSelectors

export const selectSubtasksByList = createSelector(
    [selectAllSubtasks, selectFilters],
    (subtasks, filters) => {
        if (filters.list === null) {
            return subtasks
        } else {
            return subtasks.filter((subtask) => subtask.list && subtask.list.list_id === filters.list);
        };
    }
)

export const selectSubtasksByTaskId = createSelector(
    [selectSubtasksByList, (state, taskId) => taskId],
    (subtasks, taskId) => {
        if (subtasks) {
            return subtasks.filter((subtask) => subtask.task.task_id === taskId)
        } else {
            return subtasks
        }
    }
)

const subtasksSlice = createSlice({
    name: 'subtasks',
    initialState: subtasksAdapter.getInitialState({
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
        initSubtask: (state) => {
            state.create.status = 'idle';
            state.create.response = null
        },
    },
    extraReducers: {
        [fetchSubtasks.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchSubtasks.fulfilled]: (state, action) => {
            if (state.status === 'loading') {
                subtasksAdapter.upsertMany(state, action);
                state.status = 'succeeded';
            }
        },
        [fetchSubtasks.rejected]: (state, action) => {
            if (state.status === 'loading') {
                state.status = 'failed';
                state.error = action.payload;
            }
        },

        // Create state
        [createSubtask.pending]: (state, action) => {
            state.create.status = 'loading';
            state.create.response = null
            state.create.error = null;
        },
        [createSubtask.fulfilled]: (state, action) => {
            if (state.create.status === 'loading') {
                subtasksAdapter.addOne(state, action.payload)
                state.create.response = action.payload;
                state.create.status = 'succeeded'
            }
        },
        [createSubtask.rejected]: (state, action) => {
            if (state.create.status === 'loading') {
                state.create.error = action.payload;
                state.create.status = 'failed'
            }
        },
        // Delete state
        [deleteSubtask.pending]: (state, action) => {
            state.delete.status = 'loading';
            state.delete.error = null;
            state.delete.response = null
        },
        [deleteSubtask.fulfilled]: (state, action) => {
            if (state.delete.status === 'loading') {
                subtasksAdapter.removeOne(state, action.payload.subtask_id)
                state.delete.response = action.payload
                state.delete.status = 'succeeded'
            }
        },
        [deleteSubtask.rejected]: (state, action) => {
            if (state.delete.status === 'loading') {
                state.delete.error = action.payload;
                state.delete.status = 'failed'
            }
        },
        // Update state
        [updateSubtask.pending]: (state, action) => {
            state.update.status = 'loading';
            state.update.error = null;
            state.update.response = null
        },
        [updateSubtask.fulfilled]: (state, action) => {
            if (state.update.status === 'loading') {
                const subtaskId = action.payload.subtask_id;
                state.entities[subtaskId] = action.payload;
                state.update.response = action.payload;
                state.update.status = 'succeeded';
            }
        },
        [updateSubtask.rejected]: (state, action) => {
            if (state.update.status === 'loading') {
                state.update.response = action.payload;
                state.update.status = 'failed';
            }
        },

    }
})

export const { initSubtask } = subtasksSlice.actions

export default subtasksSlice.reducer