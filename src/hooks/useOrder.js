import {orderApis} from 'api/order';
import {useQuery} from 'react-query';

export function useGetGroupInformation(startDate, endDate) {
  return useQuery('groupList', () => {
    return orderApis.getGroup(startDate, endDate);
  });
}

export function useGetOrderList(startDate, endDate, params) {
  return useQuery('orderList', () => {
    return orderApis.orderList(startDate, endDate, params);
  });
}

export function useGetOrderDetailList(orderCode) {
  return useQuery('orderDetailList', () => {
    return orderApis.orderDetail(orderCode);
  });
}

export function useGetOrderStatistic(startDate, endDate) {
  return useQuery('orderStatistic', () => {
    return orderApis.orderStatistic(startDate, endDate);
  });
}
