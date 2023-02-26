import axios from 'axios';
import DataLimitSelect from 'common/Pagination/Childs/DataLimitSelect';
import {
  calculatePageMove,
  calculateTotalPages,
} from 'common/Pagination/Logics/PaginationLogics';
import Pagination from 'common/Pagination/Pagination';
import usePagination from 'common/Pagination/usePagination';
import Table from 'common/Table/Table';

import {userStatusFields} from 'components/Contents/UserStatus/userStatusData';
import {useEffect} from 'react';

import {useQuery} from 'react-query';

import styled from 'styled-components';

const UserStatus = () => {
  ////////////////////////////////////////////////////////////////////
  // pagination 쓰는 법

  // pagination위치: src/common/Pagination의 Pagination.jsx와 usePagination.jsx를 가져다 쓰면 됩니다

  // 준비물 총 세가지: 필요한 데이터 딱 두가지 & 필요한 설정 딱 한가지

  // 필요한 데이터 딱 두가지

  // 1. paginate된 데이터(dataList: array)
  //      -  현재 페이지는 'page', 페이지 당 보여주는 데이터 수 는 'dataLimit'로 paginate시켰습니다.
  // 2. 받아오는 데이터 총 개수(dataTotalLength: number)

  // 필요한 설정 딱 한가지

  // 1. '몇'개 씩 보이게 하기의 '몇'을 배열로 넣어주시면 됩니다
  // 예) 1, 2, 4, 10 개씩 보여주고 싶다 -> [1, 2, 4, 10]

  // 위 준비물이 모두 준비가 됬다면...

  // usePagination(dataTotalLength)

  //  <Pagination  selectOptionArray={[1, 2, 4, 10]} />

  // 이상입니다

  // 질문은 슬랙으로~~

  ////////////////////////////////////////////////////////////////////

  const {
    data: dataList,
    status,
    isLoading,
    // } = useQuery(['getUserStatus', page, dataLimit], async ({queryKey}) => {
  } = useQuery(['getUserStatus'], async ({queryKey}) => {
    const response = await axios.get(
      // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
      `${process.env.REACT_APP_BASE_URL}/v1/client/members/waiting?code=AAAAAA`,
      // `${process.env.REACT_APP_JSON_SERVER}/user-status/?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
      // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
    );

    return response.data.data;
  });

  if (isLoading)
    return (
      <>
        {' '}
        <div>로딩중입니다..</div>{' '}
      </>
    );

  if (status === 'error')
    return (
      <div>
        에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
        있어요
      </div>
    );

  if (status === 'success')
    return (
      <Container>
        {!!dataList && dataList.length !== 0 && (
          <Table
            useCheckbox={false}
            fieldsInput={userStatusFields}
            dataInput={dataList}
          />
        )}
      </Container>
    );
};

export default UserStatus;

const Container = styled.div``;
