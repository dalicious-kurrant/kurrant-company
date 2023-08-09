import {Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import {
  useGetCorporationInfo,
  useManagerNameSetting,
  useManagerPhoneSetting,
} from 'hooks/useCorporation';
import {formattedDate} from 'utils/dateFormatter';
import withCommas from 'utils/withCommas';
import {phoneNumberFormmatter} from 'utils/phoneNumberFormatter';
import styled from 'styled-components';
import {ReactComponent as ModifyIcon} from '../../../assets/icon/modify.svg';
import {FormProvider, useForm} from 'react-hook-form';
import Input from 'components/input/Input';
import {useState} from 'react';
import {useEffect} from 'react';

const CompanyInfo = () => {
  const {data: corpList} = useGetCorporationInfo();
  const [nameValue, setNameValue] = useState(false);
  const [phoneValue, setPhoneValue] = useState(false);
  const {mutateAsync: nameSetting} = useManagerNameSetting();
  const {mutateAsync: phoneSetting} = useManagerPhoneSetting();

  const list = corpList?.data;

  const form = useForm({
    mode: 'all',
  });
  const {watch, setValue, control} = form;

  const name = watch('name');
  const phone = watch('phone');

  const diningType = list?.diningTypes?.map(el => {
    const type = el === 1 ? '아침' : el === 2 ? '점심' : '저녁';
    return type;
  });

  const nameChange = async () => {
    await nameSetting({value: name});
    setNameValue(false);
  };

  const phoneChange = async () => {
    await phoneSetting({value: phone});
    setPhoneValue(false);
  };

  useEffect(() => {
    if (nameValue) {
      setValue('name', list?.managerName);
    }
    if (phoneValue) {
      setValue('phone', list?.managerPhone);
    }
  }, [list?.managerName, list?.managerPhone, nameValue, phoneValue, setValue]);

  return (
    // <PageWrapper>
    <div>
      <h1>고객사 정보</h1>
      <FormProvider {...form}>
        <TableWrapper>
          <Table celled>
            <Table.Body>
              <Table.Row>
                <TableCell width={3}>그룹ID</TableCell>
                <Table.Cell>{list?.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>기업코드</TableCell>
                <Table.Cell>{list?.code}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>이름</TableCell>
                <Table.Cell>{list?.name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>우편번호</TableCell>
                <Table.Cell>{list?.zipCode}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>기본주소</TableCell>
                <Table.Cell>{list?.address1}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>상세주소</TableCell>
                <Table.Cell>{list?.address2}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>위치</TableCell>
                <Table.Cell>{list?.location}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>식사 타입</TableCell>
                <Table.Cell>{diningType?.join(',')}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>식사 요일</TableCell>
                <Table.Cell>{list?.serviceDays}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>담당자 ID</TableCell>
                <Table.Cell>{list?.managerId}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>담당자</TableCell>
                <Table.Cell style={{padding: 0, paddingLeft: 11}}>
                  <ModifyWrap>
                    {!nameValue && (list?.managerName || '-')}
                    {!nameValue && (
                      <IconWrap onClick={() => setNameValue(true)}>
                        <ModifyIcon />
                      </IconWrap>
                    )}
                  </ModifyWrap>
                  {nameValue && (
                    <ModifyWrap>
                      <Input name="name" style={{margin: 0}} />
                      <Button onClick={nameChange}>저장</Button>
                    </ModifyWrap>
                  )}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>담당자 전화번호</TableCell>
                <Table.Cell style={{padding: 0, paddingLeft: 11}}>
                  <ModifyWrap>
                    {!phoneValue &&
                      (phoneNumberFormmatter(list?.managerPhone) || '-')}
                    {!phoneValue && (
                      <IconWrap onClick={() => setPhoneValue(true)}>
                        <ModifyIcon />
                      </IconWrap>
                    )}
                  </ModifyWrap>
                  {phoneValue && (
                    <ModifyWrap>
                      <Input name="phone" width="150px" style={{margin: 0}} />
                      <Button onClick={phoneChange}>저장</Button>
                    </ModifyWrap>
                  )}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>기업멤버십 지원여부</TableCell>
                <Table.Cell>
                  {list?.isMembershipSupport ? '지원' : '미지원'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>아침 지원금</TableCell>
                <Table.Cell>
                  {withCommas(list?.morningSupportPrice) || '-'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>점심 지원금</TableCell>
                <Table.Cell>
                  {withCommas(list?.lunchSupportPrice) || '-'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>저녁 지원금</TableCell>
                <Table.Cell>
                  {withCommas(list?.dinnerSupportPrice) || '-'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>사원수</TableCell>
                <Table.Cell>{list?.employeeCount}명</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>식사 세팅 지원 서비스</TableCell>
                <Table.Cell>{list?.isSetting ? '사용' : '미사용'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>쓰레기 수거 서비스 사용</TableCell>
                <Table.Cell>{list?.isGarbage ? '사용' : '미사용'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <TableCell>온장고 대여 서비스 사용</TableCell>
                <Table.Cell>
                  {list?.isHotStorage ? '사용' : '미사용'}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </TableWrapper>
      </FormProvider>
    </div>
    // </PageWrapper>
  );
};

export default CompanyInfo;

const TableCell = styled(Table.Cell)`
  background-color: #f5f5f5;
`;

const ModifyWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  background-color: #5a1eff;
  border-radius: 4px;
  padding: 0px 4px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 20px;
  color: white;
  font-weight: 600;
`;

const IconWrap = styled.div`
  cursor: pointer;
  margin-left: 8px;
  display: flex;
  align-items: flex-end;
`;
