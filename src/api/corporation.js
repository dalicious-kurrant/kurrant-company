import instance from 'configs/axiosConfig';

export const corporationApis = {
  corporationInfo: async () => await instance.get(`groups`),
  nameSetting: async data =>
    await instance.post('groups/setting/manager/name', data),
  phoneSetting: async data =>
    await instance.post('groups/setting/manager/phone', data),
};
