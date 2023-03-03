import instance from 'configs/axiosConfig';

export const registerCorporationApis = {
  registerCorporation: async data =>
    await instance.post('client/members/excel', data),
  deleteMember: async data =>
    await instance.post('client/members/waiting', data),
};
