export const calculateTotalPaginationPages = (dataLength, limit) => {
  const buttonCount = Math.floor(dataLength / limit) + 1;

  return buttonCount;
};
