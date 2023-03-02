import axios from 'axios';
import instance from 'configs/axiosConfig';
import {useQuery} from 'react-query';

const useApiTest = () => {
  const {
    data: getData,
    status,
    isLoading,
  } = useQuery(['getUserInfo'], async () => {
    const code = localStorage.getItem('code');
    const response = await instance.get(
      `${process.env.REACT_APP_BASE_URL}/v1/client/members?code=${code}`,
    );

    // console.log(response.data);

    return response.data;
  });

  return {};
};

export default useApiTest;
