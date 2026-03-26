
import { useState } from 'react';

export const useReviewDialogs = ({ onPublish, onReject, onDelete }) => {


  const [detailReview, setDetailReview] = useState(null);

  const openDetail  = (review) => setDetailReview(review);
  const closeDetail = ()       => setDetailReview(null);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false, variant: 'delete', review: null,
  });

  const openConfirm  = (variant, review) => setConfirmDialog({ open: true, variant, review });
  const closeConfirm = ()                => setConfirmDialog({ open: false, variant: 'delete', review: null });

  const [statusReview, setStatusReview] = useState(null);

  const handleConfirmAction = async (review, message) => {
    if (confirmDialog.variant === 'publish')      await onPublish(review.id, message);
    else if (confirmDialog.variant === 'reject')  await onReject(review.id, message);
    
    closeDetail();
    closeConfirm();
  };

  return {

    detailReview,
    openDetail,
    closeDetail,
  
    confirmDialog,
    openConfirm,
    closeConfirm,
    handleConfirmAction,

    // Status Dialog
    statusDialog: {
      open: !!statusReview,
      review: statusReview,
    },
    openStatusDialog: (review) => setStatusReview(review),
    closeStatusDialog: ()        => setStatusReview(null),
  };
};
