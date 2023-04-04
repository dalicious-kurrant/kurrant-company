import instance from 'configs/axiosConfig';

export const additionalOrderApis = {
  postOrder: async data => await instance.post('orders/extra', data),
  extraDailyList: async (startDate, endDate) =>
    await instance.get(
      `orders/extra/dailyFoods?startDate=${startDate}&endDate=${endDate}`,
    ),
  extraOrderList: async (startDate, endDate) =>
    await instance.get(
      `orders/extra?startDate=${startDate}&endDate=${endDate}`,
    ),
  spotLoad: async spotId => await instance.get(`groups/${spotId}/spots`),
};
