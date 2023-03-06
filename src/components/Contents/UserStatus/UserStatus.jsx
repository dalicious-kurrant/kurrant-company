import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import Register from 'common/CRUD/Register/Register';
import useMutate from 'common/CRUD/useMutate';
import {TableCheckboxStatusAtom, TableDeleteListAtom} from 'common/Table/store';
import TableCustom from 'common/Table/TableCustom';
import {useAtom} from 'jotai';
import {useState} from 'react';
import {useEffect} from 'react';
import {TableWrapper} from 'style/common.style';

import styled from 'styled-components';
import {clickButtonBundle} from '../Logics/Logics';
import {UserStatusDataAtom} from './store';
import {UserStatusFields, UserStatusFieldsData} from './userStatusData';
import {handleUserStatusDelete, sendFinal} from './userStatusLogics';
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

  if (isLoading)
    return (
      <>
        {' '}
        <div>로딩중입니다..</div>{' '}
      </>
    );

  if (userStatusData.length < 1)
    return (
      <>
        <div>데이터가 아직 없습니다. 데이터를 추가해주세요.</div>{' '}
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
      <>
        <TableWrapper>
          {userStatusData && userStatusData.length > 0 && (
            <TableCustom
              fieldsInput={UserStatusFields}
              dataInput={userStatusData}
              useCheckbox={false}
            />
          )}
        </TableWrapper>
      </>
    </Container>
  );
};

export default UserStatus;

const Container = styled.div``;
