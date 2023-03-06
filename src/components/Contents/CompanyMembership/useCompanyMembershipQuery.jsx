import axios from 'axios';
import instance from 'configs/axiosConfig';
import {useAtom} from 'jotai';
import {exelCompanyMembershipAtom} from 'jotai/compayMembership';
import {useEffect} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import {shiftUserType, sliceStringDataByKey} from './CompanyMembershipLogics';
import {CompanyMembershipExelExportAtom} from './store';

const useCompanyMembershipQuery = (
  uniqueQueryKey,
  atom,

  token = false,
  // enable = true,
) => {
  // 서버에서 데이터를 십플하게 받는 custom hook입니다
  // params : queryKey, atom, url, enable
  // queryKey : 배열 아니면 스트링
  // atom : jotai의 아톰
  // url : url
  // enable : useQuery를 껏다켰다 할 수 있음

  // const [exelPlan, setExelPlan] = useAtom(exelCompanyMembershipAtom);
  const [exelExport, setExelExport] = useAtom(CompanyMembershipExelExportAtom);

  const [, setJotaiData] = useAtom(atom);
  const queryClient = useQueryClient();
  const getToken = localStorage.getItem('code');

  const {data, status, isLoading} = useQuery(
    uniqueQueryKey,

    token
      ? async ({queryKey}) => {
          const response = await instance.get(
            `client/members/waiting?code=${getToken}`,
          );

          return response.data;
        }
      : async ({queryKey}) => {
          const response = await axios.get(
            `client/members/waiting?code=${getToken}`,
          );

          return response.data;
        },
    {
      enabled: true,
    },
  );

  const {mutate: sendFinalMutate} = useMutation(
    async todo => {
      console.log(todo);

      const response = await instance.post(`client/members`, todo);
      console.log('기업가입 리스트 추가 및 수정 성공');
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getCompanyMembershipJSON']);
        console.log('유저정보 등록, 수정 success');
      },
      onError: () => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
      },
    },
  );
  const {mutate: deleteFinalMutate} = useMutation(
    async todo => {
      console.log(todo);

      const response = await instance.post(`client/members/waiting`, todo);
      // const response = await axios.delete(`/v1/client/members/waiting`, todo);
      console.log('기업가입 리스트 삭제 성공');
      return response;
    },
    {
      onSuccess: () => {
        console.log('유저정보 삭제 success');
        queryClient.invalidateQueries(['getCompanyMembershipJSON']);
      },
      onError: () => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
      },
    },
  );

  useEffect(() => {
    return () => {
      setJotaiData([]);
      setExelExport([]);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setJotaiData(data);
      // setExelExport(data);

      // setExelPlan(data);
    }
  }, [data, setJotaiData]);

  return {
    status,
    isLoading,

    sendFinalMutate,
    deleteFinalMutate,
  };
};

export default useCompanyMembershipQuery;
