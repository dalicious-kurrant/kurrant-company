import ExcelTest from 'common/excel/ExcelTest';

import useCompanyMembershipQuery from 'hooks/ReactQueryHooks/useCompanyMembershipQuery';

import {useAtom} from 'jotai';
import {exelCompanyMembershipAtom} from 'jotai/compayMembership';

import React from 'react';

import styled from 'styled-components';

const CompanyMembership = ({}) => {
  const [plan, setPlan] = useAtom(exelCompanyMembershipAtom);

  const {dataList, editMutate, submitExelMutate} = useCompanyMembershipQuery();

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
      {plan.length < 1 && <></>}
    </Container>
  );
};
export default CompanyMembership;

const Container = styled.section``;
