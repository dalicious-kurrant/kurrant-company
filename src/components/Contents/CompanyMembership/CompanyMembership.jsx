import axios from 'axios';
import Pagination from 'common/Pagination/Pagination';
import usePagination from 'common/Pagination/usePagination';
import Table from 'common/Table/Table';
import React from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import {
  CompanyMembershipFields,
  CompanyMembershipMockData,
} from './CompanyMembershipData';

const CompanyMembership = ({}) => {
  const {data: dataTotalLength} = useQuery(
    ['getCompanyMembershipLength'],
    async () => {
      const response = await axios.get(
        // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
        // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
        `${process.env.REACT_APP_JSON_SERVER_COMPANY_MEMBERSHIP}`,
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
  } = useQuery(
    ['getCompanyMembership', page, dataLimit],
    async ({queryKey}) => {
      const response = await axios.get(
        // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
        // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
        `${process.env.REACT_APP_JSON_SERVER_COMPANY_MEMBERSHIP}?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
        // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
      );
      return response.data;
    },
  );

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
      <div>기업 가입 리스트 만들기~~~</div>
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
        selectOptionArray={[1, 2, 4, 10]}
      />

      <Table
        tableFieldsInput={CompanyMembershipFields}
        tableDataInput={dataList}
      />
    </Container>
  );
};
export default CompanyMembership;

const Container = styled.div``;
