import axios from 'axios';
import React from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
const apiUrl =
  process.env.REACT_APP_NODE_ENV === 'local'
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_NODE_ENV === 'json'
    ? process.env.REACT_APP_JSON_SERVER
    : process.env.REACT_APP_BASE_URL;

const useCompanyMembershipExelQuery = (
  page = 1,
  dataLimit = 1,
  disableList = [],
) => {
  const queryClient = useQueryClient();

  // disableList에 들어갈 수 있는 것들
  // getCompanyMembershipLength , getCompanyMembership,

  // 쿼리 이름: getCompanyMembershipLength
  const {data: dataTotalLength} = useQuery(
    ['getCompanyMembershipLength'],
    async () => {
      const response = await axios.get(
        // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
        // `${apiUrl_USER_STATUS}`,
        `${apiUrl}/v1/client/members/waiting?code=AAAAAA`,
        // `${apiUrl_USER_STATUS}`,
      );
      return response.data.length;
    },
    {
      enabled: disableList.includes('getCompanyMembershipLength')
        ? false
        : true,
    },
  );

  // 쿼리 이름: getCompanyMembership
  const {
    data: dataList,
    status,
    isLoading,
  } = useQuery(
    ['getCompanyMembership', page, dataLimit],
    async ({queryKey}) => {
      const response = await axios.get(
        // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
        // `${apiUrl_USER_STATUS}?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
        `${apiUrl}/v1/client/members/waiting?code=AAAAAA&_page=${queryKey[1]}&_limit=${queryKey[2]}`,
        // `${apiUrl_USER_STATUS}`,
      );

      return response.data;
    },
    {
      enabled: disableList.includes('getCompanyMembership') ? false : true,
    },
  );

  // 쿼리 이름: submitMutate

  const {mutate: submitMutate} = useMutation(
    async newTodo => {
      const response = await axios.post(
        `${apiUrl}/company-membership`,
        newTodo,
      );
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getCompanyMembership']);
        queryClient.invalidateQueries(['getCompanyMembershipLength']);
      },
      onError: error => {
        console.log(error);
      },
    },
  );
  const {mutate: submitExelMutate} = useMutation(
    async newTodo => {
      const response = await axios.post(
        `${apiUrl}/v1/client/members/excel`,
        newTodo,
      );
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getCompanyMembership']);
        queryClient.invalidateQueries(['getCompanyMembershipLength']);
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  // 쿼리 이름: editMutate

  const {mutate: editMutate} = useMutation(
    async todo => {
      // console.log(todo);
      const response = await axios.put(
        `${apiUrl}/company-membership/${todo.id}`,
        todo,
      );
      return response;
    },
    {
      onSuccess: () => {
        console.log('수정완료!');
        queryClient.invalidateQueries('getCompanyMembership');
      },
      onError: () => {
        console.log('에러가 떳군요, 개발자분들한테 문의해주세요 ');
      },
    },
  );

  const {mutate: deleteMutate} = useMutation(
    async id => {
      const response = await axios.delete(`${apiUrl}/company-membership/${id}`);
      return response;
    },
    {
      onSuccess: () => {
        console.log('success');

        queryClient.invalidateQueries('getCompanyMembership');
      },
      onError: () => {
        console.log(
          '이런 deleteMutate에 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요',
        );
      },
    },
  );

  return {
    dataTotalLength,
    dataList,
    status,
    isLoading,
    submitMutate,
    editMutate,
    deleteMutate,
    submitExelMutate,
  };
};
export default useCompanyMembershipExelQuery;
