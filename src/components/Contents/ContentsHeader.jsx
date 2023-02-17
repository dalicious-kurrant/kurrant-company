import {useAtom} from 'jotai';
import {contentSelectedAtom} from 'jotai/state';
import {useEffect} from 'react';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';

import styled from 'styled-components';

const ContentsHeader = () => {
  const [content, setContent] = useState({name: '', shortIntroduction: ''});

  const [selected] = useAtom(contentSelectedAtom);

  const {pathname} = useLocation();

  useEffect(() => {
    selected.forEach(value => {
      if (pathname === `/main/${value.id}`) {
        setContent({
          name: value.name,
          shortIntroduction: value.shortIntroduction,
        });
        return;
      }
    });
  }, [pathname]);

  return (
    <Container>
      <TitleH1>{content.name}</TitleH1>
      <ExplanationSpan>{content.shortIntroduction}</ExplanationSpan>
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
