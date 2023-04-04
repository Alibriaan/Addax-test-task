import { RootState } from "..";

export const taskModalModeSelector = (state: RootState) => state.uiReducer.taskModalMode;

export const taskModalVisibleSelector = (state: RootState) => state.uiReducer.taskModalVisibility;