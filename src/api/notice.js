import instance from 'configs/axiosConfig';

export const noticeApis = {
  getNoticeList: async (page, touch) =>
    await instance.get(`board?limit=15&page=${page}`, {
      params: {
        type: touch === 99 ? null : touch,
      },
    }),
};
