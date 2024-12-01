import produce from "immer";

import {
  filePreview,
  fileUpload,
  getPublicStaticData,
  getSendWishesInfo,
  getStaticData,
  markOnboarded,
  setColorTheme,
  syncProfile,
  updateMarkOnboardedFlag,
  updateSyncProfileFlag,
  setIsChatWindowVisible,
  getOrganizationConfig,
  getNewsList,
  getGreetingsData,
  tenantFileUpload,
} from "./actions";

export const initialState = {
  fileUploadedData: {},
  filePreviewedData: {},
  syncProfileCompleted: {},
  isMarkOnboarded: false,
  staticData: {},
  publicStaticData: {},

  isDarkMode: false,
  isChatWindowVisible: false,

  wisheshList: undefined,
  organizationConfigData: undefined,
  newsList: undefined,
  greetingsListData: undefined,
  tenantfileUploadedData: {},
};

export default (
  state = initialState,
  action: { type: any; payload: { type: any } }
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case fileUpload.TRIGGER: {
        draft.fileUploadedData = [];
        break;
      }
      case fileUpload.SUCCESS: {
        const { data } = action.payload || {};
        draft.fileUploadedData = data;
        break;
      }

      case filePreview.TRIGGER: {
        draft.filePreviewedData = [];
        break;
      }
      case filePreview.SUCCESS: {
        const { data } = action.payload || {};
        draft.filePreviewedData = data;
        break;
      }

      case syncProfile.TRIGGER: {
        draft.syncProfileCompleted = { isCompleted: false };
        break;
      }
      case syncProfile.SUCCESS: {
        const { data } = action?.payload || {};
        draft.syncProfileCompleted = {
          isCompleted: true,
          statusCode: data?.statusCode,
        };
        break;
      }

      case updateSyncProfileFlag.TRIGGER: {
        draft.syncProfileCompleted = { isCompleted: false };
        break;
      }

      case markOnboarded.TRIGGER: {
        draft.isMarkOnboarded = false;
        break;
      }
      case markOnboarded.SUCCESS: {
        draft.isMarkOnboarded = true;
        break;
      }

      case updateMarkOnboardedFlag.TRIGGER: {
        draft.isMarkOnboarded = false;
        break;
      }

      case getStaticData.TRIGGER: {
        draft.staticData = {};
        break;
      }
      case getStaticData.SUCCESS: {
        const { data } = action?.payload || {};
        draft.staticData = data;
        break;
      }

      case getPublicStaticData.TRIGGER: {
        draft.publicStaticData = {};
        break;
      }
      case getPublicStaticData.SUCCESS: {
        const { data } = action?.payload || {};
        draft.publicStaticData = data;
        break;
      }

      case setColorTheme.TRIGGER: {
        const { theme = null } = action.payload;
        if (theme) {
          draft.isDarkMode = theme === "dark";
        }
        break;
      }

      case getSendWishesInfo.TRIGGER: {
        draft.wisheshList = undefined;
        break;
      }
      case getSendWishesInfo.SUCCESS: {
        const { data } = action?.payload || {};
        draft.wisheshList = data;
        break;
      }
      case getSendWishesInfo.FAILURE: {
        draft.wisheshList = {};
        break;
      }

      case setIsChatWindowVisible.TRIGGER: {
        draft.isChatWindowVisible = action?.payload;
        break;
      }

      case getOrganizationConfig.TRIGGER: {
        draft.organizationConfigData = undefined;
        break;
      }
      case getOrganizationConfig.SUCCESS: {
        const { data } = action?.payload || {};
        draft.organizationConfigData = data;
        break;
      }
      case getOrganizationConfig.FAILURE: {
        draft.organizationConfigData = [];
        break;
      }

      case getNewsList.TRIGGER: {
        draft.newsList = undefined;
        break;
      }
      case getNewsList.SUCCESS: {
        const { data } = action?.payload || {};
        draft.newsList = data;
        break;
      }
      case getNewsList.FAILURE: {
        draft.newsList = [];
        break;
      }

      case getGreetingsData.TRIGGER: {
        draft.greetingsListData = undefined;
        break;
      }
      case getGreetingsData.SUCCESS: {
        const { data } = action?.payload || {};
        draft.greetingsListData = data;
        break;
      }
      case getGreetingsData.FAILURE: {
        draft.greetingsListData = [];
        break;
      }

      case tenantFileUpload.TRIGGER: {
        draft.tenantfileUploadedData = [];
        break;
      }
      case tenantFileUpload.SUCCESS: {
        const { data } = action.payload || {};
        draft.tenantfileUploadedData = data?.data;
        break;
      }

      default:
        break;
    }
  });
