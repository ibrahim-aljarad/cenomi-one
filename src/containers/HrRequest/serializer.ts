import { isArray, isEmpty } from 'lodash';

export const searchOriginalApprovalList = (data: any) => {
  let finalArray: any[] = [];
  try {
    if (data && data !== 'NULL') {
      const approvalsData = isArray(data) ? data : [data];
      const enabledApprovalList = approvalsData.filter((item) => item.enabled);
      for (let i = 0; i < enabledApprovalList.length; i++) {
        const module = enabledApprovalList[i];
        const submoduleArray = module.subModule;
        finalArray = finalArray.concat(submoduleArray);
      }
      return finalArray.sort((a, b) => b.badgeCount - a.badgeCount);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getOptionValues = (field, list) => {
  let data = [];
  if (list && list?.length > 0) {
    const findedItem = list?.find((item) => item?.field === field);
    if (!isEmpty(findedItem)) {
      data =
        findedItem?.values?.length > 0
          ? findedItem?.values?.map((fi) => ({
              label: fi,
              value: fi
            }))
          : [];
    }
  }

  return data;
};

export const startEndDateDuration = [
  {
    label: '1',
    value: 1
  },
  {
    label: '2',
    value: 2
  },
  {
    label: '3',
    value: 3
  },
  {
    label: '4',
    value: 4
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '6',
    value: 6
  },
  {
    label: '7',
    value: 7
  },
  {
    label: '8',
    value: 8
  }
];

export const isAttachmentCompulsory = (absenceType) => {
  let flag = false;
  switch (absenceType) {
    case 'Bereavement Leave':
    case 'Exam Leave':
    case 'Haj Leave':
    case 'Marriage Leave':
    case 'Paternity Leave':
    case 'Maternity Leave':
    case 'Sick Leave':
      flag = true;
      break;

    default:
      flag = false;
      break;
  }

  return flag;
};

export const isHolidaySkip = (absenceType) => {
  let flag = false;
  switch (absenceType) {
    case 'Business Leave':
    case 'Unpaid Leave':
      flag = true;
      break;

    default:
      flag = false;
      break;
  }

  return flag;
};

export const isHideAttachments = (absenceType) => {
  let flag = false;
  switch (absenceType) {
    case 'Annual Leave':
    case 'ACC Annual Leave':
    case 'ACC Half Day Leave':
    case 'Authorized Unpaid Leave':
    case 'Business Leave':
    case 'Business Mission':
    case 'Excuse Leave':
    case 'Half Day':
    case 'Half Day Leave.':
    case 'Half Day Leave':
    case 'Weekend Vacation':
    case 'KSA Compensatory Time Off':
    case 'KSA Annual Vacation Leave Calendar Days':
      flag = true;
      break;

    default:
      flag = false;
      break;
  }

  return flag;
};

export const isHideComments = (absenceType) => {
  let flag = false;
  switch (absenceType) {
    case 'Sick Leave':
      flag = true;
      break;

    default:
      flag = false;
      break;
  }

  return flag;
};

export const holidays = ['Friday', 'Saturday'];

// export const deductionsCategoryName = ['Voluntary Deductions', 'Absences'];
// export const earningsCategoryName = ['Earnings', 'Absences'];
// export const absencesCategoryName = ['Absences', 'Absences'];
export const deductionsCategoryName = ['Voluntary Deductions'];
export const earningsCategoryName = ['Earnings'];

export const getStartTimeEndTime = (absenceType) => {
  let startTimeEndTime = { startTime: '00:00', endTime: '00:00' };

  switch (absenceType) {
    case 'Annual Leave':
      startTimeEndTime = { startTime: '08:00', endTime: '18:00' };
      break;
    case 'Sick Leave':
      startTimeEndTime = { startTime: '08:00', endTime: '18:00' };
      break;
    default:
      break;
  }

  return startTimeEndTime;
};
