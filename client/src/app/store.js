import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/tasksSlice'
import listsReducer from '../features/lists/listsSlice'
import filtersReducer from '../features/filters/filtersSlice'

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    lists: listsReducer,
    filters: filtersReducer,
    
  }
})