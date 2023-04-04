import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment';
import { DATE_FORMAT } from '../../constants';

export interface CalendarState {
  activeDate: string;
}

const initialState: CalendarState = {
  activeDate: moment().format(DATE_FORMAT),
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setActiveDate: (state, action: PayloadAction<string>) => {
      state.activeDate = action.payload;
    },
    increaseDateByMonth: (state, action: PayloadAction<number>) => {
      state.activeDate = moment(state.activeDate).add(1, 'month').format(DATE_FORMAT);
    },
    decreaseDateByMonth: (state, action: PayloadAction<number>) => {
      state.activeDate = moment(state.activeDate).subtract(1, 'month').format(DATE_FORMAT);
    },
  },
})

export const {
  setActiveDate,
  increaseDateByMonth,
  decreaseDateByMonth
} = calendarSlice.actions

export default calendarSlice.reducer