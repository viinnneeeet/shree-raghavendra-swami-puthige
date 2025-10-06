import { toast } from '@/hooks/use-toast';
import { ToastVariant } from './ui/toast';

export const showToast = (
  title: string,
  description: string,
  variant: ToastVariant
) => toast({ title, description, variant });
