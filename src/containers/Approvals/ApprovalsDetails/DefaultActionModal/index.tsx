import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import {
  CustomText,
  IconButtonWrapper,
  NameWrapper,
} from "../../../../components";
import AppPrimaryButton from "../../../../components/AppPrimaryButton";
import SearchComponent from "../../../../components/SearchComponent";
import { Colors, CommonStyles, Images } from "../../../../theme";
import { RfH, RfW, alertBox, deviceHeight } from "../../../../utils/helpers";
import { getName, isDealWorkflowModuleCheck } from "../../serializer";
import styles from "./styles";
// import ThemeContext from '../../../../appContainer/theme.context';
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import COLORS from "../../../../theme/colors";
import { BorderRadius } from "../../../../theme/sizes";
import { getUserSearchList, getWorkflowUserList } from "../../redux/actions";
import {
  getUserSearchListSelector,
  getWorkflowUserListSelector,
} from "../../redux/selectors";
import CustomEditComment from "../../../../components/CustomEditComment";
import { isRTL, localize } from "../../../../locale/utils";
import { getColorWithOpacity } from "../../../../utils/helper";
import CustomBottomSheet from "../../../../components/CustomBottomSheet";

const stateSelector = createStructuredSelector({
  userSearchListData: getUserSearchListSelector,
  workflowUserListData: getWorkflowUserListSelector,
});

function DefaultActionModal(props) {
  const [commentValue, setCommentValue] = useState("");
  const {
    taskItem,
    isVisible,
    onClose,
    onActionClick,
    actionModule,
    isDarkMode,
  } = props;
  const [isSelectUser, setSelectUser] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectUserInfo, setSelectUserInfo] = useState(taskItem);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();
  const { userSearchListData, workflowUserListData } =
    useSelector(stateSelector);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    if (actionModule?.module === "workflow") {
      dispatch(getWorkflowUserList());
    }
  }, [actionModule]);

  useEffect(() => {}, [userSearchListData?.data]);

  const onChangeTextComment = (value) => {
    if (value.length > 400) {
      alertBox(
        "Character limit exceeded",
        "The maximum character you can enter here is 400."
      );
      return;
    }
    setCommentValue(value);
  };

  const onChangeUser = () => {
    setSelectUserInfo({});
    setSelectUser(false);
  };

  const onUserSelect = (item) => {
    setSelectUserInfo(item);
    setSelectUser(true);
    setSearchKeyword("");
  };

  const updateSearch = (text) => {
    try {
      if (
        !isEmpty(text) &&
        text.length > 0 &&
        actionModule?.module !== "workflow"
      ) {
        dispatch(
          getUserSearchList.trigger({
            autoComplete: true,
            name: text,
          })
        );
      }
      setSearchKeyword(text);
    } catch (error) {
      // handleError(error);
    }
  };
  "".toLocaleLowerCase;
  const formatUserData = () => {
    if (actionModule?.module === "workflow") {
      return workflowUserListData
        ?.filter(({ fullName, email }) => {
          const lowerSearch = searchKeyword?.toLocaleLowerCase();
          if (searchKeyword.length > 0) {
            return (
              fullName?.toLocaleLowerCase()?.includes(lowerSearch) ||
              email?.toLocaleLowerCase()?.includes(searchKeyword)
            );
          }
          return true;
        })
        ?.map(({ fullName, email }, ind) => ({
          username: email,
          displayName: fullName,
          id: ind,
        }));
    }
    return searchKeyword.length > 0 ? userSearchListData?.data?.results : [];
  };

  const onSubmit = () => {
    try {
      if (actionModule.isCommentRequired && isEmpty(commentValue)) {
        alertBox("", localize("approvals.commentRequired"));
        return;
      }
      onActionClick({
        ...actionModule,
        comment: commentValue,
        user: selectUserInfo,
      });
      setCommentValue("");
      // setSelectUserInfo({});
    } catch (error) {
      // handleError(error);
    }
  };

  const approverSection = () => {
    return (
      <>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginBottom: RfH(8),
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              onChangeUser();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CustomText
              fontSize={14}
              color={Colors.white}
              styling={CommonStyles.regularFont400Style}
            >
              {actionModule.approverSectionText}
            </CustomText>
            <IconButtonWrapper
              iconImage={isRTL() ? Images.arrowLeft : Images.arrowRight}
              iconWidth={RfW(8)}
              iconHeight={RfH(14)}
              imageResizeMode={"contain"}
              styling={{ marginLeft: RfW(7), tintColor: Colors.white }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: RfH(64),
            paddingLeft: RfW(10),
            paddingVertical: RfH(8),
            borderRadius: BorderRadius.BR10,
            backgroundColor: isDarkMode
              ? Colors.darkModeButton
              : getColorWithOpacity(Colors.blueBayoux, 0.37),
          }}
        >
          <NameWrapper
            width={RfW(48)}
            height={RfH(48)}
            fontSize={16}
            name={getName(selectUserInfo)}
            backgroundColor={Colors.grayBorder}
            textStyle={{
              ...CommonStyles.mediumFontStyle,
              color: Colors.app_black,
            }}
          />
          <View>
            {/* {!isEmpty(selectUserInfo.name) &&
                    selectUserInfo.name !== 'NULL' && (
                      <CustomText
                        fontSize={15}
                        color={isDarkMode ? Colors.white : Colors.blackFive}
                        fontWeight={'bold'}
                        styling={{
                          marginHorizontal: RfW(8),
                          ...CommonStyles.boldFontStyle,
                        }}>
                        {selectUserInfo?.name}
                      </CustomText>
                    )} */}
            <CustomText
              fontSize={16}
              color={isDarkMode ? Colors.white : Colors.white}
              styling={{
                marginHorizontal: RfW(8),
                ...CommonStyles.regularFont400Style,
              }}
            >
              {getName(selectUserInfo)}
            </CustomText>
          </View>
        </View>
      </>
    );
  };

  const modalHeader = () => (
    <View
      style={[
        styles.header,
        {
          backgroundColor: isDarkMode
            ? Colors.darkModeBackground
            : Colors.modalForegroundColor,
        },
      ]}
    >
      <View
        style={{
          width: RfW(50),
          height: RfH(5),
          alignSelf: "center",
          borderRadius: BorderRadius.BR0,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: RfH(25),
        }}
      >
        <CustomText
          color={isDarkMode ? Colors.white : Colors.white}
          fontSize={20}
          styling={CommonStyles.mediumFontStyle}
        >
          {actionModule?.label}
        </CustomText>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onClose}
          style={{ marginRight: RfW(-12), padding: RfH(12) }}
        >
          <IconButtonWrapper
            iconWidth={RfH(18)}
            iconHeight={RfH(18)}
            iconImage={isDarkMode ? Images.crossWhite : Images.crossWhite}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = (item) => (
    <TouchableOpacity
      style={{
        alignItems: "center",
        paddingVertical: RfH(22),
        borderBottomWidth: RfH(1),
        borderBottomColor: isDarkMode
          ? Colors.darkModeBorder
          : Colors.grayBorder,
        flexDirection: "row",
      }}
      activeOpacity={0.4}
      onPress={() => onUserSelect(item)}
    >
      <NameWrapper
        width={RfW(28)}
        height={RfH(28)}
        fontSize={13}
        name={item.displayName}
        backgroundColor={Colors.grayBorder}
        textStyle={{ ...CommonStyles.mediumFontStyle, color: Colors.app_black }}
      />

      <View
        style={{
          marginLeft: RfW(8),
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "90%" }}>
          {/* {item.name !== 'NULL' && (
            <CustomText
              fontSize={15}
              color={isDarkMode ? Colors.white : Colors.primaryBlack}
              fontWeight={'bold'}
              styling={{...CommonStyles.semiboldFontStyle}}>
              {item.name}
            </CustomText>
          )} */}
          <CustomText
            fontSize={16}
            color={isDarkMode ? Colors.white : Colors.white}
            styling={{ marginTop: RfH(2), ...CommonStyles.regularFont400Style }}
          >
            {item.displayName}
          </CustomText>
        </View>
        <IconButtonWrapper
          iconImage={
            isDarkMode ? Images.arrowRightWhite : Images.arrowRightWhite
          }
          iconWidth={RfW(15)}
          iconHeight={RfH(15)}
          imageResizeMode={"contain"}
        />
      </View>
    </TouchableOpacity>
  );

  const mainView = () => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={[
          !isSelectUser
            ? { ...styles.innerView, top: RfH(100) }
            : styles.innerView,
          {
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.transparent,
          },
        ]}
      >
        {modalHeader()}
        <View
          style={{
            flex: 1,
            backgroundColor: isDarkMode
              ? Colors.darkModeBackground
              : Colors.modalForegroundColor,
          }}
        >
          {!isSelectUser ? (
            <>
              <SearchComponent
                placeholder="Search"
                value={searchKeyword}
                onChangeText={(search) => updateSearch(search)}
                styling={{
                  backgroundColor: isDarkMode
                    ? Colors.darkModeDisabledColor
                    : getColorWithOpacity(Colors.white, 0.24),
                }}
                keyboardType={"default"}
              />
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: RfW(24),
                }}
              >
                <FlatList
                  data={formatUserData()}
                  renderItem={({ item }) => renderItem(item)}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  style={{
                    minHeight: RfH(250),
                    maxHeight: deviceHeight() - deviceHeight() / 3,
                  }}
                  ListFooterComponent={() => (
                    <View
                      style={{
                        height:
                          isKeyboardVisible && Platform.OS === "ios"
                            ? RfH(320)
                            : RfH(50),
                      }}
                    />
                  )}
                />
              </View>
            </>
          ) : (
            <View style={{ flex: 1 }}>
              <View
                style={{
                  marginTop: RfH(15),
                  marginBottom: RfH(60),
                }}
              >
                <View style={{ paddingHorizontal: RfW(24) }}>
                  {actionModule.showApproverSection ? approverSection() : null}
                </View>

                <View style={{}}>
                  <CustomEditComment
                    usedForLeaveForm={false}
                    label={
                      actionModule.isCommentRequired
                        ? localize("common.comments")
                        : localize("common.commentsOptional")
                    }
                    placeholder={localize("leave.typeYourComments")}
                    onCommentChange={onChangeTextComment}
                    // backgroundColor={isDarkMode ? Colors.transparent : Colors.white}
                  />
                </View>
              </View>

              <View
                style={{
                  justifyContent: "flex-end",
                  paddingHorizontal: RfW(24),
                  paddingTop: RfH(10),
                  paddingBottom: RfH(40),
                  backgroundColor: isDarkMode
                    ? Colors.darkModeBackground
                    : Colors.transparent,
                }}
              >
                <AppPrimaryButton
                  onPress={() => onSubmit()}
                  buttonText={actionModule?.buttonText?.toUpperCase()}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {!isSelectUser ? (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>{mainView()}</View>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.select({ android: "height", ios: "padding" })}
          enabled
        >
          <View style={styles.container}>{mainView()}</View>
        </KeyboardAvoidingView>
      )}
    </Modal>
  );
}

DefaultActionModal.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onActionClick: PropTypes.func,
  actionModule: PropTypes.object,
  userList: PropTypes.array,
  taskItem: PropTypes.object,
  isDarkMode: PropTypes.bool,
};
DefaultActionModal.defaultProps = {
  isVisible: false,
  onClose: null,
  onActionClick: null,
  actionModule: {},
  userList: [],
  isDarkMode: false,
};
export default DefaultActionModal;
