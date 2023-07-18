import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { axiosPost, axiosPut, axiosFetch } from '../../utils/api';
import { stringToPastelColor } from '../../utils/color';

export const fetchLists = createAsyncThunk(
    'lists/fetchLists',
    async () => {
        const data = await axiosFetch('/list/all');
        return data.map(list => ({
            ...list,
            color: stringToPastelColor(list.list_id, 'hsl'),
        }));
    }
)

export const createList = createAsyncThunk(
    'lists/createList',
    async (payload) => {
        const response = await axiosPost(payload);
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
        const response = await axiosPut(payload);
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
        initList: (state, action) => {

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
        //Create
        [createList.pending]: (state, action) => {
            state.create.status = 'loading';
            state.create.response = null
            state.create.error = null;
        },
        [createList.fulfilled]: (state, action) => {
            if (state.create.status === 'loading') {
                listsAdapter.addOne(state, action.payload)
                state.create.response = action.payload;
                state.create.status = 'succeeded'
            }
        },
        [createList.rejected]: (state, action) => {
            if (state.create.status === 'loading') {
                state.create.error = action.payload;
                state.create.status = 'failed'
            }
        },

        // Delete state
        [deleteList.pending]: (state, action) => {
            state.delete.status = 'loading';
            state.delete.error = null;
            state.delete.response = null
        },
        [deleteList.fulfilled]: (state, action) => {
            if (state.delete.status === 'loading') {
                listsAdapter.removeOne(state, action.payload.list_id)
                state.delete.response = action.payload
                state.delete.status = 'succeeded'
            }
        },
        [deleteList.rejected]: (state, action) => {
            if (state.delete.status === 'loading') {
                state.delete.error = action.payload;
                state.delete.status = 'failed'
            }
        },

        // Update state
        [updateList.pending]: (state, action) => {
            state.update.status = 'loading';
            state.update.error = null;
            state.update.response = null
        },
        [updateList.fulfilled]: (state, action) => {
            if (state.update.status === 'loading') {
                const listId = action.payload.list_id;
                state.entities[listId] = action.payload;
                state.update.response = action.payload;
                state.update.status = 'succeeded';
            }
        },
        [updateList.rejected]: (state, action) => {
            if (state.update.status === 'loading') {
                state.update.response = action.payload;
                state.update.status = 'failed';
            }
        },

    }
})

export const { initList } = listsSlice.actions

export default listsSlice.reducer