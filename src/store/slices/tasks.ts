import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../types/task.types';
import { Tag } from '../../types/tag.types';

export interface TaskState {
  tasks: Task[];
  activeTaskId: string;
  searchQuery: string;
}

const initialState: TaskState = {
  tasks: [],
  activeTaskId: '',
  searchQuery: '',
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[taskIndex] = action.payload;
    },
    deleteTask(state, action: PayloadAction<string>) {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload);
      state.tasks.splice(taskIndex, 1);
    },
    updateTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    updateTaskName(state, action: PayloadAction<{id: string, name: string}>) {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[taskIndex].name = action.payload.name;
    },
    updateTaskDate(state, action: PayloadAction<{id: string, date: string}>) {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[taskIndex].date = action.payload.date;
    },
    updateTaskTags(state, action: PayloadAction<{id: string, tags: Tag[]}>) {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[taskIndex].tags = action.payload.tags;
    },
    updateTagName(state, action: PayloadAction<{id: string, name: string}>) {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
      state.tasks[taskIndex].name = action.payload.name;
    },
    updateTagColor(state, action: PayloadAction<{taskId: string, tagId: string,  color: string}>) {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload.taskId);
      const tagIndex = state.tasks[taskIndex].tags.findIndex(tag => tag.id === action.payload.tagId);
      state.tasks[taskIndex].tags[tagIndex].color = action.payload.color;
    },
    updateActiveTaskId(state, action: PayloadAction<string>) {
      state.activeTaskId = action.payload;
    },
    updateSearhQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    switchTaskOrders(state, action: PayloadAction<{source: string, destination: string}>) {
      const taskIndex1 = state.tasks.findIndex(task => task.id === action.payload.source);
      const taskIndex2 = state.tasks.findIndex(task => task.id === action.payload.destination);

      const temp = state.tasks[taskIndex1];

      state.tasks[taskIndex1] = state.tasks[taskIndex2];
      state.tasks[taskIndex2] = temp;
    }
  },
});

export const {
  createTask,
  updateTask,
  updateTasks,
  deleteTask,
  updateTaskName,
  updateTaskDate,
  updateTaskTags,
  updateTagName,
  updateTagColor,
  updateActiveTaskId,
  updateSearhQuery,
  switchTaskOrders,
} = taskSlice.actions

export default taskSlice.reducer;