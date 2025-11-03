import React, { useEffect } from 'react';
import { XIcon } from './icons';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualização de imagem expandida"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full text-white bg-black/30 hover:bg-black/60 transition-colors z-20"
        aria-label="Fechar imagem"
      >
        <XIcon className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-[90vw] max-h-[90vh] animate-scale-in"
        onClick={stopPropagation}
      >
        <img
          src={imageUrl}
          alt="Visualização expandida"
          className="block max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};