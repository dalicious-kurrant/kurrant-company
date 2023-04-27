import {memberApis} from 'api/member';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useGetMemberList() {
  const groupCode = localStorage.getItem('code');
  return useQuery('memberList', () => {
    return memberApis.loadMemberList(groupCode);
  });
}

export function useDeleteMember() {
  const queryClient = useQueryClient();
  return useMutation(data => memberApis.deleteMember(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('memberList');
    },
  });
}
