import instance from 'configs/axiosConfig';

export const memberApis = {
  loadMemberList: async groupCode =>
    await instance.get(`client/members?code=${groupCode}`),
  deleteMember: async data => await instance.patch('client/members', data),
};
