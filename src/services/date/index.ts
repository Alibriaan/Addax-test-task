import moment from "moment";

export const getMonthDaysByDate = (date: string | moment.Moment) => {
  return Array.from(Array(moment(date).daysInMonth()).keys()).map((day) => day + 1);
}