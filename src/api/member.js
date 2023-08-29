import instance from 'configs/axiosConfig';

export const userapi = {
  getUserList: async (page, touch) =>
    await instance.get(`client/members?code=B1272K`, {}),
  deleteCheckedMember: async data =>
    await instance.patch('client/members', data),
  changeMemoPost: async data => {
    return await instance.post('client/members/memo', data);
  },
};
