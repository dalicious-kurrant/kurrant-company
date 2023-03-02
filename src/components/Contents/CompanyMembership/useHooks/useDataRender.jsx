import React from 'react';

import {useState} from 'react';
import {useEffect} from 'react';
import {useQuery} from 'react-query';
import {useAtom} from 'jotai';

import axios from 'axios';
import {getCompanyMembershipDataAtom} from 'jotai/state';

const useDataRender = () => {
  const {
    data: getData,
    status,
    isLoading,
  } = useQuery(['getCompanyMembership'], async () => {
    const code = localStorage.getItem('code');
    const response = await axios.get(
      // `${process.env.REACT_APP_JSON_SERVER}/company-membership`,
      `${process.env.REACT_APP_BASE_URL}/v1/client/members/waiting?code=${code}`,
    );

    console.log(response.data.data.items);

    return response.data.data.items;
  });

  const [, setCompanyMembershipList] = useAtom(getCompanyMembershipDataAtom);

  useEffect(() => {
    if (getData) {
      setCompanyMembershipList(getData);
    }
  }, [getData]);
  return {
    getData,
    status,
    isLoading,
  };
};
export default useDataRender;
