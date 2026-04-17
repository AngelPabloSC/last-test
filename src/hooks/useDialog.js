import { useState } from 'react'

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState(null)
  
  const handleOpenDialog = (data = null) => {
    if (data) setDialogContent(data)
    setIsOpen(true)
  }
  
  const handleCloseDialog = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    dialogContent,
    handleOpenDialog,
    handleCloseDialog,
    setDialogContent,
  }
}
