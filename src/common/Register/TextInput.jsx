import {CompanyMembershipFields} from 'components/Contents/CompanyMembership/CompanyMembershipData';
import styled from 'styled-components';

const TextInput = ({
  input,
  name,
  setInput,
  placeholder,
  width = '100%',
  flex = undefined,
  maxCharLength = 36,
}) => {
  const handleChange = e => {
    e.preventDefault();
    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };

  return (
    <>
      <Container>
        <TitleWrap>
          <Title>{CompanyMembershipFields[name]}</Title>
        </TitleWrap>

        <TextInputInput
          type="text"
          maxLength={maxCharLength}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          width={width}
          flex={flex}
          value={input[name]}
        />
      </Container>
    </>
  );
};

export default TextInput;

const Container = styled.div`
  ${({flex}) => {
    if (flex) {
      return `flex:${flex};`;
    }
  }}
`;

const TitleWrap = styled.div`
  background-color: #ffffff;
  padding: 0 1rem;
  height: 3rem;
  font-size: 1.8rem;
  /* text-align: center; */
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
  border: 1px solid ${props => props.theme.colors.Grey07};
`;
const Title = styled.span`
  display: inline-block;
`;

const TextInputInput = styled.input`
  border: 1px solid ${props => props.theme.colors.Grey07};
  ${({width}) => {
    if (width) {
      return `width:${width};`;
    }
  }}

  height: 5.8rem;

  &::placeholder {
    color: ${props => props.theme.colors.Grey05};
  }
  /* color: ${props => props.theme.Black}; */

  /* border: none; */
  padding: 0 1rem;
  height: 3rem;
  font-size: 1.8rem;

  &:focus {
    outline: none;
  }
`;