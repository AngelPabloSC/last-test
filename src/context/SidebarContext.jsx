import React, { createContext, useContext, useState } from 'react';
import { storageService } from '@/services/storageService';

const SidebarContext = createContext();

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(() => storageService.getSidebarOpen(true));

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const nextState = !prev;
      storageService.setSidebarOpen(nextState);
      return nextState;
    });
  };

  const values = {
    isOpen,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={values}>
      {children}
    </SidebarContext.Provider>
  );
};
