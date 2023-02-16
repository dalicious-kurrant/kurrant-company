import {ContentsRouterData} from 'components/Contents/ContentsRouterData';
import {atomWithReset} from 'jotai/utils';

export const contentSelectedAtom = atomWithReset(ContentsRouterData);
