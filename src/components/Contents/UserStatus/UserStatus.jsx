import {TableCheckboxStatusAtom, TableDeleteListAtom} from 'common/Table/store';
import TableCustom from 'common/Table/TableCustom';
import {useAtom} from 'jotai';

import {useEffect} from 'react';
import {TableWrapper} from 'style/common.style';

import styled from 'styled-components';

import {UserStatusDataAtom} from './store';
import {UserStatusFields, UserStatusFieldsData} from './userStatusData';

import useUserStatusQuery from './useUserStatusQuery';

const UserStatus = () => {
  const [userStatusData, setUserStatusData] = useAtom(UserStatusDataAtom);

  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);

  const [tableDeleteList, setTableDeleteList] = useAtom(TableDeleteListAtom);

  const {status, isLoading} = useUserStatusQuery(
    ['getUserStatusJSON'],
    UserStatusDataAtom,
  );

  useEffect(() => {
    return () => {
      setCheckboxStatus({});
      setTableDeleteList([]);
    };
  }, []);

  let bool1 = userStatusData && userStatusData.length > 0;

  useEffect(() => {
    if (status === 'error') {
      console.log(`멤버십 유저현황  데이터 요청 중 에러가 났습니다 `);
    }
  }, [status]);

  if (isLoading)
    return (
      <>
        {' '}
        <div>로딩중입니다..</div>{' '}
      </>
    );

  return (
    <Container>
      <>
        <TableWrapper>
          {status === 'success' && userStatusData.length < 1 && (
            <div>데이터가 아직 없습니다. </div>
          )}

          {bool1 ? (
            <TableCustom
              fieldsInput={UserStatusFields}
              dataInput={userStatusData}
              useCheckbox={false}
            />
          ) : (
            <>
              <TableCustom
                fieldsInput={UserStatusFields}
                dataInput={[]}
                useCheckbox={false}
              />
            </>
          )}
        </TableWrapper>
      </>
    </Container>
  );
};

export default UserStatus;

const Container = styled.div``;
