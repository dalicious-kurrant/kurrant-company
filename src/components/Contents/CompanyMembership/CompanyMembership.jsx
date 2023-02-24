import axios from 'axios';
import ExcelTest from 'common/excel/ExcelTest';
import Pagination from 'common/Pagination/Pagination';
import usePagination from 'common/Pagination/usePagination';
import Table from 'common/Table/Table';
import useCompanyMembershipQuery from 'hooks/ReactQueryHooks/useCompanyMembershipQuery';

import {useAtom} from 'jotai';
import {exelCompanyMembershipAtom} from 'jotai/compayMembership';
import {getCompanyMembershipDataListAtom} from 'jotai/state';
import {getCompanyMembershipDataAtom} from 'jotai/state';

import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useQuery} from 'react-query';

import styled from 'styled-components';
import {CompanyMembershipFields} from './CompanyMembershipData';
import useDataRender from './useHooks/useDataRender';
const CompanyMembership = ({}) => {
  const [plan, setPlan] = useAtom(exelCompanyMembershipAtom);

  const [companyMembershipList] = useAtom(getCompanyMembershipDataAtom);

  const {dataList, editMutate, submitExelMutate} = useCompanyMembershipQuery();

  const [companyMembershipDataList, setCompanyMembershipDataList] = useAtom(
    getCompanyMembershipDataListAtom,
  );

  useEffect(() => {
    setCompanyMembershipDataList(dataList);
  }, [dataList]);

  const [memoData, setMemoData] = useState(undefined);

  const handleMemoChange = data => {
    setMemoData(data);
  };

  useEffect(() => {
    if (memoData) {
      editMutate(memoData);
    }
  }, [memoData]);
  const {status, isLoading} = useDataRender();

  // if (isLoading)
  //   return (
  //     <>
  //       {' '}
  //       <ExcelTest submitExelMutate={submitExelMutate} />
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
      <ExcelTest submitExelMutate={submitExelMutate} />
      {plan.length < 1 && (
        <>
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

          {Array.isArray(companyMembershipList) &&
          companyMembershipList.length !== 0 ? (
            <Table
              fieldsInput={CompanyMembershipFields}
              dataInput={companyMembershipList}
              // isMemo={true}
              // handleChange={handleMemoChange}
            />
          ) : (
            <div>아직 등록된 데이터가 없습니다. 데이터를 추가해주세요</div>
          )}
        </>
      )}
    </Container>
  );
};
export default CompanyMembership;

const Container = styled.section``;
