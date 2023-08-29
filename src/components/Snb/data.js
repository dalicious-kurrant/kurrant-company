import {ReactComponent as Dashboard} from '../../assets/snb/dashboard.svg';
import {ReactComponent as Speaker} from '../../assets/snb/speaker.svg';
import {ReactComponent as Group} from '../../assets/snb/group.svg';
import {ReactComponent as Diagram} from '../../assets/snb/diagram.svg';
import {ReactComponent as Membership} from '../../assets/snb/membership.svg';
import {ReactComponent as Service} from '../../assets/snb/service.svg';
import {ReactComponent as AddOrder} from '../../assets/snb/addOrder.svg';
import {ReactComponent as Payment} from '../../assets/snb/payment.svg';
import {ReactComponent as Corporation} from '../../assets/snb/corporation.svg';
import {ReactComponent as ActiveDashboard} from '../../assets/activeSnb/dashboard.svg';
import {ReactComponent as ActiveSpeaker} from '../../assets/activeSnb/speaker.svg';
import {ReactComponent as ActiveGroup} from '../../assets/activeSnb/group.svg';
import {ReactComponent as ActiveDiagram} from '../../assets/activeSnb/diagram.svg';
import {ReactComponent as ActiveMembership} from '../../assets/activeSnb/membership.svg';
import {ReactComponent as ActiveService} from '../../assets/activeSnb/service.svg';
import {ReactComponent as ActiveAddOrder} from '../../assets/activeSnb/addOrder.svg';
import {ReactComponent as ActivePayment} from '../../assets/activeSnb/payment.svg';
import {ReactComponent as ActiveCorporation} from '../../assets/activeSnb/corporation.svg';
import AdditionalOrder from 'Pages/additionalOrderPage/additionalOrder/AdditionalOrder';

const code = localStorage.getItem('code');
console.log(code);
export const menuData = [
  // {
  //   name: '대시보드',
  //   path: 'dashbard',
  //   icon: <Dashboard />,
  //   activeIcon: <ActiveDashboard />,
  // },
  {
    name: '공지사항',
    path: '/notice',
    icon: <Speaker />,
    activeIcon: <ActiveSpeaker />,
  },
  {
    name: '고객사 정보',
    path: '/company-info',
    icon: <Group />,
    activeIcon: <ActiveGroup />,
  },
  {
    name: '주문현황',
    path: '/order',
    icon: <Diagram />,
    activeIcon: <ActiveDiagram />,
  },
  // 정호님 테스트 끝나고 메뉴 순서 바꿔야 함 . 주문추가 -> 정산 관리
  {
    name: '멤버 정보',
    path: '/Memberinfo',
    icon: <Membership />,
    activeIcon: <ActiveMembership />,
  },
  {
    name: '정산 관리',
    path: '/calc',
    icon: <Payment />,
    activeIcon: <ActivePayment />,
  },
  {
    name: '구성원 초대하기',
    path: '/company-membership',
    icon: <Corporation />,
    activeIcon: <ActiveCorporation />,
  },
  code === 'AAAAAA' && {
    name: '추가주문',
    path: '/additionalOrder',
    icon: <AddOrder />,
    activeIcon: <ActiveAddOrder />,
  },
];
