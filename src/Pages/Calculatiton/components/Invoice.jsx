import {Button, Header, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {useState} from 'react';
import logo from '../../../assets/image/logo.png';
import InvoiceTable from './InvoiceTable';
import DefaultTable from './DefaultTable';
import {useCompleteAdjust, useMemoAdjust} from 'hooks/useAdjustment';
import {adjustReverseStatusFomatted} from 'utils/statusFormatter';

const Invoice = ({groupName, id, data}) => {
  const [text, setText] = useState('');
  const {mutateAsync: complete} = useCompleteAdjust();
  const {mutateAsync: addMemo} = useMemoAdjust();

  const completeButton = async () => {
    // 4: 거래명세서 확정
    const data = {
      id: id,
    };
    await complete(data);
  };

  const status = adjustReverseStatusFomatted(
    data?.corporationResponse?.paycheckStatus,
  );

  const memoButton = async () => {
    const data = {
      id: id,
      memo: text.trim(),
    };

    if (data.memo.trim() !== '') {
      await addMemo(data);
      setText('');
    }
  };

  return (
    <div>
      <ButtonWrap>
        <Button
          content="정산 완료"
          color="blue"
          onClick={() => {
            completeButton();
          }}
          disabled={status === 2 || status === 4}
        />
      </ButtonWrap>
      <Wrap>
        <Header as="h2" style={{marginBottom: 48}}>
          거래명세서
        </Header>
        <div
          style={{
            justifyContent: 'space-between',
            display: 'flex',
          }}>
          <Box>
            <Title>수신</Title>
            <TitleContent>{groupName}</TitleContent>
          </Box>

          <Box>
            <div>{data?.transactionInfoDefault?.yearMonth}</div>
          </Box>
        </div>
        <Border style={{marginBottom: 32}} />
        <Title>공급자</Title>

        <DefaultTable data={data?.transactionInfoDefault} />
        <InvoiceTable data={data} />
        <ImageWrap>
          <Statement>
            <Title>위와 같이 명세서 제출합니다.</Title>
          </Statement>
          <Image src={logo} alt="" />
        </ImageWrap>
      </Wrap>
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
                메모
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell
                width={4}
                textAlign="center"
                style={{
                  paddingTop: 6,
                  paddingBottom: 6,
                }}>
                등록날짜
              </Table.HeaderCell>
              <Table.HeaderCell
                width={4}
                textAlign="center"
                style={{
                  paddingTop: 6,
                  paddingBottom: 6,
                }}>
                작성자
              </Table.HeaderCell>
              <Table.HeaderCell
                textAlign="center"
                style={{
                  paddingTop: 6,
                  paddingBottom: 6,
                }}>
                내용
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.memoResDtos?.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center">
                  메모 없음
                </Table.Cell>
              </Table.Row>
            ) : (
              data?.memoResDtos?.map((el, idx) => {
                return (
                  <Table.Row key={idx}>
                    <Table.Cell textAlign="center">
                      {el.createdDateTime}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el.writer}</Table.Cell>
                    <Table.Cell>{el.memo}</Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table>
      </Wrap>
      <Wrap>
        <Title style={{marginTop: 24}}> 메모</Title>

        <MemoWrap value={text} onChange={e => setText(e.target.value)} />
        <MemoButtonWrap>
          <Button content="메모작성" color="green" onClick={memoButton} />
        </MemoButtonWrap>
      </Wrap>
    </div>
  );
};

export default Invoice;

const Wrap = styled.div`
  width: 70%;
`;

const Box = styled.div`
  display: flex;
  padding-bottom: 12px;
`;

const Image = styled.img`
  width: 140px;
`;
const ImageWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const TitleContent = styled.div`
  color: ${({theme}) => theme.colors.grey[4]};
`;
const Title = styled.div`
  font-weight: 600;
  margin-right: 24px;
`;
const Border = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[7]};
  margin: 24px 0px;
`;

const Statement = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
`;

const TotalPriceWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TotalWrap = styled.div``;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;

const MemoWrap = styled.input`
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  min-height: 100px;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  width: 100%;
  outline: none;
`;

const MemoButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
