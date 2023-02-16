export const calculateTotalPages = (dataLength, limit) => {
  const buttonCount = Math.floor(dataLength / limit) + 1;

  return buttonCount;
};

export const calculatePageButtons = (pageNow, totalPages) => {
  if (pageNow <= 0 || totalPages <= 0) {
    console.log('에러: 현재페이지 아니면 총 페이지수가 음수 임');
    return [];
  }
  if (pageNow > totalPages) {
    console.log(
      '에러 : 현재 페이지수가 총 페이지수보다 더 큼;; 대입값을 확인해주시오      ',
    );
    return [];
  }

  const tens = Math.floor((pageNow - 1) / 10);
  const units = pageNow % 10;

  // startNum + units
  let yo = [];

  for (let a = 1; a <= 10; a++) {
    let k = tens * 10 + a;
    if (k > totalPages) break;

    yo.push(k);
  }

  return yo;
};
