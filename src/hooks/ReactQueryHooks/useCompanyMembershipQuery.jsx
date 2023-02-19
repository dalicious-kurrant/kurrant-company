import axios from 'axios';
import React from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';

const useCompanyMembershipQuery = (
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
        // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
        `${process.env.REACT_APP_JSON_SERVER}/company-membership`,
        // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
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
        // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
        `${process.env.REACT_APP_JSON_SERVER}/company-membership/?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
        // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
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
        `${process.env.REACT_APP_JSON_SERVER}/company-membership`,
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
      const response = await axios.put(
        `${process.env.REACT_APP_JSON_SERVER}/company-membership/${todo.id}`,
        todo,
      );
      return response;
    },
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries('getCompanyMembership');
      },
      onError: () => {
        console.log('에러가 떳군요, 개발자분들한테 문의해주세요 ');
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
  };
};
export default useCompanyMembershipQuery;
