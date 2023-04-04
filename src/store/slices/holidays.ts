import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { HolidayResponse, StoredHoliday } from '../../types/holidays.types';
import { v4 as uuidv4 } from 'uuid';
import { CountryCodes } from '../../types/available-county.types';

export interface HolidaysState {
  holidays: StoredHoliday[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: HolidaysState = {
  holidays: [],
  loading: 'idle',
}


export const fetchWorldwideHolidays = createAsyncThunk(
  'holidays/fetchWorldwideHolidays',
  async () => {
    const response = await axios.get<HolidayResponse[]>('https://date.nager.at/api/v3/NextPublicHolidaysWorldwide');

    return response.data;
  }
);

export const holidaySlice = createSlice({
  name: 'holidays',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWorldwideHolidays.fulfilled, (state: HolidaysState, action: PayloadAction<HolidayResponse[]>) => {

      state.loading = 'succeeded';

      const names = action.payload.map((item) => item.name);

      state.holidays = action.payload
        .map((holiday) => ({ ...holiday, id: uuidv4()}))
        .filter((holiday, index) => {
          const firstIndex = names.indexOf(holiday.name);
          const lastHolidayIndex = names.lastIndexOf(holiday.name);

          if (firstIndex === index && lastHolidayIndex !== index) {
            return true;
          }

          return false;
        });
    });

    builder.addCase(fetchWorldwideHolidays.pending, (state: HolidaysState) => {
      state.loading = 'pending';
    });

    builder.addCase(fetchWorldwideHolidays.rejected, (state: HolidaysState) => {
      state.loading = 'failed';
    });
  },
})

export const {} = holidaySlice.actions

export default holidaySlice.reducer;