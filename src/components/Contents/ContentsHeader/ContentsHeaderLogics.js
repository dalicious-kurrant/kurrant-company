import {CRUDAvaliableList} from 'data/CRUDAvaliableList';

export const isCRUDAvaliable = pathname => {
  return CRUDAvaliableList.map(value => `/main/${value}`).includes(pathname);
};
