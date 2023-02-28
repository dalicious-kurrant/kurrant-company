import instance from 'configs/axiosConfig';

export const corporationApis = {
  corporationInfo: async () => await instance.get(`groups`),
};
