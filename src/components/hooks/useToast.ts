import React from 'react';
import { toast, type ExternalToast } from 'sonner';

export const useToast = () => {
  const toastInfo = (
    message: string | React.ReactNode,
    data?: ExternalToast
  ) => {
    toast.info(message, data);
  };

  const toastSuccess = (
    message: string | React.ReactNode,
    data?: ExternalToast
  ) => {
    toast.success(message, data);
  };

  const toastError = (
    message: string | React.ReactNode,
    data?: ExternalToast
  ) => {
    toast.error(message, data);
  };

  const toastWarning = (
    message: string | React.ReactNode,
    data?: ExternalToast
  ) => {
    toast.warning(message, data);
  };

  const toastLoading = (
    message: string | React.ReactNode,
    data?: ExternalToast
  ) => {
    toast.loading(message, data);
  };

  return {
    toastInfo,
    toastSuccess,
    toastError,
    toastWarning,
    toastLoading,
  };
};
