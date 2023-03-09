import {orderApis} from 'api/order';
import {useQuery} from 'react-query';

export function useGetGroupInformation() {
  return useQuery('groupList', () => {
    return orderApis.getGroup();
  });
}

export function useGetOrderList(startDate, endDate, params) {
  return useQuery('orderList', () => {
    return orderApis.orderList(startDate, endDate, params);
  });
}
