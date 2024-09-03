import { Colors, Images } from '../../theme';
import { rewardsBottomTabsName } from '../../utils/constants';

export const getWebViewUrl = (urlFor) => {
  let url = 'https://www.cenomirewards.com/malls';
  switch (urlFor) {
    case rewardsBottomTabsName.MALLS:
      url = 'https://www.cenomirewards.com/malls';
      break;
    case rewardsBottomTabsName.BRANDS:
      url = 'https://www.cenomirewards.com/partners';
      break;
    case rewardsBottomTabsName.REWARDS:
      url = 'https://www.cenomirewards.com/support#about-us';
      break;
    default:
      url = 'https://www.cenomirewards.com/malls';
      break;
  }

  return url;
};
