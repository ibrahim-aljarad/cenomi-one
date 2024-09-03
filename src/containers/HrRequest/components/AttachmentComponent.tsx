import React from 'react';
import CustomEditComment from '../../../components/CustomEditComment';
import { isHideAttachments, isHideComments } from '../serializer';
import CustomAttachmentDocument from '../../../components/CustomAttachmentDocument';

const AttachmentComponent = (props: any) => {
  const { handleDocuments, absenceType } = props || {};
  const isHide = isHideAttachments(absenceType);

  if (isHide) {
    return <></>;
  }

  return <CustomAttachmentDocument handleDocuments={handleDocuments} isHideDivider={true} />;
};

export default AttachmentComponent;
