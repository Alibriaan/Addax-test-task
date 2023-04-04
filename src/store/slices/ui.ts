import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TaskModalMode = 'create' | 'edit';

export interface UiState {
  taskModalMode: TaskModalMode;
  taskModalVisibility: boolean;
}

const initialState: UiState = {
  taskModalMode: 'create',
  taskModalVisibility: false,
}

export const calendarSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeTaskModalVisibility(state, action: PayloadAction<boolean>) {
      state.taskModalVisibility = action.payload;
    },
    changeTaskModalMode(state, action: PayloadAction<TaskModalMode>) {
      state.taskModalMode = action.payload;
    }
  },
})

export const { changeTaskModalVisibility, changeTaskModalMode } = calendarSlice.actions

export default calendarSlice.reducer