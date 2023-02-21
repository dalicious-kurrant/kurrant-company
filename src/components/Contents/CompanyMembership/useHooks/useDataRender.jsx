import React from 'react';

import {useState} from 'react';
import {useEffect} from 'react';
import {useQuery} from 'react-query';
import {useAtom} from 'jotai';

import {getCompanyMembershipDataListAtom as getCompanyMembershipListAtom} from 'jotai/state';
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

  const [companyMembershipList, setCompanyMembershipList] = useAtom(
    getCompanyMembershipListAtom,
  );

  useEffect(() => {
    setCompanyMembershipList(getData);
  }, [getData]);
  return {
    getData,
    status,
    isLoading,
    companyMembershipList,
    setCompanyMembershipList,
  };
};
export default useDataRender;
