import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '../features/lists/listsSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import subtasksReducer from '../features/subtasks/subtasksSlice';
import peopleReducer from '../features/people/peopleSlice';
import filtersReducer from '../features/filters/filtersSlice'

export default configureStore({
  reducer: {
    lists: listsReducer,
    tasks: tasksReducer,
    subtasks: subtasksReducer,
    people: peopleReducer,
    filters: filtersReducer,
  }
})