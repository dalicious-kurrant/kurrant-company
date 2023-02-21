import axios from 'axios';
import Pagination from 'common/Pagination/Pagination';
import usePagination from 'common/Pagination/usePagination';
import Table from 'common/Table/Table';

import {useAtom} from 'jotai';
import {getCompanyMembershipDataListAtom} from 'jotai/state';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import {CompanyMembershipFields} from './CompanyMembershipData';

const CompanyMembership = ({}) => {
  // const {
  //   page,
  //   setPage,
  //   dataLimit,
  //   setDataLimit,
  //   pageList,
  //   handleButtonClick,
  //   handleGoToEdge,
  //   handleMove,
  // } = usePagination(dataTotalLength);

  const [companyMembershipDataList, setCompanyMembershipDataList] = useAtom(
    getCompanyMembershipDataListAtom,
  );

  // if (isLoading)
  //   return (
  //     <>
  //       {' '}
  //       <div>로딩중입니다..</div>{' '}
  //     </>
  //   );

  // if (status === 'error')
  //   return (
  //     <div>
  //       에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
  //       있어요
  //     </div>
  //   );

  return (
    <Container>
      {/* <Pagination
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
      /> */}
      {/* {console.log(dataList)} */}
      {/* {Array.isArray(dataList) && dataList.length !== 0 ? (
        <Table
          fieldsInput={CompanyMembershipFields}
          dataInput={dataList}
          isMemo={true}
          handleChange={handleMemoChange}
        />
      ) : (
        <div>아직 등록된 데이터가 없습니다. 데이터를 추가해주세요</div>
      )} */}
    </Container>
  );
};
export default CompanyMembership;

const Container = styled.section``;
