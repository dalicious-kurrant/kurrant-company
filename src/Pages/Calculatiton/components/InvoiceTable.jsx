import {Table} from 'semantic-ui-react';
import styled from 'styled-components';
import withCommas from 'utils/withCommas';

const InvoiceTable = ({data}) => {
  return (
    <div>
      {data?.prepaidPaycheck !== null && (
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
          <Table.Body>
            {data?.prepaidPaycheck?.map((el, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell textAlign="center">
                    {data?.corporationResponse?.month}월
                  </Table.Cell>
                  <Table.Cell textAlign="center">{el.category}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {withCommas(el.price)}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {withCommas(el.count)}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{el.days}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {withCommas(el.totalPrice)}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
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
        <Table.Body>
          {data?.paycheck?.map((el, idx) => {
            return (
              <Table.Row key={idx}>
                <Table.Cell textAlign="center">
                  {data?.corporationResponse?.month}월
                </Table.Cell>
                <Table.Cell textAlign="center">{el.category}</Table.Cell>
                <Table.Cell textAlign="center">
                  {withCommas(el.price)}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {withCommas(el.count)}
                </Table.Cell>
                <Table.Cell textAlign="center">{el.days}</Table.Cell>
                <Table.Cell textAlign="center">
                  {withCommas(el.totalPrice)}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
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
        <Table.Body>
          {data?.paycheckAdds?.length === 0 ? (
            <Table.Row>
              <Table.Cell textAlign="center" colSpan={3}>
                추가 이슈 없음
              </Table.Cell>
            </Table.Row>
          ) : (
            data?.paycheckAdds?.map((el, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell textAlign="center">{el.issueDate}</Table.Cell>
                  <Table.Cell textAlign="center">{el.memo}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {withCommas(el.price)}
                  </Table.Cell>
                </Table.Row>
              );
            })
          )}
        </Table.Body>
      </Table>
      <TotalPriceWrap>
        <div>
          <Box>
            <Title>선금 총액</Title>
            <div>{withCommas(data?.prepaidTotalPrice)}</div>
          </Box>
          <Box>
            <Title>실비 총액</Title>
            <div>{withCommas(data?.totalPrice)}</div>
          </Box>
          <Border />
          <TotalPrice>
            <Title>총액(VAT포함)</Title>
            <Title style={{marginRight: 0}}>
              {withCommas(data?.vatTotalPrice)}
            </Title>
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
  justify-content: space-between;
  margin-top: 4px;
  margin-bottom: 12px;
`;
