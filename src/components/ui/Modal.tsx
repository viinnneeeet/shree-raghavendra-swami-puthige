// components/Modal.tsx
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({ open, onOpenChange, title, children }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className="
      fixed top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 
        rounded-xl bg-white p-6 shadow-lg focus:outline-none 
        w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:max-w-2xl
        max-h-[90vh] overflow-y-auto 
        z-[9999]
        animate-in fade-in-0 zoom-in-95
        ">
          <div className="flex justify-between items-center mb-4">
            {title && (
              <Dialog.Title className="lg:text-lg md:text-5xl font-semibold">
                {title}
              </Dialog.Title>
            )}
            <Dialog.Close asChild>
              <button className="p-1 rounded hover:bg-gray-200">
                <X className="lg:w-5 lg:h-5 md:w-10 md:h-10" />
              </button>
            </Dialog.Close>
          </div>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
