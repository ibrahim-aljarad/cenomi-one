import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { HeaderSVG, Loader } from "../../../components";
import { Colors } from "../../../theme";
import styles from "./styles";

import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getApprovalTasksDetails,
  getLeasingTasksDetails,
  getProcurementTaskDetails,
  getWorkflowTasksDetails,
} from "../redux/actions";
import { getApprovalTasksDetailsSelector } from "../redux/selectors";

import { isEmpty } from "lodash";
import { EVENT_NAME, trackEvent } from "../../../utils/analytics";
import { isDarkModeSelector } from "../../redux/selectors";
import {
  isDealWorkflowModuleCheck,
  isProcurementServiceModuleCheck,
  isYardiServiceModuleCheck,
} from "../serializer";
import ApprovalsActionButtons from "./ApprovalsActionButtons";
import WrapperContainer from "../../../components/WrapperContainer";
import WorkflowDetails from "./WorkflowDetails";
import { ThemeProvider } from "../../../theme/context";
import ProcurementDetails from "./ProcurementDetails";

const stateSelector = createStructuredSelector({
  approvalTasksDetailsData: getApprovalTasksDetailsSelector,
  isDarkMode: isDarkModeSelector,
});

const ApprovalsDetails = (props: any) => {
  const navigation = useNavigation();
  const { approvalItem } = props.route.params;
  const dispatch = useDispatch();

  const { isDarkMode, approvalTasksDetailsData } = useSelector(stateSelector);

  const isYardiServiceModule = isYardiServiceModuleCheck(approvalItem);
  const isProcurementServiceModule =
    isProcurementServiceModuleCheck(approvalItem);
  const isDealWorkflowModule = isDealWorkflowModuleCheck(approvalItem);

  useEffect(() => {
    trackEvent(EVENT_NAME.SCREEN_APPROVALS_DETAILS);

    if (isYardiServiceModule) {
      const data = {
        type: approvalItem?.additionalInfo?.type,
        workflowName: approvalItem?.additionalInfo?.workflowName,
        recordId: approvalItem?.additionalInfo?.recordId,
        recordCode: approvalItem?.additionalInfo?.recordCode,
      };
      dispatch(getLeasingTasksDetails.trigger({ data }));
    } else if (isProcurementServiceModule) {
      dispatch(
        getProcurementTaskDetails.trigger({ taskId: approvalItem?.externalId })
      );
    } else if (isDealWorkflowModule) {
      dispatch(
        getWorkflowTasksDetails.trigger({ taskId: approvalItem?.number })
      );
    } else {
      dispatch(
        getApprovalTasksDetails.trigger({ taskId: approvalItem?.externalId })
      );
    }
  }, []);

  const isLoading =
    isEmpty(approvalTasksDetailsData) ||
    (!(isDealWorkflowModule || isProcurementServiceModule) &&
      !approvalTasksDetailsData?.html);

  const renderContent = () => {
    if (isLoading) return null;

    return (
      <ScrollView
        style={{
          backgroundColor: isDarkMode
            ? Colors.darkModeBackground
            : Colors.transparent,
          flex: 1,
        }}
      >
        {isDealWorkflowModule ? (
          <WorkflowDetails
            data={approvalTasksDetailsData}
            isDarkMode={isDarkMode}
            approvalType={approvalItem?.externalId}
            formName={approvalItem?.formName}
          />
        ) : (
          <ProcurementDetails
            isDarkMode={isDarkMode}
            taskDetails={approvalTasksDetailsData}
            isYardiServiceModule={isYardiServiceModule}
          />
        )}
      </ScrollView>
    );
  };

  const renderActionButtons = () => {
    if (isLoading) return null;

    if (
      !isEmpty(approvalTasksDetailsData) &&
      (approvalTasksDetailsData?.actionRequired || isDealWorkflowModule)
    ) {
      return (
        <View
          style={[
            styles.bottomButtonContainer,
            {
              backgroundColor: isDarkMode
                ? Colors.darkModeBackground
                : Colors.white,
              borderTopColor: Colors.grayBorder,
              zIndex: 1,
            },
          ]}
        >
          <ApprovalsActionButtons
            isDarkMode={isDarkMode}
            approvalItem={approvalItem}
            detailData={approvalTasksDetailsData}
            actionSuccess={() => navigation.goBack()}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <WrapperContainer showOverlay={true}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode
            ? Colors.darkModeBackground
            : Colors.transparent,
        }}
      >
        <View style={styles.mainContainer}>
          <ThemeProvider useNewStyles={true}>
            <HeaderSVG
              isBackButtonVisible={true}
              titleText={
                approvalItem.externalId
                  ? approvalItem.externalId +
                    " - " +
                    (approvalItem.subModule?.name ||
                      approvalItem.subModuleName ||
                      "")
                  : approvalItem?.heading
              }
              titleFont={20}
              onBackPressHandler={() => navigation.goBack()}
              isRight2BtnVisible={false}
            />
          </ThemeProvider>

          {renderContent()}
          {renderActionButtons()}
        </View>
        <Loader isLoading={isLoading} />
      </SafeAreaView>
    </WrapperContainer>
  );
};

ApprovalsDetails.propTypes = {
  route: PropTypes.object,
  isButtonDisable: PropTypes.bool,
};

ApprovalsDetails.defaultProps = {
  route: {},
  isButtonDisable: false,
};

export default ApprovalsDetails;
