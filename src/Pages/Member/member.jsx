import {useChangeMemo, useDeleteUser, useUserLoad} from 'hooks/useMember';
import {useState} from 'react';
import {Button, Table} from 'semantic-ui-react';
import styled from 'styled-components';

const Member = () => {
  const [page, setPage] = useState(1);
  const {data: userList, refetch} = useUserLoad(page);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [changeMemoList, setChangeMemoList] = useState([]);
  const {mutateAsync: deleteCheckedMember} = useDeleteUser();
  const {mutateAsync: changeMemoPost} = useChangeMemo();

  const changeMemo = (event, id) => {
    const updatedList = changeMemoList.map(item =>
      item.userId === id ? {...item, memo: event.target.value} : item,
    );

    const existingUserIndex = updatedList.findIndex(item => item.userId === id);

    if (existingUserIndex !== -1) {
      setChangeMemoList(updatedList);
    } else {
      setChangeMemoList(userList => [
        ...userList,
        {userId: id, memo: event.target.value},
      ]);
    }
  };
  console.log(changeMemoList);

  const handleCheck = (checked, item) => {
    if (checked) {
      setSelectedUserIds([...selectedUserIds, item]);
    } else if (!checked) {
      setSelectedUserIds(selectedUserIds.filter(el => el !== item));
    }
  };

  const AllSelect = checked => {
    if (checked) {
      const allArray = [];
      userList?.data?.forEach(el => {
        allArray.push(el.id);
      });
      setSelectedUserIds(allArray);
    } else {
      setSelectedUserIds([]);
    }
  };

  const deleteMember = async () => {
    await deleteCheckedMember({userIdList: selectedUserIds});
  };

  const sendChangeMemo = async () => {
    await changeMemoPost({memoList: changeMemoList});
  };

  return (
    <div>
      <div>
        <h1>유저현황</h1>
        <Button size="mini" color="red" onClick={deleteMember}>
          삭제
        </Button>
        체크한 유저를 멤버에서 삭제합니다.
      </div>
      <div>
        <Button
          size="mini"
          style={{marginTop: '10px'}}
          color="green"
          onClick={sendChangeMemo}>
          부서 저장
        </Button>
        수정된 부서 내용을 저장합니다.
      </div>
      <Table>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>
              <input
                type="checkbox"
                onChange={e => AllSelect(e.target.checked)}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>부서 (입력가능)</Table.HeaderCell>
            <Table.HeaderCell>이름</Table.HeaderCell>
            <Table.HeaderCell>닉네임</Table.HeaderCell>
            <Table.HeaderCell>이메일</Table.HeaderCell>
            <Table.HeaderCell>연락처</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userList?.data?.map(el => {
            return (
              <Table.Row textAlign="center" key={el.id}>
                <Table.Cell width={1}>
                  <input
                    type="checkbox"
                    onChange={e => {
                      handleCheck(e.target.checked, el.id);
                    }}
                    checked={selectedUserIds.includes(el.id) ? true : false}
                  />
                </Table.Cell>
                <Table.Cell width={1}>
                  <input
                    style={{border: '1px solid rgba(34,36,38,.03) '}}
                    placeholder="-"
                    defaultValue={el.memo || null}
                    onChange={e => {}}
                    onBlurCapture={event => {
                      if (event.target.value !== el.memo) {
                        changeMemo(event, el.id);
                      }
                    }}
                  />
                </Table.Cell>
                <Table.Cell width={2}>{el.name}</Table.Cell>
                <Table.Cell>{el.nickname}</Table.Cell>
                <Table.Cell>{el.email}</Table.Cell>
                <Table.Cell>{el.phone}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Member;
