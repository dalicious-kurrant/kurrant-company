import instance from 'configs/axiosConfig';
export const adjustApis = {
  getAdjustSpotsList: async () => await instance.get('paycheck'),
  getAdjustList: async (
    startMonth,
    endMonth,
    selectClient,
    selectStatus,
    selectModify,
  ) =>
    await instance.get(
      `paycheck?startYearMonth=${startMonth}&endYearMonth=${endMonth}`,
      {
        params: {
          corporationIds:
            selectClient.length === 0 ? null : selectClient.join(','),
          status: selectStatus === 99 ? null : selectStatus,
          hasRequest: selectModify === 99 ? null : selectModify,
        },
      },
    ),
  getInvoiceList: async id => await instance.get(`paycheck/${id}/invoice`),
  getMealList: async id => await instance.get(`paycheck/${id}/orders`),
  completeAdjust: async id => await instance.put(`paycheck/complete`, id),
  memoAdjust: async data =>
    await instance.put(`paycheck/${data.id}/memo`, {memo: data.memo}),
};
