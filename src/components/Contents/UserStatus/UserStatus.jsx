import styled from 'styled-components';
import {useDeleteMember, useGetMemberList} from 'hooks/useMember';
import {Button, Table} from 'semantic-ui-react';
import {useState} from 'react';

const UserStatus = () => {
  const {data: memberList} = useGetMemberList();
  const [checkItems, setCheckItems] = useState([]);
  const {mutateAsync: deleteMember} = useDeleteMember();

  const allChecked = checked => {
    if (checked) {
      const idArray = [];
      memberList?.data?.forEach(el => {
        idArray.push(el.id);
      });
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const singleChecked = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
    }
  };

  const deleteUser = async () => {
    if (checkItems.length !== 0) {
      await deleteMember({userIdList: checkItems});
      alert('삭제 완료했습니다.');
    }
  };

  return (
    <Container>
      <h1>멤버십/유저 현황</h1>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button content="삭제" color="red" onClick={deleteUser} />
      </div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center" width={1}>
              <input
                type="checkbox"
                onChange={e => allChecked(e.target.checked)}
              />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={2}>
              이름
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={3}>
              이메일
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={3}>
              연락처
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {memberList?.data.map((el, idx) => {
            return (
              <Table.Row key={el.id}>
                <Table.Cell textAlign="center">
                  <input
                    type="checkbox"
                    checked={checkItems.includes(el.id) ? true : false}
                    onChange={e => {
                      singleChecked(e.target.checked, el.id);
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign="center">{el.name}</Table.Cell>
                <Table.Cell>{el.email}</Table.Cell>
                <Table.Cell textAlign="center">{el.phone}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default UserStatus;

const Container = styled.div`
  width: 70%;
`;
