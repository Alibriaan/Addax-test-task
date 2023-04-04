import { RootState } from "..";

export const holidaysSelector = (state: RootState) => state.holidaysReducer.holidays;