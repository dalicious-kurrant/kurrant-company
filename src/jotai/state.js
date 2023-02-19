import {ContentsRouterData} from 'data/ContentsRouterData';
import {atomWithReset} from 'jotai/utils';

export const contentSelectedAtom = atomWithReset(ContentsRouterData);

// 기업 가입 리스트

export const getCompanyMembershipDataListAtom = atomWithReset([]);
