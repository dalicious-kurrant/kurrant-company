import instance from 'configs/axiosConfig';

export const orderApis = {
  getGroup: async (startDate, endDate) =>
    await instance.get(`orders/info?startDate=${startDate}&endDate=${endDate}`),
  orderList: async (startDate, endDate, params) =>
    await instance.get(
      `orders?startDate=${startDate}&endDate=${endDate}${params.spots}${params.type}${params.user}${params.makersId}`,
    ),
  orderDetail: async orderCode => await instance.get(`orders/${orderCode}`),
  orderStatistic: async (startDate, endDate) =>
    await instance.get(
      `orders/statistic?startDate=${startDate}&endDate=${endDate}`,
    ),
};
