import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { axiosPost, axiosPut, axiosFetch } from '../../utils/api';


export const fetchPeople = createAsyncThunk(
    'people/fetchPeople',
    async () => {
        const data = await axiosFetch('/person/all');
        return data
    }
)

export const createPerson = createAsyncThunk(
    'people/createPerson',
    async (payload) => {
        const response = await axiosPost(payload);
        return response;
    }
);

export const updatePerson = createAsyncThunk(
    'people/updatePerson',
    async (payload) => {
        const response = await axiosPut(payload);
        return response;
    }
);

export const deletePerson = createAsyncThunk(
    'people/deletePerson',
    async (payload) => {
        const response = await axiosPut(payload);
        return response;
    }
);

const peopleAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
    selectId: (e) => e.person_id,
})

const selectPeople = (state) => state.people

const peopleSelectors = peopleAdapter.getSelectors(selectPeople)


export const {
    selectAll: selectAllPeople,
    selectIds: selectPersonIds,
    selectById: selectPersonById,
} = peopleSelectors


const peopleSlice = createSlice({
    name: 'people',
    initialState: peopleAdapter.getInitialState({
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
        initPerson: (state) => {
            state.create.status = 'idle';
            state.create.response = null
        },
        initDeletePerson: (state) => {
            state.delete.status = 'idle';
            state.delete.response = null
        }
    },
    extraReducers: {
        [fetchPeople.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchPeople.fulfilled]: (state, action) => {
            if (state.status === 'loading') {
                peopleAdapter.upsertMany(state, action);
                state.status = 'succeeded';
            }
        },
        [fetchPeople.rejected]: (state, action) => {
            if (state.status === 'loading') {
                state.status = 'failed';
                state.error = action.payload;
            }
        },

        // Create state
        [createPerson.pending]: (state, action) => {
            state.create.status = 'loading';
            state.create.response = null
            state.create.error = null;
        },
        [createPerson.fulfilled]: (state, action) => {
            if (state.create.status === 'loading') {
                peopleAdapter.addOne(state, action.payload)
                state.create.response = action.payload;
                state.create.status = 'succeeded'
            }
        },
        [createPerson.rejected]: (state, action) => {
            if (state.create.status === 'loading') {
                state.create.error = action.payload;
                state.create.status = 'failed'
            }
        },

        // Delete state
        [deletePerson.pending]: (state, action) => {
            state.delete.status = 'loading';
            state.delete.error = null;
            state.delete.response = null
        },
        [deletePerson.fulfilled]: (state, action) => {
            if (state.delete.status === 'loading') {
                peopleAdapter.removeOne(state, action.payload.person_id)
                state.delete.response = action.payload
                state.delete.status = 'succeeded'
            }
        },
        [deletePerson.rejected]: (state, action) => {
            if (state.delete.status === 'loading') {
                state.delete.error = action.payload;
                state.delete.status = 'failed'
            }
        },

        // Update state
        [updatePerson.pending]: (state, action) => {
            state.update.status = 'loading';
            state.update.error = null;
            state.update.response = null
        },
        [updatePerson.fulfilled]: (state, action) => {
            if (state.update.status === 'loading') {
                const personId = action.payload.person_id;
                state.entities[personId] = action.payload;
                state.update.response = action.payload;
                state.update.status = 'succeeded';
            }
        },
        [updatePerson.rejected]: (state, action) => {
            if (state.update.status === 'loading') {
                state.update.response = action.payload;
                state.update.status = 'failed';
            }
        },


    }
})

export const { initPerson, initDeletePerson } = peopleSlice.actions

export default peopleSlice.reducer