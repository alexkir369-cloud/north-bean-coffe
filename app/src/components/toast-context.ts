import { createContext, useContext } from 'react';

// Order, store and event buttons are UI-only in this concept; they announce a short "coming soon" toast.
export const ToastContext = createContext<(message: string) => void>(() => {});

export const useToast = () => useContext(ToastContext);
