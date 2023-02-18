import {useState} from 'react';
import styled from 'styled-components';
import NavbarContents from './NavbarContents';

import {ContentsRouterData} from '../../../data/ContentsRouterData';
import {useAtom} from 'jotai';
import {contentSelectedAtom} from 'jotai/state';

const Navbar = () => {
  const [selected, setSelected] = useAtom(contentSelectedAtom);

  const handleSelected = id => {
    const array1 = [...selected];
    const newArray1 = array1.map((val, index) => {
      if (val.id === id) {
        let yo = {...val};
        yo[`selected`] = true;
        return yo;
      } else {
        let yo2 = {...val};
        yo2[`selected`] = false;
        return yo2;
      }
    });

    setSelected(newArray1);
  };

  return (
    <Container>
      {selected &&
        selected.map((value, index) => {
          return (
            <NavbarContents
              key={index}
              id={value.id}
              name={value.name}
              iconSrc={value.iconSrc}
              selected={value.selected}
              routeName={value.routeName}
              handleSelected={handleSelected}
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
