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
import CRUDBundle from './ContentsHeader/CRUDButtonBundle';
import {ContentsRouterData} from '../../data/ContentsRouterData';

const ContentsHeader = () => {
  const {pathname} = useLocation();
  const queryClient = useQueryClient();
  const [content, setContent] = useState({name: '', shortIntroduction: ''});
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    ContentsRouterData.forEach(value => {
      console.log(pathname);

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

  const {mutate: submitMutate} = useMutation(
    async newTodo => {
      const response = await axios.post(
        `${process.env.REACT_APP_JSON_SERVER}/company-membership`,
        newTodo,
      );
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getCompanyMembership']);
        queryClient.invalidateQueries(['getCompanyMembershipLength']);
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  const {mutate: editMutate} = useMutation(
    async todo => {
      const response = await axios.put(
        // `${process.env.REACT_APP_SERVER_URL}/todos/${todo.id}`,
        `${process.env.REACT_APP_JSON_SERVER}/company-membership/${todo.id}`,
        todo,
      );
      return response;
    },
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries('getCompanyMembership');
      },
      onError: () => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
      },
    },
  );

  // getCompanyMembership

  // const dataFromTheSky = queryClient.getQueryData([
  //   'getCompanyMembership',
  //   1,
  //   4,
  // ]);

  // console.log(useQueryClient().getQueryData('getCompanyMembership'));
  // console.log(useQueryClient().getQueryData(['getCompanyMembership']));
  const [companyMembershipDataList, setCompanyMembershipDataList] = useAtom(
    getCompanyMembershipDataListAtom,
  );

  // useEffect(() => {
  //   console.log(companyMembershipDataList);
  // }, [companyMembershipDataList]);

  // console.log(queryClient);

  // console.log(dataFromTheSky);

  const [registerStatus, setRegisterStatus] = useState('register');

  // 수정

  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState(undefined);
  // useEffect(() => {
  //   console.log(checkboxStatus);
  // }, [checkboxStatus]);

  const handleBundleClick = id => {
    if (id === 'register') {
      setRegisterStatus(id);
      setShowRegister(true);
    } else if (id === 'edit') {
      let numberOfTrues = 0;
      let dataEditTargetId;

      const yo = {...checkboxStatus};
      delete yo.parent;

      Object.values(yo).forEach(value => {
        if (value === true) {
          numberOfTrues = numberOfTrues + 1;
        }
      });

      // console.log(yo);
      // console.log(numberOfTrues);

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

        setRegisterStatus(id);
        setShowRegister(true);
      }
    } else if (id === 'delete') {
    }
  };

  const handleClose = () => {
    setShowRegister(false);
  };

  return (
    <Container>
      <TitleH1>{content.name}</TitleH1>
      <ExplanationSpan>{content.shortIntroduction}</ExplanationSpan>

      <CRUDBundle handleBundleClick={handleBundleClick} />

      {showRegister && (
        <Register
          status={registerStatus}
          submitMutate={submitMutate}
          editMutate={editMutate}
          handleClose={handleClose}
          dataToEdit={dataToEdit}
        />
      )}
    </Container>
  );
};

export default ContentsHeader;

const Container = styled.div`
  width: 100%;
  height: 24rem;
  border-bottom: 1px solid ${props => props.theme.colors.Grey05};

  display: flex;
  flex-direction: column;
  margin-bottom: 2.4rem;
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

const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
`;

const FakeCalendarBox = styled.div`
  width: 20rem;
  height: 6rem;
  border-radius: 0.6rem;
  border: 2px solid ${props => props.theme.colors.Purple};
`;
const ThisMonthBtn = styled.button``;
