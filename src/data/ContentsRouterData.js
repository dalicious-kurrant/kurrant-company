import DashboardIcon from 'assets/svg/DashboardIcon.svg';
import SpeakerIcon from 'assets/svg/SpeakerIcon.svg';
import ApartmentIcon from 'assets/svg/ApartmentIcon.svg';
import DiagramIcon from 'assets/svg/DiagramIcon.svg';
import Profile2PeopleIcon from 'assets/svg/Profile2PeopleIcon.svg';
import AssignmentIcon from 'assets/svg/AssignmentIcon.svg';
import SquarePlusIcon from 'assets/svg/SquarePlusIcon.svg';
import AdjustmentManagementIcon from 'assets/svg/AdjustmentManagementIcon.svg';

export const ContentsRouterData = [
  // {
  //   id: 'dashboard',
  //   name: '대시보드',
  //   iconSrc: DashboardIcon,
  //   selected: true,
  //   routeName: 'dashbard',
  //   shortIntroduction: '대시보드입니다',
  // },
  {
    id: 'notice',
    name: '공지사항',
    iconSrc: SpeakerIcon,
    selected: false,
    routeName: 'notice',
    shortIntroduction: '공지사항입니다',
  },
  {
    id: 'company-info',
    name: '고객사 정보',
    iconSrc: ApartmentIcon,
    selected: false,
    routeName: 'company-info',
    shortIntroduction: '고객사 정보입니다',
  },
  // {
  //   id: 'current-status',
  //   name: '상세 현황',
  //   iconSrc: DiagramIcon,
  //   selected: false,
  //   routeName: 'current-status',
  //   shortIntroduction: '상세현황입니다',
  // },
  {
    id: 'user-status',
    name: '멤버십/유저 현황',
    iconSrc: Profile2PeopleIcon,
    selected: false,
    routeName: 'user-status',
    shortIntroduction: '멤버십/유저 현황입니다',
  },
  // {
  //   id: 'service-status',
  //   name: '서비스 현황',
  //   iconSrc: AssignmentIcon,
  //   selected: false,
  //   routeName: 'service-status',
  //   shortIntroduction: '서비스 현황입니다',
  // },
  // {
  //   id: 'additional-order',
  //   name: '추가 주문',
  //   iconSrc: SquarePlusIcon,
  //   selected: false,
  //   routeName: 'additional-order',
  //   shortIntroduction: '추가 주문입니다',
  // },
  {
    id: 'adjustment-management',
    name: '정산 관리',
    iconSrc: AdjustmentManagementIcon,
    selected: false,
    routeName: 'adjustment-management',
    shortIntroduction: '정산 관리입니다',
  },
  {
    id: 'company-membership',
    name: '기업 가입 리스트',
    iconSrc: AdjustmentManagementIcon,
    selected: false,
    routeName: 'company-membership',
    shortIntroduction: '기업 가입 리스트입니다',
  },
];
