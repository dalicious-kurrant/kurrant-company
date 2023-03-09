import {atomWithReset} from 'jotai/utils';
import {formattedWeekDate} from './dateFormatter';

const day = new Date();
const days = formattedWeekDate(day);
export const startDateAtom = atomWithReset(days);
export const endDateAtom = atomWithReset(days);

export const userOptionAtom = atomWithReset('');
export const spotOptionAtom = atomWithReset('');
export const diningTypeOptionAtom = atomWithReset('');
