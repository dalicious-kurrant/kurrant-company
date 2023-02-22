import axios from 'axios';
import {useAtom} from 'jotai';
import {getCompanyMembershipDataAtom} from 'jotai/state';
import {useEffect} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components';

const useCompanyMembership = () => {
  const [companyMembershipList, setCompanyMembershipList] = useAtom(
    getCompanyMembershipDataAtom,
  );

  const {data} = useQuery(
    ['getCompanyMembership'],
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/client/members/waiting?code=AAAAAA`,
      );

      return response.data.data.items;
    },
    // {
    //   enabled: false,
    // },
  );

  useEffect(() => {
    setCompanyMembershipList(data);
  }, [data]);

  return {};
};

export default useCompanyMembership;
