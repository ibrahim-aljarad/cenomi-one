import { Approvals, Home, MoreOptions } from '../containers';

import ApprovalIconSVG from '../components/SVG/approvalIconSVG';
import BenefitsIconSVG from '../components/SVG/benefitsIconSVG';
import HomeIconSVG from '../components/SVG/homeIconSVG';
import HrRequestIconSVG from '../components/SVG/hrRequestIconSVG';
import MoreOptionsIconSVG from '../components/SVG/moreOptionsIconSVG';
import ProfileIconSVG from '../components/SVG/profileIconSVG';
import HrRequest from '../containers/HrRequest';
import RewardsHome from '../containers/RewardsHome';
import RewardsProfile from '../containers/RewardsHome/RewardsProfile';
import { localize } from '../locale/utils';
import { Images } from '../theme';
import { rewardsBottomTabsName } from '../utils/constants';
import NavigationRouteNames from './ScreenNames';
import Documents from '../containers/Documents';
import DocumentIconSVG from '../components/SVG/documentIconSVG';

const OCARoutes = [
  {
    name: NavigationRouteNames.HOME,
    component: Home,
    icon: {
      active: Images.homeActiveIcon,
      inactive: Images.homeInActiveIcon
    },
    label: localize('bottombar.home'),
    IconComponent: HomeIconSVG
  },
  {
    name: NavigationRouteNames.APPROVALS,
    component: Approvals,
    icon: {
      active: Images.approvalActiveIcon,
      inactive: Images.approvalInactiveIcon
    },
    label: localize('home.approvals'),
    IconComponent: ApprovalIconSVG
  },
  // {
  //   name: NavigationRouteNames.HR_REQUEST,
  //   component: HrRequest,
  //   icon: {
  //     active: Images.hrActive,
  //     inactive: Images.hrInActive
  //   },
  //   label: localize('home.requests'),
  //   IconComponent: HrRequestIconSVG
  // },
  {
    name: NavigationRouteNames.DOCUMENTS,
    component: Documents,
    icon: {
      active: '',
      inactive: ''
    },
    label: `Documents`,
    IconComponent: DocumentIconSVG
  },
  // {
  //   name: NavigationRouteNames.ANALYTICS,
  //   component: Analytics,
  //   icon: {
  //     active: Images.analyticsActiveIcon,
  //     inactive: Images.analyticsInactiveIcon
  //   },
  //   label: localize('home.analytics'),
  //   IconComponent: AnalyticsIconSVG
  // },
  {
    name: NavigationRouteNames.MORE_OPTIONS,
    component: MoreOptions,
    icon: {
      active: Images.moreActiveIcon,
      inactive: Images.moreInActiveIcon
    },
    label: localize('home.more'),
    IconComponent: MoreOptionsIconSVG
  }
  // {
  //   name: NavigationRouteNames.CLIENTBENEFITS,
  //   component: ClientBenefits,
  //   icon: {
  //     active: Images.benefitsActiveIcon,
  //     inactive: Images.benefitsInactiveIcon
  //   },
  //   label: localize('home.benefits'),
  //   IconComponent: BenefitsIconSVG
  // }
];

const RewardsOCARoutes = [
  {
    name: NavigationRouteNames.REWARDS_MALL,
    component: RewardsHome,
    icon: {
      active: Images.homeActiveIcon,
      inactive: Images.homeInActiveIcon
    },
    label: localize('bottombar.malls'),
    IconComponent: HomeIconSVG,
    uniqueName: rewardsBottomTabsName.MALLS
  },
  {
    name: NavigationRouteNames.REWARDS_BRAND,
    component: RewardsHome,
    icon: {
      active: Images.benefitsActiveIcon,
      inactive: Images.benefitsInactiveIcon
    },
    label: localize('bottombar.brands'),
    IconComponent: HrRequestIconSVG,
    uniqueName: rewardsBottomTabsName.BRANDS
  },
  {
    name: NavigationRouteNames.REWARDS_ABOUT,
    component: RewardsHome,
    icon: {
      active: Images.benefitsActiveIcon,
      inactive: Images.benefitsInactiveIcon
    },
    label: localize('bottombar.rewards'),
    IconComponent: BenefitsIconSVG,
    uniqueName: rewardsBottomTabsName.REWARDS
  },
  {
    name: NavigationRouteNames.REWARDS_PROFILE,
    component: RewardsProfile,
    icon: {
      active: Images.benefitsActiveIcon,
      inactive: Images.benefitsInactiveIcon
    },
    label: localize('common.profile'),
    IconComponent: ProfileIconSVG,
    uniqueName: rewardsBottomTabsName.PROFILE
  }
];

export { OCARoutes, RewardsOCARoutes };
