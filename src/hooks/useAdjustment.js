import {adjustApis} from '../api/adjustment';
import {QueryClient, useMutation, useQuery, useQueryClient} from 'react-query';

export function useSpotsAdjustList() {
  return useQuery('paycheck', () => {
    return adjustApis.getAdjustSpotsList();
  });
}

export function useGetAdjustList(
  startMonth,
  endMonth,
  selectClient,
  selectStatus,
  selectModify,
) {
  return useQuery('adjustList', () => {
    return adjustApis.getAdjustList(
      startMonth,
      endMonth,
      selectClient,
      selectStatus,
      selectModify,
    );
  });
}

export function useGetInvoiceList(id) {
  return useQuery('invoiceData', () => {
    return adjustApis.getInvoiceList(id);
  });
}

export function useCompleteAdjust() {
  const queryClient = useQueryClient();
  return useMutation(data => adjustApis.completeAdjust(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('invoiceData');
    },
  });
}

export function useMemoAdjust() {
  const queryClient = useQueryClient();
  return useMutation(data => adjustApis.memoAdjust(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('invoiceData');
    },
  });
}

export function useGetMealList(id) {
  return useQuery('mealList', () => {
    return adjustApis.getMealList(id);
  });
}
