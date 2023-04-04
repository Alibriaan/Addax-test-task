import { configureStore, createSelector } from '@reduxjs/toolkit';
import calendaReducer, { CalendarState } from './slices/calendar';
import taskReducer, { TaskState } from './slices/tasks';
import uiReducer, { UiState } from './slices/ui';
import holidaysReducer, { HolidaysState } from './slices/holidays';

export interface RootState {
  calendaReducer: CalendarState;
  taskReducer: TaskState;
  uiReducer: UiState;
  holidaysReducer: HolidaysState;
}

export const store = configureStore({
  reducer: {
    calendaReducer,
    taskReducer,
    uiReducer,
    holidaysReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const selectSearchedTasks = (state: RootState) => state.taskReducer.tasks.filter(task => task.name.includes(state.taskReducer.searchQuery));
export const getSearchedText = (state: RootState) => state.taskReducer.searchQuery

export const selectSearchedTasksSelector = createSelector(
  [selectSearchedTasks, getSearchedText],
  (tasks, searchQuery) => tasks.filter((task) => task.name.includes(searchQuery))
);