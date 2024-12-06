import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'alert';
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  variant = 'default' 
}: ModalProps) {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'alert':
        return {
          background: 'bg-red-900/30',
          border: 'border-red-800',
          titleColor: 'text-red-300',
          icon: <AlertCircle className="h-6 w-6 text-red-400 mr-3" />
        };
      default:
        return {
          background: 'bg-gray-900',
          border: 'border-gray-800',
          titleColor: 'text-white',
          icon: null
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={onClose} 
        />
        
        {/* Modal Content */}
        <div 
          className={`
            relative w-full max-w-md 
            transform rounded-2xl 
            ${variantStyles.background} 
            ${variantStyles.border}
            border 
            shadow-2xl 
            overflow-hidden
            transition-all duration-300
            scale-100 opacity-100
          `}
        >
          {/* Header */}
          <div 
            className={`
              flex items-center 
              justify-between 
              p-6 
              ${variant === 'default' ? 'bg-gray-800/50' : 'bg-red-900/30'}
            `}
          >
            <div className="flex items-center">
              {variantStyles.icon}
              <h3 
                className={`
                  text-xl font-bold 
                  ${variantStyles.titleColor}
                `}
              >
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="
                text-gray-400 hover:text-white 
                bg-gray-800/50 hover:bg-gray-800 
                p-2 rounded-full 
                transition-all duration-300 
                transform hover:rotate-90
              "
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Example usage
export const ExampleModalContent = () => (
  <div>
    <p className="mb-4">
      This is the modal content. You can customize it as needed.
    </p>
    <div className="flex justify-end space-x-3">
      <button 
        className="
          px-4 py-2 
          bg-gray-800 text-gray-300 
          rounded-lg 
          hover:bg-gray-700 
          transition-colors
        "
      >
        Cancel
      </button>
      <button 
        className="
          px-4 py-2 
          bg-indigo-700 text-white 
          rounded-lg 
          hover:bg-indigo-600 
          transition-colors
        "
      >
        Confirm
      </button>
    </div>
  </div>
);