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

<<<<<<< HEAD
  // 1. paginate된 데이터(dataList: array)
  //      -  현재 페이지는 'page', 페이지 당 보여주는 데이터 수 는 'dataLimit'로 paginate시켰습니다.
  // 2. 받아오는 데이터 총 개수(dataTotalLength: number)

  // 필요한 설정 딱 한가지

  // 1. '몇'개 씩 보이게 하기의 '몇'을 배열로 넣어주시면 됩니다
  // 예) 1, 2, 4, 10 개씩 보여주고 싶다 -> [1, 2, 4, 10]

  // 위 준비물이 모두 준비가 됬다면...

  // usePagination(dataTotalLength)

  //  <Pagination  selectOptionArray={[1, 2, 4, 10]} />

  // 이상입니다

  // 질문은 슬랙으로~~

  ////////////////////////////////////////////////////////////////////

  const {
    data: dataList,
    status,
    isLoading,
    // } = useQuery(['getUserStatus', page, dataLimit], async ({queryKey}) => {
  } = useQuery(['getUserStatus'], async ({queryKey}) => {
    const code = localStorage.getItem('code');
    const response = await axios.get(
      // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
      // `${process.env.REACT_APP_BASE_URL}/v1/client/members/waiting?code=AAAAAA`,
      `${process.env.REACT_APP_BASE_URL}/v1/client/members?code=${code}`,
      // `${process.env.REACT_APP_JSON_SERVER}/user-status/?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
      // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
    );
    // console.log(response);
    return response.data.data;
  });
=======
  useEffect(() => {
    return () => {
      setCheckboxStatus({});
      setTableDeleteList([]);
    };
  }, []);
>>>>>>> feature/jaesin1

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
<<<<<<< HEAD
  console.log(dataList);
  if (status === 'success')
    return (
      <Container>
        {!!dataList && dataList.length !== 0 && (
          <Table
            useCheckbox={false}
            fieldsInput={userStatusFields}
            dataInput={dataList}
          />
        )}
      </Container>
    );
=======

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
>>>>>>> feature/jaesin1
};

export default UserStatus;

const Container = styled.div``;
