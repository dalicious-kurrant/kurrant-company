import React from 'react';

import {useState} from 'react';
import {useEffect} from 'react';
import {useQuery} from 'react-query';
import {useAtom} from 'jotai';

import {getCompanyMembershipDataAtom as getCompanyMembershipListAtom} from 'jotai/state';
import axios from 'axios';

const useDataRender = () => {
  const {
    data: getData,
    status,
    isLoading,
  } = useQuery(['getCompanyMembership'], async () => {
    const response = await axios.get(
      // `${process.env.REACT_APP_JSON_SERVER}/company-membership`,
      `${process.env.REACT_APP_BASE_URL}/v1/client/members/waiting?code=AAAAAA`,
      // `${process.env.REACT_APP_BASE_URL}/v1/client/members?code=AAAAAA`,
    );
    console.log(response.data.data.items);
    return response.data.data.items;
  });

  const [, setCompanyMembershipList] = useAtom(getCompanyMembershipListAtom);

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
