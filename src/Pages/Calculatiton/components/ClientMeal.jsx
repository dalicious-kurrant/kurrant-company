import {useGetMealList} from 'hooks/useAdjustment';
import {Label, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import withCommas from 'utils/withCommas';
import ScrollToTop from '../../../assets/image/scrollTop.png';

const ClientMeal = ({id}) => {
  const {data: meal} = useGetMealList(id);
  const information = meal?.data?.corporationInfo;
  const mealInfo = meal?.data?.corporationOrderItems;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Wrap>
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
              식수 개요
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <TableCell textAlign="center">고객사 이름</TableCell>
            <Table.Cell textAlign="center">{information?.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">기간</TableCell>
            <Table.Cell textAlign="center">{information?.period}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">아침 총 식수</TableCell>
            <Table.Cell textAlign="center">
              {withCommas(
                information?.morningCount === 0
                  ? '-'
                  : information?.morningCount,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">점심 총 식수</TableCell>
            <Table.Cell textAlign="center">
              {withCommas(
                information?.lunchCount === 0 ? '-' : information?.lunchCount,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">저녁 총 식수</TableCell>
            <Table.Cell textAlign="center">
              {withCommas(
                information?.dinnerCount === 0 ? '-' : information?.dinnerCount,
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">총액(VAT 포함)</TableCell>
            <Table.Cell textAlign="center">
              {withCommas(information?.totalPrice)}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              colSpan={8}
              style={{
                backgroundColor: '#bdbac1',
                paddingTop: 6,
                paddingBottom: 6,
              }}>
              식수 내역
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign="center">
              <InnerCell>날짜</InnerCell>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <InnerCell>식사타입</InnerCell>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <InnerCell>메이커스</InnerCell>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <InnerCell>상품</InnerCell>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <InnerCell>사용 지원금</InnerCell>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <InnerCell>개수</InnerCell>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <InnerCell>구매자</InnerCell>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <InnerCell>이메일</InnerCell>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {mealInfo?.map((el, idx) => {
            return (
              <Table.Row key={idx}>
                <Table.Cell textAlign="center">
                  <InnerCell>{el.serviceDate}</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>{el.diningType}</InnerCell>
                </Table.Cell>
                <Table.Cell>
                  <InnerCell>{el.makers}</InnerCell>
                </Table.Cell>
                <Table.Cell>
                  <InnerCell>{el.food}</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>{withCommas(el.supportPrice)}</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>{withCommas(el.count)}</InnerCell>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <InnerCell>{el.user}</InnerCell>
                </Table.Cell>
                <Table.Cell>
                  <InnerCell>{el.email}</InnerCell>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <ScrollButton onClick={scrollToTop} style={{cursor: 'pointer'}}>
        <Image src={ScrollToTop} alt="" />
      </ScrollButton>
    </Wrap>
  );
};

export default ClientMeal;

const TableCell = styled(Table.Cell)`
  background-color: ${({theme}) => theme.colors.grey[8]};
`;

const Wrap = styled.div`
  margin-top: 24px;
  width: 70%;
`;

const InnerCell = styled.div`
  white-space: nowrap;
`;

const ScrollButton = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
`;

const Image = styled.img`
  width: 50px;
`;
