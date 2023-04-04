import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const tasksSelector = (state: RootState) => state.taskReducer.tasks;

export const activeTaskIdSelector = (state: RootState) => state.taskReducer.activeTaskId;

export const selectSearchedTasks = (state: RootState) => state.taskReducer.tasks.filter(task => task.name.includes(state.taskReducer.searchQuery));

export const getSearchedText = (state: RootState) => state.taskReducer.searchQuery

export const selectSearchedTasksSelector = createSelector(
  [selectSearchedTasks, getSearchedText],
  (tasks, searchQuery) => tasks.filter((task) => task.name.includes(searchQuery))
);
