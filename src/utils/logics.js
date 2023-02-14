export const handleFalsyValue = value => {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'undefined') {
    return 'undefined';
  } else if (typeof value === 'null') {
    return 'null';
  } else if (value === false) {
    return 'false';
  } else {
    return '-';
  }
};
