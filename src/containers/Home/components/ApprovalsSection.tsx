import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RfH, getUserConfigData } from "../../../utils/helpers";
import {
  getApprovalFeatureModulesSelector,
  getFeatureModuleDataSelector,
} from "../redux/selectors";

import { isEmpty } from "lodash";
import { createStructuredSelector } from "reselect";
import ApprovalRequestGridItem from "../../../components/ApprovalRequestGridItem";
import { ApprovalsGridSkeleton } from "../../../components/SkeletonLoader";
import NavigationRouteNames from "../../../routes/ScreenNames";
import { Colors } from "../../../theme";
import { getApprovalTasksCount } from "../../Approvals/redux/actions";
import { getApprovalTasksCountSelector } from "../../Approvals/redux/selectors";
import { getTaskCountByModule } from "../../Approvals/serializer";
import { getMyProfileDetailsSelector } from "../../LoginHome/redux/selectors";
import { isDarkModeSelector } from "../../redux/selectors";
import { getApprovalFeatureModules } from "../redux/actions";
import styles from "../styles";
import HeaderCateRow from "./HeaderCateRow";

type ApprovalsSectionProps = {
  handleClick: Function;
};

const stateSelector = createStructuredSelector({
  approvalFeatureModulesData: getApprovalFeatureModulesSelector,
  approvalTasksCountData: getApprovalTasksCountSelector,
  isDarkMode: isDarkModeSelector,
  myProfileDetails: getMyProfileDetailsSelector,
  featureModuleData: getFeatureModuleDataSelector,
});

export function ApprovalsSection(props: ApprovalsSectionProps): JSX.Element {
  const { handleClick } = props;
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {
    approvalFeatureModulesData,
    approvalTasksCountData,
    isDarkMode,
    myProfileDetails,
    featureModuleData,
  } = useSelector(stateSelector);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (isFocused) {
      dispatch(getApprovalFeatureModules.trigger());
      dispatch(getApprovalTasksCount.trigger());
    }
  }, [isFocused]);

  useEffect(() => {
    if (
      !isEmpty(approvalFeatureModulesData) &&
      approvalFeatureModulesData?.length > 0
    ) {
      const filteredData = approvalFeatureModulesData
        ?.filter(
          (item) =>
            item?.isActive &&
            getUserConfigData(
              myProfileDetails?.config?.config,
              item?.feature,
              featureModuleData
            ) &&
            item.feature !== "approvals_it"
        )
        ?.slice()
        ?.sort((a, b) => a.order - b.order);

      setList([
        ...filteredData,
        {
          createdDate: "2024-02-17T06:48:53.878Z",
          externalIntegration: "yardi",
          externalUrl: "https://www.yardipce.com/37117arabiantmp",
          feature: "approvals_workflow",
          iconUrl:
            "https://images.ctfassets.net/01phmrb9fsp7/51fCAtPYPKFyw0fHuPvO41/8031c8984d2394e4157d190aaaa856da/approvals-it.png",
          id: 3,
          isActive: true,
          isDeleted: false,
          isLive: true,
          name: "Workflow",
          order: 3,
          organizationId: 1,
          redirectToExternalUrl: false,
          showInMore: true,
          subModules: [
            {
              externalId: "customer-wise-termination",
              isLive: true,
              name: "Customer Wise Termination",
              order: 1,
            },
            {
              externalId: "new-deal-request",
              isLive: true,
              name: "New Deal Request",
              order: 2,
            },
            {
              externalId: "customer-wise-renewal",
              isLive: true,
              name: "Customer Wise Renewal",
              order: 3,
            },
            {
              externalId: "lease-wise-renewal",
              isLive: true,
              name: "Lease Wise Renewal",
              order: 4,
            },
            {
              externalId: "lease-wise-termination",
              isLive: true,
              name: "Lease Wise Termination",
              order: 5,
            },
          ],
          updatedDate: "2024-04-30T09:05:39.958Z",
          version: 2,
        },
      ]);
    }
  }, [approvalFeatureModulesData]);

  if (approvalFeatureModulesData === undefined) {
    return <ApprovalsGridSkeleton isDarkMode={isDarkMode} />;
  }

  return (
    <View
      style={{
        paddingTop: RfH(12),
        paddingBottom: RfH(5),
        backgroundColor: isDarkMode
          ? Colors.darkModeBackground
          : Colors.transparent,
      }}
    >
      {list?.length > 0 ? (
        <HeaderCateRow
          categoryName={`Approvals`}
          showSeeAll={false}
          onClickSeeAll={() => {
            navigation.navigate(NavigationRouteNames.APPROVALS as never);
          }}
        />
      ) : null}
      <FlatList
        columnWrapperStyle={styles.row}
        data={list || []}
        numColumns={4}
        style={{ marginBottom: RfH(7) }}
        renderItem={({ item }) => (
          <View style={[styles.gridItemView, { paddingTop: RfH(15) }]}>
            <ApprovalRequestGridItem
              onPress={() => handleClick(item)}
              icon={item?.iconUrl}
              badgeCount={getTaskCountByModule(
                item?.feature,
                approvalTasksCountData
              )}
              text={item?.name}
              fontSize={15}
              iconHeight={RfH(32)}
              iconWidth={RfH(32)}
              loading={false}
              item={item}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
