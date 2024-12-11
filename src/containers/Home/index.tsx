import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Platform, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  invokeSurveySparrow,
  onSurveyResponseListener,
} from "surveysparrow-react-native-sdk";
import { ApprovalRequestModal, CustomWishesModal } from "../../components";
import { Colors, Images } from "../../theme";
import { EVENT_NAME, trackEvent } from "../../utils/analytics";
import {
  CONFIG_CONSTANT,
  LOCAL_STORAGE_DATA_KEY,
  SERVICEREQUEST_APPROVALS,
  wisheshForEnum,
} from "../../utils/constants";
import {
  RfH,
  alertBox,
  getIsMatchedCurrentDate,
  getSaveData,
  getUserConfigData,
  isEmailIncluded,
  isValidUrl,
  storeData,
  urlSlugify,
} from "../../utils/helpers";
import {
  markReadNotification,
  setNotificationPayload,
} from "../Notifications/redux/actions";
import {
  getOrganizationConfig,
  getSendWishesInfo,
  setIsChatWindowVisible,
} from "../redux/actions";
import { getWishesListSelector, isDarkModeSelector } from "../redux/selectors";
import {
  getPendingAcknowledgement,
  getQoutes,
  getTenantLogin,
  submitAcknowledge,
} from "./redux/actions";
import {
  getAcknowledgeDataSelector,
  getFeatureModuleDataSelector,
  getPendingAcknowledgementDataSelector,
  getQoutesSelector,
} from "./redux/selectors";

import messaging from "@react-native-firebase/messaging";
import { isEmpty } from "lodash";
import moment from "moment";
import { createStructuredSelector } from "reselect";
import CustomPopupModal from "../../components/CustomPopupModal";
import UseFulModal from "../../components/UseFulModal";
import WrapperContainer from "../../components/WrapperContainer";
import { localize } from "../../locale/utils";
import NavigationRouteNames from "../../routes/ScreenNames";
import { checkFusionActionsApproval } from "../Approvals/serializer";
import BotPress from "../BotPress";
import { getMyProfileDetailsSelector } from "../LoginHome/redux/selectors";
import { notificationPayloadSelector } from "../Notifications/redux/selectors";
import Quotes from "../Quotes";
import { ApprovalsSection } from "./components/ApprovalsSection";
import BenefitsSection from "./components/BenefitsSection";
import CorporateCommunication from "./components/CorporateCommunication";
import { HomeMainHeader } from "./components/HomeMainHeader";
import KnowledgeHUBSection from "./components/KnowledgeHUBSection";
import PendingDocumentModal from "./components/PendingDocumentModal";
import PendingItemsComponents from "./components/PendingItemsComponents";
import PendingSurveyModal from "./components/PendingSurveyModal";
import { ServiceRequestsSection } from "./components/ServiceRequestsSection";
import UseFulApps from "./components/UseFulApp";
import YouDontHaveAccessModal from "./components/YouDontHaveAccessModal";
import { jailBreak } from "../../utils/helper";
import RNExitApp from "react-native-exit-app";

const stateSelector = createStructuredSelector({
  myProfileData: getMyProfileDetailsSelector,
  isDarkMode: isDarkModeSelector,
  wishesDataList: getWishesListSelector,
  qoutesList: getQoutesSelector,
  featureModuleData: getFeatureModuleDataSelector,
  myProfileDetails: getMyProfileDetailsSelector,
  notificationPayload: notificationPayloadSelector,
  pendingAcknowledgementData: getPendingAcknowledgementDataSelector,
  acknowledgeData: getAcknowledgeDataSelector,
});

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {
    myProfileData,
    isDarkMode,
    wishesDataList,
    qoutesList,
    featureModuleData,
    myProfileDetails,
    notificationPayload,
    pendingAcknowledgementData,
    acknowledgeData,
  } = useSelector(stateSelector);

  const [approvalRequestModal, setApprovalRequestModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [useFulModal, setUseFulModal] = useState(false);
  const [isShowComingSoonModal, setisShowComingSoonModal] = useState(false);
  const [isShowDontAccessModal, setisShowDontAccessModal] = useState(false);
  const [isShowBotPressModal, setIsShowBotPressModal] = useState(false);
  const [birthdayWishesModalInfo, setBirthdayWishesModalInfo] = useState({
    isVisible: false,
    usedFor: "",
    name: "",
  });

  const [workAnniversaryWishesModalInfo, setWorkAnniversaryWishesModalInfo] =
    useState({
      isVisible: false,
      usedFor: "",
      name: "",
    });

  const [isChatButtonVisible, setIsChatButtonVisible] = useState(false);
  const [isVisibleQuotes, setIsVisibleQuotes] = useState(false);
  const [qouteList, setQouteList] = useState([]);
  const [pendingSurveyList, setPendingSurveyList] = useState([]);
  const [pendingDocumentList, setPendingDocumentList] = useState([]);
  const [pendingComponentDetails, setPendingComponentDetails] = useState({});
  const [selectedSurveyInfo, setSelectedSurveyInfo] = useState({});

  useEffect(() => {
    if (!isEmpty(notificationPayload)) {
      let payload = notificationPayload?.payload;

      dispatch(markReadNotification.trigger({ id: payload?.externalId }));

      if (payload.action === "open_module_details" && !payload.foreground) {
        // clean state for notificationPayload
        dispatch(setNotificationPayload.trigger({}));

        if (payload.featureModule?.indexOf(SERVICEREQUEST_APPROVALS) === 0) {
          if (payload.externalId) {
            navigation.navigate(NavigationRouteNames.APPROVALS_DETAILS, {
              approvalItem: payload,
              module: "",
              fromNotification: true,
              isButtonDisable: false,
            });
          }
        } else if (
          payload.featureModule === CONFIG_CONSTANT?.CORPORATE_COMMUNICATION
        ) {
          if (payload.externalId) {
            navigation.navigate(
              NavigationRouteNames.CORPORATECOMMUNICATIONDETAILS,
              {
                id: payload.externalId,
              }
            );
          }
        } else if (payload.featureModule === CONFIG_CONSTANT?.OFFERS) {
          if (payload.externalId) {
            navigation.navigate(NavigationRouteNames.CLIENTBENEFITSDETAILS, {
              id: payload.externalId,
            });
          }
        } else if (payload.featureModule === CONFIG_CONSTANT?.EVENTS) {
          if (payload.externalId) {
            navigation.navigate(NavigationRouteNames.EVENT_DETAILS as never, {
              id: payload.externalId,
            });
          }
        } else if (payload.featureModule === CONFIG_CONSTANT?.SURVEYS) {
          if (payload.externalId) {
            const findedItem = pendingSurveyList?.find(
              (item) => item?.id === payload.externalId
            );
            !isEmpty(findedItem) && openSurveyModal(findedItem);
          }
        } else if (payload.featureModule === CONFIG_CONSTANT?.DOCUMENTS) {
          if (payload.externalId) {
            navigation.navigate(NavigationRouteNames.DOCUMENT_VIEW as never, {
              id: payload.externalId,
            });
          }
        } else if (payload.featureModule === CONFIG_CONSTANT?.KNOWLEDGE_HUB) {
          if (payload.externalId) {
            navigation.navigate(
              NavigationRouteNames.KNOWLEDGEHUB_DETAILS as never,
              {
                externalId: payload.externalId,
              }
            );
          }
        } else if (payload.featureModule === CONFIG_CONSTANT?.SEND_WISHES) {
          if (!isEmpty(payload?.additionalInfo)) {
            const { type, username } = payload?.additionalInfo || {};
            navigation.navigate(NavigationRouteNames.SENDWISHES as never, {
              type,
              username,
            });
          }
        }
      }
    }
  }, [notificationPayload]);

  useEffect(() => {
    const getTenantLoginToken = async () => {
      const user = await getSaveData(LOCAL_STORAGE_DATA_KEY?.USER_INFO);
    //   dispatch(getTenantLogin.trigger({ email: JSON.parse(user || "{}")?.username }));
    dispatch(getTenantLogin.trigger({email : "app.tester@cenomi.com"}));
    };
    if (isFocused) {
      dispatch(getSendWishesInfo.trigger());
      dispatch(getOrganizationConfig.trigger());
      dispatch(getQoutes.trigger());
      dispatch(getPendingAcknowledgement.trigger());
      getTenantLoginToken();

      const jailBreakStatus = jailBreak();
      if (jailBreakStatus) {
        alertBox(
          localize("common.jailBrokenDeviceDetected"),
          localize("common.jailBrokenWarningMsg"),
          {
            positiveText: localize("common.ok"),
            cancelable: true,
            onPositiveClick: () => RNExitApp.exitApp(),
          }
        );
      }

      setTimeout(() => {
        setIsChatButtonVisible(
          getUserConfigData(
            myProfileData?.config?.config,
            CONFIG_CONSTANT?.CHAT_GPT,
            featureModuleData
          )
        );
        if (myProfileData?.organization?.id) {
          const topicName = `TOPIC_ORG_${myProfileData?.organization?.id?.toString()}`;
          messaging()
            .subscribeToTopic(topicName)
            .then(() => console.log("Subscribed to topic:", topicName))
            .catch((e) => {
              console.log(e);
            });

          const topicName1 = `TOPIC_DEPT_${urlSlugify(
            myProfileData?.profile?.departmentName
          )?.toUpperCase()}`;

          messaging()
            .subscribeToTopic(topicName1)
            .then(() => console.log("Subscribed to topic:", topicName1))
            .catch((e) => {
              console.log(e);
            });
        }
      }, 7000);
    }
  }, [isFocused]);

  useEffect(() => {
    getSaveData(LOCAL_STORAGE_DATA_KEY.QUOTES_READED_DATA).then((item) => {
      const allSavedData = JSON.parse(item || `{}`);
      let lastViewedDatetime = allSavedData?.[myProfileDetails?.username];
      const sortedData = qoutesList?.slice()?.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      const filteredData = lastViewedDatetime
        ? sortedData?.filter((item) => {
            if (!item?.quote) {
              return;
            }
            if (new Date(item?.createdAt) > new Date(lastViewedDatetime)) {
              return item;
            }
          })
        : sortedData?.filter((item) => {
            if (!item?.quote) {
              return;
            }
            return true;
          });

      const slicedData = filteredData.slice(0, 4) || [];
      setQouteList(slicedData || []);
      const isActiveQoutes = getUserConfigData(
        myProfileDetails?.config?.config,
        CONFIG_CONSTANT?.QUOTES,
        featureModuleData
      );

      setIsVisibleQuotes((isActiveQoutes && slicedData?.length > 0) || false);
    });
  }, [qoutesList]);

  useEffect(() => {
    if (
      wishesDataList !== undefined &&
      !isEmpty(wishesDataList) &&
      !isEmpty(myProfileData)
    ) {
      const selfUserName = myProfileData?.username;

      const birthdayData = wishesDataList?.dob?.find(
        (item) => item?.username === selfUserName
      );
      if (
        !isEmpty(birthdayData) &&
        getIsMatchedCurrentDate(birthdayData?.date_of_birth)
      ) {
        getSaveData(LOCAL_STORAGE_DATA_KEY.IS_SHOW_BIRTHDAY_WISHES_MODAL).then(
          (item) => {
            const isShown = JSON.parse(item || "false");

            if (!isShown) {
              setBirthdayWishesModalInfo({
                isVisible: true,
                usedFor: wisheshForEnum.SELFBIRTHDAY,
                name: myProfileData?.displayName,
              });
            }
          }
        );
      }

      const anniversaryData = wishesDataList?.workAnniversaryQuery?.find(
        (item) => item?.username === selfUserName
      );
      if (
        !isEmpty(anniversaryData) &&
        getIsMatchedCurrentDate(
          anniversaryData?.work_relationships[0]?.startDate
        ) &&
        moment(anniversaryData?.work_relationships[0]?.startDate)?.format(
          "YYYY"
        ) != moment().format("YYYY")
      ) {
        const { work_relationships } = anniversaryData || {};
        const joiningDate =
          work_relationships?.length > 0
            ? moment(work_relationships[0]?.startDate, "YYYY-MM-DD")
            : moment();
        const currentDate = moment(moment(), "YYYY-MM-DD");
        const diffDate = currentDate.diff(joiningDate, "years");

        getSaveData(
          LOCAL_STORAGE_DATA_KEY.IS_SHOW_WORKANNIVERSARY_WISHES_MODAL
        ).then((item) => {
          const isShown = JSON.parse(item || "false");

          if (!isShown) {
            setWorkAnniversaryWishesModalInfo({
              isVisible: true,
              usedFor: wisheshForEnum.SELFANNIVERSARY,
              data: [
                {
                  name: myProfileData?.displayName,
                  workPeriod: diffDate,
                },
              ],
            });
          }
        });
      }
    }
  }, [wishesDataList]);

  useEffect(() => {
    if (myProfileData?.onboarded === false) {
      navigation.navigate(NavigationRouteNames.SYNC_PROFILE as never, {
        firstTime: true,
      });
    }
  }, [myProfileData]);

  useEffect(() => {
    if (!isEmpty(pendingAcknowledgementData)) {
      const { events, surveys, documents } = pendingAcknowledgementData || {};
      if (
        events?.length > 0 &&
        getUserConfigData(
          myProfileDetails?.config?.config,
          CONFIG_CONSTANT?.EVENTS,
          featureModuleData
        )
      ) {
        setPendingComponentDetails({
          ...events[0],
          icon: events[0]?.icon?.url
            ? isValidUrl(events[0]?.icon?.url, true)
            : Images.eventAcknowledge,
          isFor: CONFIG_CONSTANT.EVENTS,
        });
      }
      if (
        surveys?.length > 0 &&
        getUserConfigData(
          myProfileDetails?.config?.config,
          CONFIG_CONSTANT?.SURVEYS,
          featureModuleData
        ) &&
        isEmailIncluded({
          myProfileData,
          targetedEmails: surveys[0].targetedEmails,
        })
      ) {
        setPendingSurveyList(surveys || []);
        if (events?.length === 0) {
          setPendingComponentDetails({
            ...surveys[0],
            icon: Images.surveyAcknowledge,
            isFor: CONFIG_CONSTANT.SURVEYS,
          });
        }
      } else if (
        documents?.length > 0 &&
        getUserConfigData(
          myProfileDetails?.config?.config,
          CONFIG_CONSTANT?.DOCUMENTS,
          featureModuleData
        )
      ) {
        setPendingDocumentList(documents || []);
        setPendingComponentDetails({
          ...documents[0],
          icon: Images.documentAcknowledge,
          isFor: CONFIG_CONSTANT.DOCUMENTS,
        });
      }
      //  else {
      //   setPendingComponentDetails({});
      //   setPendingSurveyList([]);
      //   setPendingDocumentList([]);
      // }

      // setPendingSurveyList(surveys || []);
      // setPendingDocumentList(documents || []);
    } else {
      setPendingComponentDetails({});
      setPendingSurveyList([]);
      setPendingDocumentList([]);
    }
  }, [pendingAcknowledgementData]);

  useEffect(() => {
    const sub = onSurveyResponseListener.addListener("onSurveyResponse", () => {
      if (selectedSurveyInfo?.id) {
        const info = {
          featureId: selectedSurveyInfo?.id,
          featureModule: CONFIG_CONSTANT?.SURVEYS,
          metadata: {},
        };
        setSelectedSurveyInfo({});
        dispatch(submitAcknowledge.trigger({ data: info }));
      }
    });
    return () => sub.remove();
  }, [selectedSurveyInfo]);

  useEffect(() => {
    if (!isEmpty(acknowledgeData) && isFocused) {
      dispatch(getPendingAcknowledgement.trigger());
    }
  }, [acknowledgeData]);

  const redirectToApprovalListing = (item) => {
    setApprovalRequestModal(false);
    const actions = checkFusionActionsApproval();
    navigation.navigate(NavigationRouteNames.APPROVALS_LISTING, {
      module: item,
      approvalType: item?.feature || selectedItem?.feature,
      redirectToExternalUrl: selectedItem?.redirectToExternalUrl,
    });
  };

  const handleClick = (item) => {
    try {
      trackEvent(EVENT_NAME.PRESSED_APPROVALS_FROM_HOME);
      trackEvent(EVENT_NAME.PRESSED_APPROVALS_ + item?.name);
      if (item?.isLive) {
        if (!isEmpty(item.subModules)) {
          setSelectedItem(item);
          setApprovalRequestModal(true);
        } else if (item?.name === "IT") {
          setisShowDontAccessModal(true);
        } else {
          redirectToApprovalListing(item);
        }
      } else {
        setisShowComingSoonModal(true);
      }
    } catch (error) {
      // handleError(error);
    }
  };

  const handleOnRequestCloseQoutes = () => {
    setIsVisibleQuotes(false);
  };

  const handleOnPressPendingItem = (data) => {
    if (data?.isFor === CONFIG_CONSTANT.EVENTS) {
      if (data?.sendOnListingPage) {
        navigation.navigate(NavigationRouteNames.EVENT_LIST as never);
      } else {
        navigation.navigate(NavigationRouteNames.EVENT_DETAILS as never, {
          id: data?.id,
        });
      }
    }

    if (data?.isFor === CONFIG_CONSTANT.DOCUMENTS) {
      navigation.navigate(NavigationRouteNames.DOCUMENTS as never, {
        isShowBackButton: true,
      });
    }

    if (data?.isFor === CONFIG_CONSTANT.SURVEYS) {
      openSurveyModal(data);
    }
  };

  const handleOnPressPendingSurveyModal = (data) => {
    openSurveyModal(data);
  };

  const openSurveyModal = (data) => {
    setSelectedSurveyInfo(data);
    invokeSurveySparrow({
      domain: "feedback.cenomirewards.com",
      token: data?.token,
      surveyType: "classic",
    });
  };

  const renderItemList = () => {
    return (
      <>
        <View
          style={{
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.transparent,
          }}
        >
          <CorporateCommunication />

          {!isEmpty(pendingComponentDetails) ? (
            <PendingItemsComponents
              item={pendingComponentDetails}
              onPressOnItem={handleOnPressPendingItem}
            />
          ) : null}

          <ApprovalsSection handleClick={(item) => handleClick(item)} />

          <ServiceRequestsSection />

          <BenefitsSection />

          <UseFulApps
            source={"homepage"}
            onClickSeeAll={() => {
              trackEvent(EVENT_NAME.PRESSED_USEFUL_APPS_SEEALL_FROM_HOME);
              setUseFulModal(true);
            }}
          />

          <KnowledgeHUBSection />
        </View>
      </>
    );
  };

  return (
    <WrapperContainer isHideExtraPadding={true}>
      <HomeMainHeader profileData={myProfileData?.profile} />

      <FlatList
        data={[""]}
        keyExtractor={(_, index) => index?.toString()}
        renderItem={renderItemList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: isDarkMode
            ? Colors.darkModeBackground
            : Colors.transparent,
          // paddingBottom: Platform.OS === 'ios' ? RfH(110) : RfH(80)
        }}
      />

      {/* {isChatButtonVisible && (
        <FloatingButton
          image={Images.chatIcon}
          buttonOnClick={() => {
            // navigation.navigate(NavigationRouteNames.BOT_PRESS as never);
            setIsShowBotPressModal(true);
            dispatch(setIsChatWindowVisible.trigger(true));
          }}
        />
      )} */}

      {isShowBotPressModal && (
        <BotPress
          modalVisible={isShowBotPressModal}
          backButtonHandler={() => {
            setIsShowBotPressModal(false);
            dispatch(setIsChatWindowVisible.trigger(false));
          }}
        />
      )}

      {approvalRequestModal && (
        <ApprovalRequestModal
          isVisible={approvalRequestModal}
          onRequestClose={() => setApprovalRequestModal(false)}
          module={selectedItem}
          onClick={(item) => redirectToApprovalListing(item)}
        />
      )}
      {useFulModal && (
        <UseFulModal
          isDarkMode={isDarkMode}
          isVisible={useFulModal}
          title={localize("home.UsefulApps")}
          onRequestClose={() => setUseFulModal(false)}
        />
      )}

      {isShowComingSoonModal && (
        <CustomPopupModal
          isVisible={isShowComingSoonModal}
          messageInfo={{
            title: localize("common.ComingSoon"),
            description: "",
          }}
          pressedPopupButton={() => setisShowComingSoonModal(false)}
          buttonText={localize("common.okay")}
        />
      )}

      {isShowDontAccessModal && (
        <YouDontHaveAccessModal
          isVisible={isShowDontAccessModal}
          onRequestClose={() => setisShowDontAccessModal(false)}
        />
      )}

      {birthdayWishesModalInfo?.isVisible ? (
        <CustomWishesModal
          modalInfo={birthdayWishesModalInfo}
          onRequestClose={() => {
            if (
              birthdayWishesModalInfo?.usedFor === wisheshForEnum.SELFBIRTHDAY
            ) {
              storeData(
                LOCAL_STORAGE_DATA_KEY.IS_SHOW_BIRTHDAY_WISHES_MODAL,
                JSON.stringify("true")
              );
            }
            if (
              birthdayWishesModalInfo?.usedFor ===
              wisheshForEnum.SELFANNIVERSARY
            ) {
              storeData(
                LOCAL_STORAGE_DATA_KEY.IS_SHOW_WORKANNIVERSARY_WISHES_MODAL,
                JSON.stringify("true")
              );
            }
            setBirthdayWishesModalInfo({
              isVisible: false,
              usedFor: "",
              name: "",
            });
          }}
        />
      ) : null}

      {workAnniversaryWishesModalInfo?.isVisible ? (
        <CustomWishesModal
          modalInfo={workAnniversaryWishesModalInfo}
          onRequestClose={() => {
            if (
              workAnniversaryWishesModalInfo?.usedFor ===
              wisheshForEnum.SELFBIRTHDAY
            ) {
              storeData(
                LOCAL_STORAGE_DATA_KEY.IS_SHOW_BIRTHDAY_WISHES_MODAL,
                JSON.stringify("true")
              );
            }
            if (
              workAnniversaryWishesModalInfo?.usedFor ===
              wisheshForEnum.SELFANNIVERSARY
            ) {
              storeData(
                LOCAL_STORAGE_DATA_KEY.IS_SHOW_WORKANNIVERSARY_WISHES_MODAL,
                JSON.stringify("true")
              );
            }
            setWorkAnniversaryWishesModalInfo({
              isVisible: false,
              usedFor: "",
              name: "",
            });
          }}
        />
      ) : null}

      {isVisibleQuotes && qouteList?.length > 0 ? (
        <Quotes
          item={qouteList[0] || []}
          isVisible={isVisibleQuotes}
          onRequestClose={handleOnRequestCloseQoutes}
          isDarkMode={isDarkMode}
        />
      ) : null}

      {pendingDocumentList?.length > 0 ? (
        <PendingDocumentModal
          list={pendingDocumentList || []}
          isVisible={pendingDocumentList?.length > 0}
          onRequestClose={() => setPendingDocumentList([])}
          isDarkMode={isDarkMode}
        />
      ) : null}

      {pendingSurveyList?.length > 0 ? (
        <PendingSurveyModal
          item={pendingSurveyList[0] || {}}
          isVisible={pendingSurveyList?.length > 0}
          onRequestClose={() => setPendingSurveyList([])}
          isDarkMode={isDarkMode}
          onPressItem={handleOnPressPendingSurveyModal}
        />
      ) : null}

      {/* <TopKudosEarnerModal isVisible={true} onRequestClose={() => {}} /> */}
    </WrapperContainer>
  );
};

export default Home;
