import axios from 'axios';
import Register from 'common/Register/Register';
import {useAtom} from 'jotai';
import {contentSelectedAtom} from 'jotai/state';
import {useEffect} from 'react';
import {useState} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import {useLocation} from 'react-router-dom';

import styled from 'styled-components';
import CRUDBundle from './ContentsHeader/CRUDBundle';
import {ContentsRouterData} from './ContentsRouterData';

const ContentsHeader = () => {
  const [content, setContent] = useState({name: '', shortIntroduction: ''});

  const {pathname} = useLocation();
  const queryClient = useQueryClient();
  const {mutate: submitMutate} = useMutation(
    async newTodo => {
      console.log(newTodo);
      const response = await axios.post(
        `${process.env.REACT_APP_JSON_SERVER}/company-membership`,
        newTodo,
      );
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getCompanyMembership');
        queryClient.invalidateQueries('getCompanyMembershipLength');
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  useEffect(() => {
    ContentsRouterData.forEach(value => {
      if (pathname === `/main/${value.id}`) {
        setContent({
          name: value.name,
          shortIntroduction: value.shortIntroduction,
        });
        return;
      }
    });
  }, [pathname]);

  const [showRegister, setShowRegister] = useState(false);

  const handleBundleClick = id => {
    if (id === 'register') {
      setShowRegister(true);
    } else if (id === 'edit') {
      setShowRegister(true);
    } else if (id === 'delete') {
    }
  };

  return (
    <Container>
      <TitleH1>{content.name}</TitleH1>
      <ExplanationSpan>{content.shortIntroduction}</ExplanationSpan>
      <CRUDBundle handleBundleClick={handleBundleClick} />

      {showRegister && <Register submitMutate={submitMutate} />}
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
