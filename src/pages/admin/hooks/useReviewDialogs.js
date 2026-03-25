
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

  const handleConfirmAction = async (review) => {
    if (confirmDialog.variant === 'publish')      onPublish(review.id);
    else if (confirmDialog.variant === 'reject')  onReject(review.id);
    else if (confirmDialog.variant === 'delete')  onDelete(review.id);
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
  };
};
