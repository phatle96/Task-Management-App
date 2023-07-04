import { createSelector, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    list: null,
    people: [],
    completed: false,
    overdue: false,
    ongoing: false,
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        listFilterChanged: (state, action) => {
            const { list } = action.payload;
            return state = { ...state, list: list };
        },
        tasksCompletedFilterChanged: (state, action) => {
            const { completed } = action.payload;
            return state = { ...state, completed: completed };
        },
        peopleFilterChanged: {
            reducer: (state, action) => {
                const { person, changeType } = action.payload;
                const { people } = state;
                switch (changeType) {
                    case 'added': {
                        if (!people.includes(person)) {
                            people.push(person);
                        };
                        break;
                    }
                    case 'removed': {
                        state.people = people.filter(
                            (existingPerson) => existingPerson !== person
                        );
                        break;
                    }
                    default:
                        return;
                };
            },
            prepare: (person, changeType) => {
                return {
                    payload: { person, changeType }
                };
            },
        }
    }
})

export const selectFilters = (state) => state.filters


export const {
    listFilterChanged,
    tasksCompletedFilterChanged,
    peopleFilterChanged } = filtersSlice.actions

export default filtersSlice.reducer