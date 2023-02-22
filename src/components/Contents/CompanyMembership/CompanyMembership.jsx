import Table from 'common/Table/Table';

import {useAtom} from 'jotai';
import {getCompanyMembershipDataAtom} from 'jotai/state';

import React from 'react';

import styled from 'styled-components';
import {CompanyMembershipFields} from './CompanyMembershipData';

import useDataRender from './useHooks/useDataRender';

const CompanyMembership = () => {
  const [companyMembershipList] = useAtom(getCompanyMembershipDataAtom);

  const {status, isLoading} = useDataRender();

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
    </Container>
  );
};
export default CompanyMembership;

const Container = styled.section``;
