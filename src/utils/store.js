import {atomWithReset} from 'jotai/utils';
import {formattedWeekDate} from './dateFormatter';

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
