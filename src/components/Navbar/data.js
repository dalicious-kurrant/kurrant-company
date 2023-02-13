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
  },
  {
    id: 'notice',
    name: '공지사항',
    iconSrc: SpeakerIcon,
    selected: false,
  },
  {
    id: 'company_info',
    name: '고객사 정보',
    iconSrc: ApartmentIcon,
    selected: false,
  },
  {
    id: 'current_status',
    name: '상세 현황',
    iconSrc: DiagramIcon,
    selected: false,
  },
  {
    id: 'membership_status',
    name: '멤버십/유저 현황',
    iconSrc: Profile2PeopleIcon,
    selected: true,
  },
  {
    id: 'service_status',
    name: '서비스 현황',
    iconSrc: AssignmentIcon,
    selected: false,
  },
  {
    id: 'additional_order',
    name: '추가 주문',
    iconSrc: SquarePlusIcon,
    selected: false,
  },
  {
    id: 'adjustment_management',
    name: '정산 관리',
    iconSrc: AdjustmentManagementIcon,
    selected: false,
  },
];
