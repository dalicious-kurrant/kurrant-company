import {ContentsRouterData} from 'data/ContentsRouterData';
import React from 'react';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const useSetTitleByPathname = setContent => {
  const {pathname} = useLocation();

  useEffect(() => {
    ContentsRouterData.forEach(value => {
      if (pathname === `/main`) {
        setContent({
          name: '대시보드',
          shortIntroduction: '대시보드입니다',
        });
      }

      if (pathname === `/main/${value.id}`) {
        setContent({
          name: value.name,
          shortIntroduction: value.shortIntroduction,
        });
        return;
      }
    });
  }, [pathname]);

  return;
};
export default useSetTitleByPathname;
