import { createAsyncThunk, createEntityAdapter, createSlice, createSelector } from '@reduxjs/toolkit';
import { axiosPost, axiosDelete, axiosPut, axiosFetch } from '../../utils/api';
import { selectFilters } from '../filters/filtersSlice';

export const fetchSubtasks = createAsyncThunk(
    'subtasks/fetchSubtasks',
    async () => {
        const data = await axiosFetch('http://localhost:8080/api/subtask/all');
        return data;
    }
)

export const createSubtask = createAsyncThunk(
    'subtasks/createSubtask',
    async (type, payload) => {
        const response = await axiosPost(type, payload);
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
        const response = await axiosDelete(payload);
        return response;
    }
);

const subtasksAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
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
        if (filters.list === '') {
            return subtasks
        } else {
            return subtasks.filter((subtask) => subtask.list.list_id === filters.list);
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
    }),
    reducers: {
        subtaskList: (state, action) => {

        },
        subtaskFilter: (state, action) => {

        },
        subtaskSort: (state, action) => {

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

        [createSubtask.fulfilled]: subtasksAdapter.addOne,
        [createSubtask.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

        [deleteSubtask.fulfilled]: subtasksAdapter.removeOne,
        [deleteSubtask.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        [updateSubtask.fulfilled]: (state, action) => {
            const subtaskId = action.payload.subtask_id;
            state.entities[subtaskId] = action.payload;
        },
        [updateSubtask.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

    }
})

export const { subtaskFilter, subtaskSort, subtaskRemoved } = subtasksSlice.actions

export default subtasksSlice.reducer