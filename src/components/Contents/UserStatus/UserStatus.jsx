import useMutate from 'common/CRUD/useMutate';
import {TableCheckboxStatusAtom, TableDeleteListAtom} from 'common/Table/store';
import {useAtom} from 'jotai';
import {useState} from 'react';
import {useEffect} from 'react';

import styled from 'styled-components';
import {clickButtonBundle} from '../Logics/Logics';
import {UserStatusDataAtom} from './store';
import {UserStatusFields} from './userStatusData';
import {handleUserStatusDelete} from './userStatusLogics';
import useUserStatusQuery from './useUserStatusQuery';

const UserStatus = () => {
  const [userStatusData, setUserStatusData] = useAtom(UserStatusDataAtom);
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});
  const [registerStatus, setRegisterStatus] = useState('register');

  const [tableDeleteList, setTableDeleteList] = useAtom(TableDeleteListAtom);

  const {deleteMutate, submitMutate, editMutate} =
    useMutate(UserStatusDataAtom);

  const token = localStorage.getItem('token');

  const {sendFinalMutate, deleteFinalMutate} = useUserStatusQuery(
    ['getUserStatusJSON'],
    UserStatusDataAtom,
    'users/all',
    token,
  );

  const handleBundleClick = buttonStatus => {
    clickButtonBundle(
      buttonStatus,
      UserStatusFields,
      userStatusData,
      checkboxStatus,
      setDataToEdit,
      setRegisterStatus,
      setShowRegister,
      deleteMutate,
    );
  };

  const handleClose = () => {
    setShowRegister(false);
  };

  useEffect(() => {
    return () => {
      setCheckboxStatus({});
      setTableDeleteList([]);
    };
  }, []);

  const handleDelete = () => {
    handleUserStatusDelete(
      checkboxStatus,
      tableDeleteList,
      userStatusData,
      setTableDeleteList,
      setUserStatusData,
    );
  };

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

  return <Container></Container>;
};

export default UserStatus;

const Container = styled.div``;
