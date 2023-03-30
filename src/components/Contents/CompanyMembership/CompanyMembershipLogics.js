import {
  extractOnlyTruesNumberArray,
  removeParentKeyInCheckbox,
} from 'common/Table/Logics';
import {handleFalsyValueToBlank} from 'utils/valueHandlingLogics';

export const handleCompanyMembershipDelete = (
  checkboxStatus,
  tableDeleteList,
  companyMembershipData,
  setTableDeleteList,
  setCompanyMembershipData,
) => {
  const status = {...checkboxStatus};

  let deleteList = [...tableDeleteList];

  Object.entries(status).forEach(v => {
    if (v[1] === true) {
      deleteList.push(v[0]);
    }
  });

  deleteList = [...new Set(deleteList)];

  let injectDeleteList = [];
  const companyMembershipDataToDelete = [...companyMembershipData];

  companyMembershipDataToDelete.forEach(v => {
    if (deleteList.includes(v.id.toString())) {
      v['isOnDeleteList'] = true;
      injectDeleteList.push(v);
    } else {
      injectDeleteList.push(v);
    }
  });

  setTableDeleteList(deleteList);
  setCompanyMembershipData(injectDeleteList);
};

export const sendFinal = (
  data,
  sendFinalMutate,
  checkboxStatus,
  tableDeleteList,
  deleteFinalMutate,
) => {
  if (
    !Object.values(checkboxStatus).includes(true) &&
    tableDeleteList.length < 1
  ) {
    window.confirm('체크된 항목이 없습니다 ');
    return;
  }

  let newData = {
    id: [],
    email: [],
    name: [],
    phone: [],
    code: 'AAAAAA',
  };

  if (Object.values(checkboxStatus).includes(true)) {
    const checkboxStatusNow = {...removeParentKeyInCheckbox(checkboxStatus)};

    let selectedData = [];

    Object.entries(checkboxStatusNow).forEach(value => {
      if (value[1] === true) {
        selectedData.push(value[0]);
      }
    });

    let finalLaunch = [];

    data.map(value => {
      if (selectedData.includes(value.id.toString())) {
        finalLaunch.push(value);
      }
    });

    const idArray = [];
    const emailArray = [];
    const nameArray = [];
    const phoneArray = [];

    finalLaunch.forEach(v => {
      idArray.push(parseInt(v.id));
      emailArray.push(v.email ? v.email : '');
      nameArray.push(v.name ? v.name : '');
      phoneArray.push(v.phone ? v.phone : '');
    });

    newData['id'] = idArray;
    newData['email'] = emailArray;
    newData['name'] = nameArray;
    newData['phone'] = phoneArray;
  }

  if (
    window.confirm(
      '기존에 있던 데이터가 아래의 테이블에 있는 데이터로 변경됩니다 진행하시겠습니까?',
    )
  ) {
    if (
      newData.id.length > 0 &&
      newData.email.length > 0 &&
      newData.name.length > 0 &&
      newData.phone.length > 0 &&
      newData.code
    ) {
      sendFinalMutate(newData);
    }

    if (tableDeleteList.length > 0) {
      sendDelete(tableDeleteList, deleteFinalMutate);
    }
  } else {
    return;
  }
};

const sendDelete = (tableDeleteList, deleteFinalMutate) => {
  const toNumList = tableDeleteList.map(v => {
    return parseInt(v);
  });

  // 스트링 -> 넘버

  const submitData = {
    waitMemberIdList: toNumList,
  };

  deleteFinalMutate(submitData);
};

// 유저타입 USER -> 일반 , MANAGER -> 관리자

// export const shiftUserType = companyMembershipData => {
//   if (companyMembershipData.length > 0) {
//     const shifted = [...companyMembershipData];

//     const shiftedData = shifted.map(value => {
//       if (value.role === 'USER') {
//         value.role = '일반';
//       } else if (value.role === 'MANAGER') {
//         value.role = '관리자';
//       } else if (value.role === 'GUEST') {
//         value.role = '게스트';
//       }
//       return value;
//     });
//     return shiftedData;
//   }
// };

// 비밀번호 5자로 줄이기

export const sliceStringDataByKey = (
  companyMembershipData,
  key,
  charLength,
) => {
  if (!companyMembershipData) return;

  const shifted = [...companyMembershipData];

  const slicedData = shifted.map(v => {
    v[key] = `${v[key].slice(0, charLength)}...`;

    return v;
  });

  return slicedData;
};
