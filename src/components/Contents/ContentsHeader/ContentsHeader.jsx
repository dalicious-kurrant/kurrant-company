import Register from 'common/Register/Register';
import {TableCheckboxStatusAtom} from 'common/Table/store';
import {useAtom} from 'jotai';
import {getCompanyMembershipDataAtom} from 'jotai/state';

import {useState} from 'react';

import {useLocation} from 'react-router-dom';

import styled from 'styled-components';
import CRUDBundle from '../../../common/Register/CRUDBundle';

import {
  CompanyMembershipFields,
  CompanyMembershipFieldsData,
} from '../CompanyMembership/CompanyMembershipData';
import useMutate from '../../../common/Register/hooks/useMutate';
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

  useSetTitleByPathname(setContent);

  // const [showRegister, setShowRegister] = useState(false);
  // const [checkboxStatus] = useAtom(TableCheckboxStatusAtom);
  // const [dataToEdit, setDataToEdit] = useState({});
  // const [companyMembershipList] = useAtom(getCompanyMembershipDataAtom);
  // const [registerStatus, setRegisterStatus] = useState('register');

  // const {submitMutate, editMutate, deleteMutate} = useMutate();

  // // 수정

  // const handleBundleClick = buttonStatus => {
  //   numberOfTrues({...checkboxStatus});

  //   if (buttonStatus === 'register') {
  //     setDataToEdit(makeInitialInput(CompanyMembershipFields));
  //     setRegisterStatus(buttonStatus);
  //     setShowRegister(true);
  //   } else if (buttonStatus === 'edit') {
  //     if (numberOfTrues({...checkboxStatus}) === 0) {
  //       window.confirm(
  //         "아래의 기업 가입 리스트중에 체크박스를 눌러 수정할 기업을 '하나만' 선택해주세요.",
  //       );
  //     } else if (numberOfTrues({...checkboxStatus}) !== 1) {
  //       window.confirm("체크박스가 '하나만' 선택되어 있는지 확인해주세요 ");
  //     } else if (numberOfTrues({...checkboxStatus}) === 1) {
  //       setDataToEdit(checkedValue(checkboxStatus, companyMembershipList));
  //       setRegisterStatus(buttonStatus);
  //       setShowRegister(true);
  //     }
  //   } else if (buttonStatus === 'delete') {
  //     if (numberOfTrues === 0) {
  //       window.confirm(
  //         "아래의 기업 가입 리스트중에 체크박스를 눌러 수정할 기업을 '하나만' 선택해주세요.",
  //       );
  //       return;
  //     }

  //     if (window.confirm('삭제하시겠습니까?')) {
  //       idsToDelete({...checkboxStatus}).forEach(value => {
  //         deleteMutate(value);
  //       });
  //     } else {
  //       return;
  //     }
  //   }
  // };

  // const handleClose = () => {
  //   setShowRegister(false);
  // };

  return (
    <Container>
      <TitleH1>{content.name}</TitleH1>
      <ExplanationSpan>{content.shortIntroduction}</ExplanationSpan>
      {/* 
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
          fieldsToOpen={CompanyMembershipFields}
          fieldsData={CompanyMembershipFieldsData}
        />
      )} */}
    </Container>
  );
};

export default ContentsHeader;

const Container = styled.section`
  width: 100%;

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
