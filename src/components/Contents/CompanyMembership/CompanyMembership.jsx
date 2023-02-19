import axios from 'axios';
import Pagination from 'common/Pagination/Pagination';
import usePagination from 'common/Pagination/usePagination';
import Table from 'common/Table/Table';
import {useAtom} from 'jotai';
import {getCompanyMembershipDataListAtom} from 'jotai/state';
import React from 'react';
import {useEffect} from 'react';
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
        `${process.env.REACT_APP_JSON_SERVER}/company-membership`,
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
        `${process.env.REACT_APP_JSON_SERVER}/company-membership/?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
        // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
      );
      return response.data;
    },
  );

  //sdfsdf
  const [companyMembershipDataList, setCompanyMembershipDataList] = useAtom(
    getCompanyMembershipDataListAtom,
  );

  useEffect(() => {
    setCompanyMembershipDataList(dataList);
  }, [dataList]);

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
        selectOptionArray={[1, 2, 4, 10]}
      />

      {Array.isArray(dataList) && dataList.length !== 0 ? (
        <Table
          tableFieldsInput={CompanyMembershipFields}
          tableDataInput={dataList}
          isMemo={true}
        />
      ) : (
        <div>아직 등록된 데이터가 없습니다. 데이터를 추가해주세요</div>
      )}
    </Container>
  );
};
export default CompanyMembership;

const Container = styled.div``;
