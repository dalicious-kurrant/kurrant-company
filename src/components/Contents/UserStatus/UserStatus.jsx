import axios from 'axios';
import Table from 'common/Table/Table';

import {userStatusFields, userStatusMockData} from 'data/userStatusData';
import {useState} from 'react';
import {useEffect} from 'react';
import {useQuery} from 'react-query';

import styled from 'styled-components';

const UserStatus = () => {
  const [page, setPage] = useState([]);

  const {
    data: userStatusData,
    status,
    isLoading,
  } = useQuery(['getUserStatus', page], async ({queryKey}) => {
    const response = await axios.get(
      // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
      `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}?_page=${queryKey[1]}&_limit=2`,
      // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
    );
    return response.data;
  });

  const handleButtonClick = e => {
    setPage(e.target.id);
  };

  return (
    <Container>
      <ButtonWrap>
        <Button id={1} onClick={handleButtonClick}>
          1
        </Button>
        <Button id={2} onClick={handleButtonClick}>
          2
        </Button>
        <Button id={3} onClick={handleButtonClick}>
          3
        </Button>
      </ButtonWrap>
      {/* {console.log(userStatusDataGet)} */}
      {/* {!!userStatusDataGet && userStatusDataGet.length !== 0 && ( */}
      {!!userStatusData && userStatusData.length !== 0 && (
        <Table
          tableFieldsInput={userStatusFields}
          tableDataInput={userStatusData}
          // tableDataInput={userStatusDataGet}
          // tableDataInput={userStatusMockData}
        />
      )}
    </Container>
  );
};

export default UserStatus;

const Container = styled.div``;
const ButtonWrap = styled.div``;
const Button = styled.button``;
