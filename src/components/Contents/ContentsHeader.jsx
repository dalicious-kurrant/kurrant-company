import axios from 'axios';
import Register from 'common/Register/Register';
import {TableCheckboxStatusAtom} from 'common/Table/store';
import {useAtom} from 'jotai';
import {getCompanyMembershipDataListAtom} from 'jotai/state';

import {useEffect} from 'react';
import {useState} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import {useLocation} from 'react-router-dom';

import styled from 'styled-components';
import CRUDBundle from './ContentsHeader/CRUDBundle';
import {ContentsRouterData} from '../../data/ContentsRouterData';
import {CRUDAvaliableList} from 'data/CRUDAvaliableList';
import useCompanyMembershipQuery from 'hooks/ReactQueryHooks/useCompanyMembershipQuery';
import {CompanyMembershipRegisterFields} from './CompanyMembership/CompanyMembershipData';

const ContentsHeader = () => {
  const {pathname} = useLocation();
  const [content, setContent] = useState({name: '', shortIntroduction: ''});
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState(undefined);
  const [companyMembershipDataList] = useAtom(getCompanyMembershipDataListAtom);
  const [registerStatus, setRegisterStatus] = useState('register');

  // useQuery를 굳이 안쓰는 경우에는 useCompanyMembershipQuery자리의 page, dataLimit값을 0으로 해주세요

  const {submitMutate, editMutate, deleteMutate} = useCompanyMembershipQuery(
    0,
    0,
    ['getCompanyMembershipLength', 'getCompanyMembership'],
  );

  useEffect(() => {
    ContentsRouterData.forEach(value => {
      if (pathname === `/main`) {
        setContent({
          name: '대시보드',
          shortIntroduction: '대시보드입니다',
        });
      }

      if (pathname === `/main/${value.id}`) {
        setContent({
          name: value.name,
          shortIntroduction: value.shortIntroduction,
        });
        return;
      }
    });
  }, [pathname]);

  // 수정

  const handleBundleClick = status => {
    let numberOfTrues = 0;

    const yo = {...checkboxStatus};
    delete yo.parent;

    Object.values(yo).forEach(value => {
      if (value === true) {
        numberOfTrues = numberOfTrues + 1;
      }
    });

    if (status === 'register') {
      setRegisterStatus(status);
      setShowRegister(true);
    } else if (status === 'edit') {
      if (numberOfTrues === 0) {
        window.confirm(
          "아래의 기업 가입 리스트중에 체크박스를 눌러 수정할 기업을 '하나만' 선택해주세요.",
        );
      } else if (numberOfTrues !== 1) {
        window.confirm("체크박스가 '하나만' 선택되어 있는지 확인해주세요 ");
      } else if (numberOfTrues === 1) {
        let checkedId = undefined;
        Object.entries(yo).forEach(value => {
          if (value[1] === true) {
            checkedId = value[0];
          }
        });

        companyMembershipDataList.forEach(value => {
          if (value.id === parseInt(checkedId)) {
            setDataToEdit(value);
          }
        });

        setRegisterStatus(status);
        setShowRegister(true);
      }
    } else if (status === 'delete') {
      if (numberOfTrues === 0) {
        window.confirm(
          "아래의 기업 가입 리스트중에 체크박스를 눌러 수정할 기업을 '하나만' 선택해주세요.",
        );
      }

      const idsToDelete = [];

      Object.keys(yo).forEach(value => {
        if (yo[value]) {
          idsToDelete.push(value);
        }
      });

      idsToDelete.forEach(async value => {
        await new Promise((resolve, reject) => {
          try {
            resolve(deleteMutate(value));
          } catch (err) {
            reject('안된 듯');
          }
        });
      });
    }
  };

  const handleClose = () => {
    setShowRegister(false);
  };

  return (
    <Container>
      <TitleH1>{content.name}</TitleH1>
      <ExplanationSpan>{content.shortIntroduction}</ExplanationSpan>

      {CRUDAvaliableList.map(value => {
        return `/main/${value}`;
      }).includes(pathname) && (
        <CRUDBundle
          handleBundleClick={handleBundleClick}
          showRegister={showRegister}
        />
      )}

      {showRegister && (
        <Register
          status={registerStatus}
          submitMutate={submitMutate}
          editMutate={editMutate}
          handleClose={handleClose}
          dataToEdit={dataToEdit}
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
