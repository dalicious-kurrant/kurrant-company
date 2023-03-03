import axios from 'axios';
import React from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
const apiUrl =
  process.env.REACT_APP_NODE_ENV === 'local'
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_NODE_ENV === 'json'
    ? process.env.REACT_APP_JSON_SERVER
    : process.env.REACT_APP_BASE_URL;

const useCompanyMembershipExelQuery = () => {
  const queryClient = useQueryClient();

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
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    submitExelMutate,
  };
};
export default useCompanyMembershipExelQuery;
