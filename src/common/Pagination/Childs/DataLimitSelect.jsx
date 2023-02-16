import styled from 'styled-components';

const DataLimitSelect = ({currentValue, setDataLimit, options}) => {
  const handleChange = e => {
    const value = e.target.value;
    // console.log(value);
    setDataLimit(value);
  };
  console.log(currentValue);
  return (
    <Form>
      {/* <Label>데이터 수</Label> */}

      <Select onChange={handleChange} value={currentValue}>
        {options.map((val, index) => {
          return (
            <Option key={index} value={val}>
              {val}
            </Option>
          );
        })}
      </Select>
      <Label>개 씩 보이게 하기 </Label>
    </Form>
  );
};

export default DataLimitSelect;

const Form = styled.form``;
const Label = styled.label``;
const Select = styled.select``;
const Option = styled.option``;
const PlaceholderOption = styled(Option)`
  color: ${props => props.theme.colors.Gray05};
`;
