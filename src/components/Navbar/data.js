import DashboardIcon from 'assets/svg/DashboardIcon.svg';
import SpeakerIcon from 'assets/svg/SpeakerIcon.svg';
import ApartmentIcon from 'assets/svg/ApartmentIcon.svg';
import DiagramIcon from 'assets/svg/DiagramIcon.svg';
import Profile2PeopleIcon from 'assets/svg/Profile2PeopleIcon.svg';
import AssignmentIcon from 'assets/svg/AssignmentIcon.svg';
import SquarePlusIcon from 'assets/svg/SquarePlusIcon.svg';
import AdjustmentManagementIcon from 'assets/svg/AdjustmentManagementIcon.svg';

export const navbarInitialState = [
  {
    id: 'dashbard',
    name: '대시보드',
    iconSrc: DashboardIcon,
    selected: false,
    routeName: 'dashbard',
  },
  {
    id: 'notice',
    name: '공지사항',
    iconSrc: SpeakerIcon,
    selected: false,
    routeName: 'notice',
  },
  {
    id: 'company_info',
    name: '고객사 정보',
    iconSrc: ApartmentIcon,
    selected: false,
    routeName: 'company_info',
  },
  {
    id: 'current_status',
    name: '상세 현황',
    iconSrc: DiagramIcon,
    selected: false,
    routeName: 'current_status',
  },
  {
    id: 'membership_status',
    name: '멤버십/유저 현황',
    iconSrc: Profile2PeopleIcon,
    selected: true,
    routeName: 'membership_status',
  },
  {
    id: 'service_status',
    name: '서비스 현황',
    iconSrc: AssignmentIcon,
    selected: false,
    routeName: 'service_status',
  },
  {
    id: 'additional_order',
    name: '추가 주문',
    iconSrc: SquarePlusIcon,
    selected: false,
    routeName: 'additional_order',
  },
  {
    id: 'adjustment_management',
    name: '정산 관리',
    iconSrc: AdjustmentManagementIcon,
    selected: false,
    routeName: 'adjustment_management',
  },
];
