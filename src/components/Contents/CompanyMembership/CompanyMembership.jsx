import Table from 'common/Table/Table';
import React from 'react';
import styled from 'styled-components';
import {
  CompanyMembershipFields,
  CompanyMembershipMockData,
} from './CompanyMembershipData';

const CompanyMembership = ({}) => {
  return (
    <Container>
      <div>기업 가입 리스트 만들기~~~</div>

      <Table
        tableFieldsInput={CompanyMembershipFields}
        tableDataInput={CompanyMembershipMockData}
      />
    </Container>
  );
};
export default CompanyMembership;

const Container = styled.div``;
