import instance from 'configs/axiosConfig';

export const registerCorporationApis = {
  registerCorporation: async data =>
    await instance.post('client/members', data),
  deleteMember: async data =>
    await instance.post('client/members/waiting', data),
};
