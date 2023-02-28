import {Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import {useGetCorporationInfo} from 'hooks/useCorporation';
import {formattedDate} from 'utils/dateFormatter';

const CompanyInfo = () => {
  const {data: corpList} = useGetCorporationInfo();
  const list = corpList?.data;
  console.log(list);
  const diningType = list?.diningTypes?.map(el => {
    const type = el === 1 ? '아침' : el === 2 ? '점심' : '저녁';
    return type;
  });

  return (
    // <PageWrapper>
    <div>
      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">그룹ID</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">기업코드</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">이름</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">우편번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">기본주소</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상세주소</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">위치</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">식사 타입</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">식사 요일</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">담당자</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                담당자 전화번호
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                기업멤버십 지원여부
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">사원수</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                식사 세팅 지원 서비스
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                쓰레기 수거 서비스 사용
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                온장고 대여 서비스 사용
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{list?.id}</Table.Cell>
              <Table.Cell textAlign="center">{list?.code}</Table.Cell>
              <Table.Cell textAlign="center">{list?.name}</Table.Cell>
              <Table.Cell>{list?.zipCode}</Table.Cell>
              <Table.Cell>{list?.address1}</Table.Cell>
              <Table.Cell>{list?.address2}</Table.Cell>
              <Table.Cell>{list?.location}</Table.Cell>
              <Table.Cell>{diningType?.join(',')}</Table.Cell>
              <Table.Cell>{list?.serviceDays}</Table.Cell>
              <Table.Cell textAlign="center">{list?.managerName}</Table.Cell>
              <Table.Cell>{list?.managerPhone}</Table.Cell>
              <Table.Cell textAlign="center">
                {list?.isMembershipSupport ? '지원' : '미지원'}
              </Table.Cell>
              <Table.Cell textAlign="center">{list?.employeeCount}</Table.Cell>
              <Table.Cell textAlign="center">
                {list?.isSetting ? '사용' : '미사용'}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {list?.isGarbage ? '사용' : '미사용'}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {list?.isHotStorage ? '사용' : '미사용'}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableWrapper>
    </div>
    // </PageWrapper>
  );
};

export default CompanyInfo;
