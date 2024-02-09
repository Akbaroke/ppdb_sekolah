import { toast } from 'sonner';

type Type = 'success' | 'error' | 'info' | 'warning' | 'loading';

export const Notify = (type: Type, message: string, id?: string) => {
  switch (type) {
    case 'success':
      toast.success(message, { id });
      break;
    case 'error':
      toast.error(message, { id });
      break;
    case 'info':
      toast.info(message, { id });
      break;
    case 'warning':
      toast.warning(message, { id });
      break;
    case 'loading':
      toast.loading(message, { id });
      break;
  }
};
