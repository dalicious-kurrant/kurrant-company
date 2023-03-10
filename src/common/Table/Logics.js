export const removeParentKeyInCheckbox = checkboxStatus => {
  const currentChekboxStatus = {...checkboxStatus};

  delete currentChekboxStatus.parent;

  return currentChekboxStatus;
};

export const extractOnlyTruesNumberArray = checkboxStatus => {
  let onlyTrues = [];

  Object.entries(removeParentKeyInCheckbox({...checkboxStatus})).forEach(
    value => {
      if (value[1] === true) {
        onlyTrues.push(parseInt(value[0]));
      }
    },
  );

  return onlyTrues;
};

export const makeId = dataInput => {
  return dataInput.map((v, i) => {
    v['id'] = i + 1;
    return v;
  });
};

export const removeIdToSend = dataInput => {
  return dataInput.map((v, i) => {
    delete v.id;
    return v;
  });
};

export const isInCheckFilterList = (filterList, fieldName) => {
  // console.log(filterList);
  // console.log(fieldName);

  let isInCheck = false;
  [...filterList].forEach(v => {
    if (v.fieldName === fieldName) {
      console.log(fieldName);
      isInCheck = true;
    }
  });

  return isInCheck;
};
