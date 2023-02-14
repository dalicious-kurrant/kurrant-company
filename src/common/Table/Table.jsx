import {useEffect} from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import {handleFalsyValue} from 'utils/logics';

// 이 Table 컴포넌트는 다르다???

// - 데이터 안에 정해진 필드가 아닌 필드가 들어있으면 자동으로 걸러준다
// - 데이터 값이 number나 string이 아닌 경우는 '-'로 표기한다

const Table = ({tableFieldsInput, tableDataInput}) => {
  const [tableFieldsStatus, setTableFieldStatus] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // 배열 아닐경우 아웃!
    if (!Array.isArray(tableFieldsInput)) return;
    // 배열이 비여있을 경우 아웃
    if (tableFieldsInput.length === 0) return;
    // 걸러내기
  }, [tableDataInput, tableFieldsInput]);

  return (
    <Container>
      <table border={1}>
        <thead>
          <tr>
            {tableFieldsInput &&
              tableFieldsInput.map((val, index) => <th key={index}>{val}</th>)}
          </tr>
        </thead>
        <tbody>
          {tableDataInput &&
            tableDataInput.map((value1, index1) => {
              // 필드에 없는 값들은 걸러내기
              let yo = [];

              tableFieldsInput.forEach((value2, index2) => {
                if (Object.keys(value1).includes(value2)) {
                  yo.push(value1[value2]);
                }
              });

              return (
                <tr key={index1}>
                  {yo.map((value3, index3) => (
                    <td key={index3}>{handleFalsyValue(value3)}</td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>
    </Container>
  );
};

export default Table;

const Container = styled.div``;
