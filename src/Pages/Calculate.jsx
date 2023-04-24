import {Link} from 'react-router-dom';
import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import ExcelIcon from '../assets/icon/excel.svg';
import PDFIcon from '../assets/icon/pdfIcon.svg';
import {useSpotsAdjustList} from 'hooks/useAdjustment';

const Calculate = () => {
  // const {data: spotsAdjustList} = useSpotsAdjustList();
  return (
    <Container>
      <Title>정산 페이지</Title>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">년도</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">월</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">스팟(고객사)</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">엑셀</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">PDF</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {/* {spotsAdjustList?.data?.map(v => {
            return (
              <Table.Row key={v.id}>
                <Table.Cell textAlign="center">{v.year}</Table.Cell>
                <Table.Cell textAlign="center">{v.month}</Table.Cell>
                <Table.Cell textAlign="center">{v.corporationName}</Table.Cell>
                <Table.Cell textAlign="center">{v.paycheckStatus}</Table.Cell>
                <Table.Cell textAlign="center">
                  {v.excelFile ? (
                    <Link to={v.excelFile}>
                      <InputImage alt="ExcelIcon" src={ExcelIcon} />
                    </Link>
                  ) : (
                    '-'
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {v.pdfFile ? (
                    <Link to={v.pdfFile}>
                      <InputImage alt="PDFIcon" src={PDFIcon} />
                    </Link>
                  ) : (
                    '-'
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })} */}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default Calculate;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const InputImage = styled.img`
  width: 40px;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 20px;
  margin-top: 24px;
`;
