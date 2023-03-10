import instance from 'configs/axiosConfig';

export const orderApis = {
  getGroup: async () => await instance.get('orders/info'),
  orderList: async (startDate, endDate, params) =>
    await instance.get(
      `orders?startDate=${startDate}&endDate=${endDate}${params.spots}${params.type}${params.user}`,
    ),
  orderDetail: async orderCode => await instance.get(`orders/${orderCode}`),
};
