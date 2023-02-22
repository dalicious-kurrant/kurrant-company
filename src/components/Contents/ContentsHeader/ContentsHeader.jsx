import axios from 'axios';
import Register from 'common/Register/Register';
import {TableCheckboxStatusAtom} from 'common/Table/store';
import {useAtom} from 'jotai';
import {getCompanyMembershipDataAtom} from 'jotai/state';

import {useEffect} from 'react';
import {useState} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import {useLocation} from 'react-router-dom';

import styled from 'styled-components';
import CRUDBundle from '../../../common/Register/CRUDBundle';
import {ContentsRouterData} from '../../../data/ContentsRouterData';
import {CRUDAvaliableList} from 'data/CRUDAvaliableList';

import {CompanyMembershipRegisterFields} from '../CompanyMembership/CompanyMembershipData';
import useMutate from '../CompanyMembership/useMutate';
import {makeInitialInput} from 'common/Register/logics/RegisterLogics';
import {
  checkedValue,
  idsToDelete,
  isCRUDAvaliable,
  numberOfTrues,
} from './ContentsHeaderLogics';
import useSetTitleByPathname from './hooks/useSetTitle';

const ContentsHeader = () => {
  const {pathname} = useLocation();
  const [content, setContent] = useState({name: '', shortIntroduction: ''});
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});
  const [companyMembershipDataList] = useAtom(getCompanyMembershipDataAtom);
  const [registerStatus, setRegisterStatus] = useState('register');

  const {submitMutate, editMutate, deleteMutate} = useMutate();

  useSetTitleByPathname(setContent);

  // 수정

  const handleBundleClick = buttonStatus => {
    numberOfTrues({...checkboxStatus});

    if (buttonStatus === 'register') {
      setDataToEdit(makeInitialInput([...companyMembershipDataList][0]));
      setRegisterStatus(buttonStatus);
      setShowRegister(true);
    } else if (buttonStatus === 'edit') {
      if (numberOfTrues({...checkboxStatus}) === 0) {
        window.confirm(
          "아래의 기업 가입 리스트중에 체크박스를 눌러 수정할 기업을 '하나만' 선택해주세요.",
        );
      } else if (numberOfTrues({...checkboxStatus}) !== 1) {
        // console.log(numberOfTrues({...checkboxStatus}));

        window.confirm("체크박스가 '하나만' 선택되어 있는지 확인해주세요 ");
      } else if (numberOfTrues({...checkboxStatus}) === 1) {
        setDataToEdit(checkedValue(checkboxStatus, companyMembershipDataList));
        setRegisterStatus(buttonStatus);
        setShowRegister(true);
      }
    } else if (buttonStatus === 'delete') {
      if (numberOfTrues === 0) {
        window.confirm(
          "아래의 기업 가입 리스트중에 체크박스를 눌러 수정할 기업을 '하나만' 선택해주세요.",
        );
        return;
      }

      if (window.confirm('삭제하시겠습니까?')) {
        idsToDelete({...checkboxStatus}).forEach(value => {
          deleteMutate(value);
        });
      } else {
        return;
      }
    }
  };

  const handleClose = () => {
    setShowRegister(false);
  };

  return (
    <Container>
      <TitleH1>{content.name}</TitleH1>
      <ExplanationSpan>{content.shortIntroduction}</ExplanationSpan>

      {isCRUDAvaliable(pathname) && (
        <CRUDBundle
          handleBundleClick={handleBundleClick}
          showRegister={showRegister}
        />
      )}

      {showRegister && (
        <Register
          registerStatus={registerStatus}
          submitMutate={submitMutate}
          editMutate={editMutate}
          handleClose={handleClose}
          data={dataToEdit}
          fieldsInput={CompanyMembershipRegisterFields}
        />
      )}
    </Container>
  );
};

export default ContentsHeader;

const Container = styled.section`
  width: 100%;
  height: 24rem;

  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  position: relative;
`;

const TitleH1 = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const ExplanationSpan = styled.span`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.Grey07};
`;
