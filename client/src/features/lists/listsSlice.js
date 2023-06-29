import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { axiosPost, axiosDelete, axiosPut, axiosFetch } from '../../utils/api';

export const fetchLists = createAsyncThunk(
    'lists/fetchLists',
    async () => {
        const data = await axiosFetch('http://localhost:8080/api/list/all');
        return data;
    }
)

export const createList = createAsyncThunk(
    'lists/createList',
    async (type, payload) => {
        const response = await axiosPost(type, payload);
        return response;
    }
);

export const updateList = createAsyncThunk(
    'lists/updateList',
    async (payload) => {
        const response = await axiosPut(payload);
        return response;
    }
);

export const deleteList = createAsyncThunk(
    'lists/deleteList',
    async (payload) => {
        const response = await axiosDelete(payload);
        return response;
    }
);

const listsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
    selectId: (e) => e.list_id,
})

const selectLists = state => state.lists

const listsSelectors = listsAdapter.getSelectors(selectLists)


export const {
    selectAll: selectAllLists,
    selectIds: selectListIds,
    selectById: selectListById,
} = listsSelectors



const listsSlice = createSlice({
    name: 'lists',
    initialState: listsAdapter.getInitialState({
        status: 'idle',
        error: null,
    }),
    reducers: {
        listList: (state, action) => {

        },
        listFilter: (state, action) => {

        },
        listSort: (state, action) => {

        },
    },
    extraReducers: {
        [fetchLists.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchLists.fulfilled]: (state, action) => {
            if (state.status === 'loading') {
                listsAdapter.upsertMany(state, action);
                state.status = 'succeeded';
            }
        },
        [fetchLists.rejected]: (state, action) => {
            if (state.status === 'loading') {
                state.status = 'failed';
                state.error = action.payload;
            }
        },

        [createList.fulfilled]: listsAdapter.addOne,
        [createList.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

        [deleteList.fulfilled]: listsAdapter.removeOne,
        [deleteList.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

        [updateList.fulfilled]: listsAdapter.updateOne,
        [updateList.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

    }
})

export const { listFilter, listSort, listRemoved } = listsSlice.actions

export default listsSlice.reducer