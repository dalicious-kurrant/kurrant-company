import {Table} from 'semantic-ui-react';
import styled from 'styled-components';

const InvoiceTable = () => {
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              colSpan={6}
              style={{
                backgroundColor: '#bdbac1',
                paddingTop: 6,
                paddingBottom: 6,
              }}>
              선금
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign="center">일자</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">항목</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">금액</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">일수</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              금액(VAT별도)
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              colSpan={6}
              style={{
                backgroundColor: '#bdbac1',
                paddingTop: 6,
                paddingBottom: 6,
              }}>
              실비
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign="center">일자</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">항목</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">금액</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">일수</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              금액(VAT별도)
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              colSpan={6}
              style={{
                backgroundColor: '#bdbac1',
                paddingTop: 6,
                paddingBottom: 6,
              }}>
              추가이슈
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">사유</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={5}>
              금액(VAT별도)
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
      <TotalPriceWrap>
        <div>
          <Box>
            <Title>선금 총액</Title>
            <div>44544</div>
          </Box>
          <Box>
            <Title>실비 총액</Title>
            <div>3333</div>
          </Box>
          <Border />
          <TotalPrice>
            <Title style={{marginRight: 0}}>33333</Title>
          </TotalPrice>
        </div>
      </TotalPriceWrap>
    </div>
  );
};

export default InvoiceTable;
const Box = styled.div`
  display: flex;
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: 600;
  margin-right: 24px;
`;

const TotalPriceWrap = styled.div`
  justify-content: flex-end;
  display: flex;
`;

const Border = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[7]};
  width: 200px;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
  margin-bottom: 12px;
`;
