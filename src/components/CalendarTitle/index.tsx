import styled from "styled-components";

export const CALENDAR_TITLE_CLASSES = {
  calendarTitle: "calendar-title"
};

export const CalendarTitle =  styled.h2.attrs(() => ({
  className: CALENDAR_TITLE_CLASSES,
}))`
  margin: 0;
  text-align: center;
`