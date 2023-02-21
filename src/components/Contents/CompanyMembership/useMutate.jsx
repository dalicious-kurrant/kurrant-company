import {useAtom} from 'jotai';
import {getCompanyMembershipDataListAtom} from 'jotai/state';
import styled from 'styled-components';

const useMutate = () => {
  const [companyMembershipDataList, setCompanyMembershipDataList] = useAtom(
    getCompanyMembershipDataListAtom,
  );

  const submitMutate = input => {
    const newDataList = [...companyMembershipDataList, input];

    setCompanyMembershipDataList(newDataList);
  };

  const editMutate = input => {
    // input : 객체

    const oldDataList = [...companyMembershipDataList];
    let newDataList;
    for (let i = 0; i < oldDataList.length; i++) {
      if (oldDataList[i].id === input.id) {
      }
    }
  };

  const deleteMutate = () => {};

  return {submitMutate, editMutate, deleteMutate};
};

export default useMutate;

const Container = styled.div``;
