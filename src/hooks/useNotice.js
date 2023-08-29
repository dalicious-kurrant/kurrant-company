import {noticeApis} from 'api/notice';
import {useQuery} from 'react-query';

export function useNoticeLoad(page, touch) {
  return useQuery('noticeList', () => {
    return noticeApis.getNoticeList(page, touch);
  });
}
