import {ContentsRouterData} from 'components/Contents/ContentsRouterData';
import {atomWithReset} from 'jotai/utils';

export const contentSelectedAtom = atomWithReset(ContentsRouterData);

// 기업 멤버십

export const getCompanyMembershipDataListAtom = atomWithReset([]);
