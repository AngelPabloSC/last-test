import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from '@/context/SnackbarContext';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { API_CODES } from '@/constants/apiConstants';
import { useDialog } from '@/hooks/useDialog';

export const useGalleryProjectForm = ({ initialData = {}, onSubmit, onStatusChange }) => {
  const isEdit = Boolean(initialData.id);
  const { getFechData } = useFetchDataPromise();
  const { showSnackbar } = useSnackbar();

  const [serviceTypes, setServiceTypes] = useState([]);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const deleteImageDialog = useDialog();
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const response = await getFechData({ endPoint: 'service-types', method: 'GET' });
        if (response?.code === API_CODES.OK) {
          setServiceTypes(response.data?.data || response.data || []);
        }
      } catch {
      }
    };
    fetchServiceTypes();
  }, [getFechData]);

  const backendImages = initialData.images || [];
  const initialCoverIdx = backendImages.findIndex((img) => img.order === 1);

  const formMethods = useForm({
    defaultValues: {
      name: initialData.name || initialData.title || '',
      serviceTypeId: initialData.serviceTypeId || 1,
      status: initialData.status === 'Visible' ? 'Visible' : 'Hidden',
      detailedDesc: initialData.detailedDesc || initialData.about || '',
      location: initialData.location || '',
      year: initialData.year || new Date().getFullYear().toString(),
      client: initialData.client || '',
      totalArea: initialData.totalArea || initialData.area || '',
      images: backendImages,
      coverImageIndex: initialCoverIdx >= 0 ? initialCoverIdx : 0,
      ...initialData,
    },
  });
  const { watch, setValue, trigger, handleSubmit, control, formState: { errors } } = formMethods;
  const formValues = watch();
  const handleUserStatusToggle = (e, newValue) => {
    if (!newValue || newValue === formValues.status) return;
    if (isEdit) {
      setPendingStatus(newValue);
      setIsStatusDialogOpen(true);
    } else {
      setValue('status', newValue);
    }
  };
  const confirmStatusChange = async () => {
    if (onStatusChange && pendingStatus) {
      const success = await onStatusChange(pendingStatus);
      if (success) {
        setValue('status', pendingStatus);
      }
    }
    setIsStatusDialogOpen(false);
  };

  const handlePublishClick = async (e) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      if (!formValues.images || formValues.images.length === 0) {
        showSnackbar('At least one image is required to publish or save.', 'error');
        return;
      }
      setIsPublishDialogOpen(true);
    }
  };

  const handleDraftClick = async () => {
    const isValid = await trigger();
    if (isValid) {
      if (!formValues.images || formValues.images.length === 0) {
        showSnackbar('At least one image is required to publish or save.', 'error');
        return;
      }
      setValue('status', 'Hidden');
      handleSubmit(onSubmit)();
    }
  };

  const confirmPublish = () => {
    setValue('status', 'Visible');
    setIsPublishDialogOpen(false);
    handleSubmit(onSubmit)();
  };

  const confirmImageDelete = async () => {
    const { img, idx } = deleteImageDialog.dialogContent;
    setIsDeletingImage(true);
    try {
      const response = await getFechData({
        endPoint: `projects/images/${img.id}`,
        method: 'DELETE',
      });

      if (response?.code === API_CODES.OK) {
        showSnackbar('Image deleted successfully from gallery', 'success');
        const newImages = [...formValues.images];
        newImages.splice(idx, 1);
        setValue('images', newImages);

        if (formValues.coverImageIndex === idx) {
          setValue('coverImageIndex', 0);
        } else if (formValues.coverImageIndex > idx) {
          setValue('coverImageIndex', formValues.coverImageIndex - 1);
        }
        deleteImageDialog.handleCloseDialog();
      } else {
        showSnackbar(response?.message || 'Error deleting image', 'error');
      }
    } catch (err) {
      showSnackbar(err?.message || 'Error deleting image', 'error');
    } finally {
      setIsDeletingImage(false);
    }
  };

  const handleSetCover = async (idx) => {
    setValue('coverImageIndex', idx);

    if (isEdit && initialData.id) {
      const currentImages = formValues.images || [];
      const existingImages = currentImages.filter((img) => img.id);

      if (existingImages.length > 0) {
        const ordersPayload = [];
        let nextOrder = 2;

        currentImages.forEach((img, i) => {
          if (img.id) {
            if (i === idx) {
              ordersPayload.push({ id: img.id, order: 1 });
            } else {
              ordersPayload.push({ id: img.id, order: nextOrder });
              nextOrder++;
            }
          }
        });

        try {
          const response = await getFechData({
            endPoint: `projects/${initialData.id}/images/reorder`,
            method: 'PUT',
            additionalData: { orders: ordersPayload },
          });

          if (response?.code === API_CODES.OK) {
            showSnackbar('Cover image updated successfully', 'success');
          } else {
            showSnackbar(response?.message || 'Error updating order on server', 'warning');
          }
        } catch (err) {
          showSnackbar(err?.message || 'Error updating order', 'error');
        }
      }
    }
  };

  const handleDeleteImageLocalClick = (img, idx) => {
    if (img.isNew || !img.id) {
      const newImages = [...formValues.images];
      newImages.splice(idx, 1);
      setValue('images', newImages);

      if (formValues.coverImageIndex === idx) {
        setValue('coverImageIndex', 0);
      } else if (formValues.coverImageIndex > idx) {
        setValue('coverImageIndex', formValues.coverImageIndex - 1);
      }
    } else {
      deleteImageDialog.handleOpenDialog({ img, idx });
    }
  };

  const processFiles = (files) => {
    const currentImages = formValues.images || [];
    const remainingSlots = 12 - currentImages.length;

    if (remainingSlots <= 0) return;

    let hasHeavyFile = false;
    const validFiles = Array.from(files)
      .slice(0, remainingSlots)
      .filter((file) => {
        const isImage = ['image/png', 'image/jpeg', 'image/webp'].includes(file.type);
        const isUnderLimit = file.size <= 2 * 1024 * 1024;
        if (!isUnderLimit) hasHeavyFile = true;
        return isImage && isUnderLimit;
      });

    if (hasHeavyFile) {
      showSnackbar('One or more files exceed the 2MB limit and were not uploaded.', 'error');
    }

    const newImageObjects = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isNew: true,
    }));

    if (currentImages.length < 12) {
      setValue('images', [...currentImages, ...newImageObjects].slice(0, 12));
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
  };

  return {
    isEdit,
    formMethods,
    control,
    handleSubmit: formMethods.handleSubmit,
    errors,
    formValues,
    serviceTypes,
    fileInputRef,
    isPublishDialogOpen,
    setIsPublishDialogOpen,
    isStatusDialogOpen,
    setIsStatusDialogOpen,
    pendingStatus,
    deleteImageDialog,
    isDeletingImage,
    handleUserStatusToggle,
    confirmStatusChange,
    handlePublishClick,
    handleDraftClick,
    confirmPublish,
    confirmImageDelete,
    handleSetCover,
    handleDeleteImageLocalClick,
    processFiles,
    onDrop
  };
};
