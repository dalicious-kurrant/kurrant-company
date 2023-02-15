import axios from 'axios';
import Table from 'common/Table/Table';

import {userStatusFields, userStatusMockData} from 'data/userStatusData';
import {useEffect} from 'react';
import {useQuery} from 'react-query';

import styled from 'styled-components';

const UserStatus = () => {
  // const {
  //   data: userStatusData,
  //   status,
  //   isLoading,
  // } = useQuery('getTodos', async () => {
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
  //   );
  //   return response.data;
  // });

  // useEffect(() => {
  //   console.log(userStatusData);
  // }, [userStatusData]);

  // checkbox 관리하기

  return (
    <Container>
      <Table
        tableFieldsInput={userStatusFields}
        tableDataInput={userStatusMockData}
      />
    </Container>
  );
};

export default UserStatus;

const Container = styled.div``;
