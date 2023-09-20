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
    data => {
      return registerCorporationApis.registerCorporation(data);
    },

    {
      onSuccess: () => {
        // queryClient.invalidateQueries(['getCompanyMembershipJSON']);
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
    onSuccess: res => {
      console.log(res, '000');
      //return window.location.reload();
    },
  });
}

// 매니저 이름 변경
export function useManagerNameSetting() {
  const queryClient = useQueryClient();
  return useMutation(data => corporationApis.nameSetting(data), {
    onSuccess: res => {
      queryClient.invalidateQueries('corporationInfoList');
      //return window.location.reload();
    },
  });
}

// 매니저 전화번호 변경
export function useManagerPhoneSetting() {
  const queryClient = useQueryClient();
  return useMutation(data => corporationApis.phoneSetting(data), {
    onSuccess: res => {
      queryClient.invalidateQueries('corporationInfoList');
      //return window.location.reload();
    },
  });
}
