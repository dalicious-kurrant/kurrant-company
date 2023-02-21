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
      `${process.env.REACT_APP_JSON_SERVER}/company-membership`,
    );

    return response.data;
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
