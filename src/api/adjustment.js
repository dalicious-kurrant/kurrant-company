import instance from 'configs/axiosConfig';
export const adjustApis = {
  getAdjustSpotsList: async () => await instance.get('paycheck'),
};
