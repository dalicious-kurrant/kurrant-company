import {corporationApis} from 'api/corporation';
import {useQuery} from 'react-query';

export function useGetCorporationInfo() {
  return useQuery('corporationInfoList', () => {
    return corporationApis.corporationInfo();
  });
}
