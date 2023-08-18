import {memberApis} from 'api/member';
import {userapi} from 'api/member';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useUserLoad(page) {
  return useQuery('getUserList', () => {
    return userapi.getUserList(page);
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation(data => userapi.deleteCheckedMember(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('getUserList');
      alert('삭제 완료했습니다.');
    },
  });
}

export function useChangeMemo() {
  const queryClient = useQueryClient();
  return useMutation(data => userapi.changeMemoPost(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('getUserList');
      alert('수정 완료했습니다.');
    },
  });
}
