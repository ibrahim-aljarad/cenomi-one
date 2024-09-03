//
import { isEmpty, isArray } from 'lodash';
const getDataForaKey = (data, key) => {
  try {
    const obj = data.find((item) => item['@name'] === key);
    return obj ? obj.TEXT : '';
  } catch (e) {
    handleError(e);
    return '';
  }
};

export const getUserList = (data) => {
  try {
    const dataJson = isArray(data) ? data : [data];
    if (dataJson) {
      return dataJson.map((item) => ({
        name: getDataForaKey(item.Column, 'Full Name'),
        email: getDataForaKey(item.Column, 'EmailId'),
        id: getDataForaKey(item.Column, 'UserId'),
        image: ''
      }));
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

export const getOracleUserList = (data) => {
  const dataJson = isArray(data) ? data : [data];
  try {
    if (dataJson) {
      return dataJson.map((item) => ({
        name: item.Meaning,
        email: item.Lookup_Code,
        id: item.Lookup_Code,
        image: ''
      }));
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

export const getEHGUserList = (data) => {
  const dataJson = isArray(data) ? data : [data];
  try {
    if (dataJson) {
      return dataJson.map((item) => ({
        name: item.FullName,
        email: item.EmailId,
        id: item.UserId,
        image: ''
      }));
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

export const getEHGPRUserList = (data) => {
  const dataJson = isArray(data) ? data : [data];
  try {
    if (dataJson) {
      return dataJson.map((item) => ({
        name: item.userName,
        email: item.email,
        id: item.userID,
        image: ''
      }));
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

const parseAttachemnt = (data) => {
  try {
    let attachments = [];
    if (data && data.includes('TotalAttachments')) {
      const totalAttachments = data.match('<TotalAttachments(.*)/>');
      const totalAttachmentsArray = totalAttachments[0]
        .split('<TotalAttachments')
        .filter((item) => item.trim() !== '');
      attachments = totalAttachmentsArray.map((item) => {
        return {
          fileName: item.match('FileName="(.*)')[1].split('"')[0].trim(),
          fileUrl: item.match('FileURL="(.*)" ')[1],
          filenetId: item.match('FileNetId="(.*)"')[1]?.includes('.')
            ? item.match('FileNetId="(.*)"')[1]?.trim()
            : item
                .match('FileNetId="(.*)"')[1]
                ?.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '')
        };
      });
    }
    return attachments;
  } catch (e) {
    return [];
  }
};

const parseReviewerDirectorList = (data) => {
  try {
    if (data && data?.LeasingDirectorList) {
      const dataJson = isArray(data?.LeasingDirectorList)
        ? data?.LeasingDirectorList
        : [data?.LeasingDirectorList];
      if (dataJson) {
        return dataJson.map((item) => ({
          name: item?.name,
          email: item?.value
        }));
      }
    }
    return [];
  } catch (e) {
    return [];
  }
};

export const approvalsDetailSerializer = (data, approvalType) => {
  try {
    if (data) {
      return {
        processId: data.ProcessId,
        requestId: data.RequestId,
        htmlContent: data.HTMLContent,
        isApprovalPending:
          parseInt(data.IsForwardForInformation) !== 1 && parseInt(data.IsForwardForApproval) !== 0,
        isRFA: parseInt(data.IsForwardForInformation) === 1,
        attachments: parseAttachemnt(data.Attachments),
        isButtonDisable: data?.WorkListStatus ? data.WorkListStatus !== 'Pending' : true,

        leasingDirector: parseReviewerDirectorList(data?.LeasingDirector),
        approvalType: approvalType === 'YARDI' ? data?.ApprovalType : '',
        approvalDesc: data?.ApprovalDesc
      };
    }
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const getYardiUserList = (data) => {
  const dataJson = isArray(data) ? data : [data];
  try {
    if (dataJson) {
      return dataJson.map((item) => ({
        name: item.userName,
        email: item.userEmail,
        id: item.userCode,
        image: ''
      }));
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

const swipeFirstLastName = (fullName) => {
  try {
    const names = fullName.split(',');
    if (names) {
      const lastName = names[0] ? names[0].trim() : '';
      const firstName = names[1] ? names[1].trim() : '';
      const orderedName = firstName + ' ' + lastName;
      return orderedName.trim();
    } else {
      return fullName;
    }
  } catch (error) {
    return fullName;
  }
};

export const getFusionUserList = (data) => {
  const dataJson = isArray(data) ? data : [data];
  try {
    if (dataJson) {
      return dataJson.map((item) => ({
        name: swipeFirstLastName(item.MEANING),
        email: item.LOOKUP_CODE,
        id: item.LOOKUP_CODE,
        image: ''
      }));
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

export const getPMOUserList = (data) => {
  const dataJson = isArray(data) ? data : [data];
  try {
    if (dataJson) {
      return dataJson.map((item) => ({
        name: item?.user_name,
        email: item?.user_email,
        id: item?.user_id,
        image: ''
      }));
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

export const isReviewerDesc = (parseDetailData) => {
  try {
    if (
      parseDetailData &&
      parseDetailData?.approvalType === 'REVIEWER' &&
      (parseDetailData?.approvalDesc === 'Specialty Leasing Lead Approval' ||
        parseDetailData?.approvalDesc === 'Leasing Manager Approval')
    ) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
