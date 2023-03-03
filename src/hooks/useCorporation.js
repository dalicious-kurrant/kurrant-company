import {corporationApis} from 'api/corporation';
import {registerCorporationApis} from 'api/registerCorporation';
import {useMutation, useQuery, useQueryClient} from 'react-query';

export function useGetCorporationInfo() {
  return useQuery('corporationInfoList', () => {
    return corporationApis.corporationInfo();
  });
}
export function useSaveExelCorporation() {
  const queryClient = useQueryClient();
  return useMutation(
    data => registerCorporationApis.registerCorporation(data),

    {
      onSuccess: () => {
        //queryClient.invalidateQueries('getCompanyMembershipJSON');
        return window.location.reload();
      },
      onError: err => {
        console.log(err);
      },
    },
  );
}

export function useDeleteMember() {
  return useMutation(data => registerCorporationApis.deleteMember(data), {
    onSuccess: () => {
      return window.location.reload();
    },
  });
}
