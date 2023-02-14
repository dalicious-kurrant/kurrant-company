import Table from 'common/Table/Table';

import {userStatusData} from 'data/userStatusData';

import styled from 'styled-components';

const UserStatus = () => {
  return (
    <Container>
      <div>UserStatus</div>

      <Table
        tableFieldsInput={[
          'userId',
          'password',
          'name',
          'userType',
          'phone',
          'email',
          'groupName',
          'point',
          'gourmetType',
          'isMembership',
        ]}
        tableDataInput={userStatusData}
      />
    </Container>
  );
};

export default UserStatus;

const Container = styled.div``;
