import {atomWithReset} from 'jotai/utils';
import {formattedWeekDate, formattedYearMonthDate} from './dateFormatter';

const day = new Date();
const days = formattedWeekDate(day);
export const startDateAtom = atomWithReset(days);
export const endDateAtom = atomWithReset(days);

export const userOptionAtom = atomWithReset('');
export const spotOptionAtom = atomWithReset('');
export const diningTypeOptionAtom = atomWithReset('');
export const makersOptionAtom = atomWithReset('');

export const extraStartDateAtom = atomWithReset(days);
export const extraEndDateAtom = atomWithReset(days);
export const extraListDataAtom = atomWithReset();

export const historyStartDateAtom = atomWithReset(days);
export const historyEndDateAtom = atomWithReset(days);

//정산

export const startMonthAtom = atomWithReset(formattedYearMonthDate(day));
export const endMonthAtom = atomWithReset(formattedYearMonthDate(day));
export const selectClientAtom = atomWithReset([]);
export const selectStatusAtom = atomWithReset();
export const selectModifyAtom = atomWithReset();

// 공지사항
export const noticePageAtom = atomWithReset(1);
