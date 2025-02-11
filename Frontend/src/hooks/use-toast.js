import { useState } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    setToasts([...toasts, toast]);
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((t) => t !== toast));
    }, 3000);
  };

  return {
    toasts,
    toast: addToast,
  };
}
