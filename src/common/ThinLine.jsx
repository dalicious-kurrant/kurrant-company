import React from 'react';
import styled from 'styled-components';

const ThinLine = ({}) => {
  return <Line />;
};
export default ThinLine;

const Line = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.Grey05};
  margin-bottom: 3rem;
`;
