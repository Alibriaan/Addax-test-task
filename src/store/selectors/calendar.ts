import moment from "moment";
import { RootState } from "..";
import { DATE_FORMAT, TITLE_DATE_FORMAT } from "../../constants";

export const activeDateSelector = (state: RootState) => moment(state.calendaReducer.activeDate).format(DATE_FORMAT);

export const titleActiveDateSelector = (state: RootState) => moment(state.calendaReducer.activeDate).format(TITLE_DATE_FORMAT);