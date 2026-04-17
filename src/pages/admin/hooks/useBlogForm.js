import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from '@/context/SnackbarContext';
import { useDialog } from '@/hooks/useDialog';

/**
 * Hook to manage the logic of the Blog form (Create/Edit).
 * Handles form state, image previews, and status transitions.
 */
export const useBlogForm = ({ initialData = {}, onSubmit, onStatusChange }) => {
  const isEdit = Boolean(initialData.id);
  const { showSnackbar } = useSnackbar();
  const deleteImageDialog = useDialog();
  const [isDeletingImage, setIsDeletingImage] = useState(false);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fileInputRef = useRef(null);

  const formMethods = useForm({
    defaultValues: {
      title: initialData.title || '',
      status: initialData.status === 'Visible' ? 'Visible' : 'Hidden',
     // author: initialData.author || '',
      content: initialData.content || '',
      description: initialData.description || '',
      photo: initialData.photo || '', // For preview
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
      setIsUpdatingStatus(true);
      const success = await onStatusChange(pendingStatus);
      setIsUpdatingStatus(false);
      if (success) {
        setValue('status', pendingStatus);
      }
    }
    setIsStatusDialogOpen(false);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      setIsPublishDialogOpen(true);
    } else {
      showSnackbar('Please fill in all required fields.', 'error');
    }
  };

  const confirmSubmit = () => {
    setIsPublishDialogOpen(false);
    handleSubmit((data) => {
      onSubmit({ ...data, imageFile });
    })();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showSnackbar('File size exceeds 2MB limit.', 'error');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setValue('photo', '');
  };

  return {
    isEdit,
    formMethods,
    control,
    handleSubmit: formMethods.handleSubmit,
    errors,
    formValues,
    fileInputRef,
    isPublishDialogOpen,
    setIsPublishDialogOpen,
    isStatusDialogOpen,
    setIsStatusDialogOpen,
    isUpdatingStatus,
    pendingStatus,
    deleteImageDialog,
    isDeletingImage,
    imageFile,
    handleUserStatusToggle,
    confirmStatusChange,
    handleSaveClick,
    confirmSubmit,
    handleImageChange,
    removeImage,
    setValue
  };
};
