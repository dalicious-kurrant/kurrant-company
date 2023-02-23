import {useState} from 'react';
import styled from 'styled-components';
import NavbarContents from './NavbarContents';

import {ContentsRouterData} from '../../../data/ContentsRouterData';
import {useAtom} from 'jotai';
import {contentSelectedAtom} from 'jotai/state';
import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';

const Navbar = () => {
  return (
    <Container>
      {ContentsRouterData.map((value, index) => {
        return (
          <NavbarContents
            key={index}
            id={value.id}
            name={value.name}
            iconSrc={value.iconSrc}
            // selected={value.selected}
            routeName={value.routeName}
            // handleSelected={handleSelected}
          />
        );
      })}
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  width: 100%;
  height: 38rem;
  padding: 2.4rem 0;
`;
