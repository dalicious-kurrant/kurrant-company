import {additionalOrderApis} from 'api/additionalOrder';
import {useMutation, useQuery, useQueryClient} from 'react-query';

//추가 주문 가능 리스트
export function useGetExstraOrder(startDate, endDate) {
  return useQuery('extraFoodList', () => {
    return additionalOrderApis.extraDailyList(startDate, endDate);
  });
}

// 추가 주문한 내역 리스트
export function useGetExtraOrderList(startDate, endDate) {
  return useQuery('orderedList', () => {
    return additionalOrderApis.extraOrderList(startDate, endDate);
  });
}

// 상세스팟 조회
export function useGetSpotList(spotId) {
  return useQuery('spotList', () => {
    if (spotId !== undefined) {
      return additionalOrderApis.spotLoad(spotId);
    }
  });
}

// 추가주문 post
export function useSaveAdditionalOrder() {
  const queryClient = useQueryClient();
  return useMutation(
    data => additionalOrderApis.postOrder(data),

    {
      onSuccess: () => {
        //queryClient.invalidateQueries('getCompanyMembershipJSON');
      },
      onError: err => {
        console.log(err);
      },
    },
  );
}
