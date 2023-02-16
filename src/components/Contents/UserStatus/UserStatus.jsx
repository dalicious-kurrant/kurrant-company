import axios from 'axios';
import DataLimitSelect from 'common/Pagination/Childs/DataLimitSelect';
import {
  calculatePageMove,
  calculateTotalPages,
} from 'common/Pagination/Logics/PaginationLogics';
import Pagination from 'common/Pagination/Pagination';
import usePagination from 'common/Pagination/usePagination';
import Table from 'common/Table/Table';

import {userStatusFields} from 'data/userStatusData';

import {useQuery} from 'react-query';

import styled from 'styled-components';

const UserStatus = () => {
  ////////////////////////////////////////////////////////////////////
  // pagination 쓰는 법

  // pagination위치: src/common/Pagination의 Pagination.jsx와 usePagination.jsx를 가져다 쓰면 됩니다

  // 필요한 데이터 딱 두가지

  // 1. paginate된 데이터(dataList)
  //      -  현재 페이지는 'page', 페이지 당 보여주는 데이터 수 는 'dataLimit'로 paginate시켰습니다.
  // 2. 받아오는 데이터 총 개수(dataTotalLength)

  // 이상입니다

  // 질문은 슬랙으로~~

  ////////////////////////////////////////////////////////////////////

  const {data: dataTotalLength} = useQuery(
    ['getUserStatusLength'],
    async () => {
      const response = await axios.get(
        // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
        `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
        // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
      );

      return response.data.length;
    },
  );

  const {
    page,
    setPage,
    dataLimit,
    setDataLimit,
    pageList,
    handleButtonClick,
    handleGoToEdge,
    handleMove,
  } = usePagination(dataTotalLength);

  const {
    data: dataList,
    status,
    isLoading,
  } = useQuery(['getUserStatus', page, dataLimit], async ({queryKey}) => {
    const response = await axios.get(
      // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
      `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
      // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
    );
    return response.data;
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

  return (
    <Container>
      <Pagination
        dataTotalLength={dataTotalLength}
        page={page}
        setPage={setPage}
        dataLimit={dataLimit}
        setDataLimit={setDataLimit}
        pageList={pageList}
        handleButtonClick={handleButtonClick}
        handleGoToEdge={handleGoToEdge}
        handleMove={handleMove}
      />

      {!!dataList && dataList.length !== 0 && (
        <Table tableFieldsInput={userStatusFields} tableDataInput={dataList} />
      )}
    </Container>
  );
};

export default UserStatus;

const Container = styled.div``;
