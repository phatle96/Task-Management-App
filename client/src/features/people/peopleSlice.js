import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { axiosPost, axiosDelete, axiosPut, axiosFetch } from '../../utils/api';

export const fetchPeople = createAsyncThunk(
    'people/fetchPeople',
    async () => {
        const data = await axiosFetch('/person/all');
        return data;
    }
)

export const createPerson = createAsyncThunk(
    'people/createPerson',
    async (type, payload) => {
        const response = await axiosPost(type, payload);
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
        const response = await axiosDelete(payload);
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
    }),
    reducers: {
        personList: (state, action) => {

        },
        personFilter: (state, action) => {

        },
        personSort: (state, action) => {

        },
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

        [createPerson.fulfilled]: peopleAdapter.addOne,
        [createPerson.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

        [deletePerson.fulfilled]: peopleAdapter.removeOne,
        [deletePerson.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        [updatePerson.fulfilled]: (state, action) => {
            const personId = action.payload.person_id;
            state.entities[personId] = action.payload;
            state.status = 'succeeded';
        },
        [updatePerson.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },

    }
})

export const { personFilter, personSort, personRemoved } = peopleSlice.actions

export default peopleSlice.reducer