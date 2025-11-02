import React, { useEffect } from 'react';
import { Encontro } from '../types';
import { XIcon } from './icons';

interface TimelineModalProps {
  encontro: Encontro;
  onClose: () => void;
}

export const TimelineModal: React.FC<TimelineModalProps> = ({ encontro, onClose }) => {
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-sky-950/80 border border-sky-800 backdrop-blur-2xl rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-scale-in"
        onClick={stopPropagation}
      >
        <header className="flex items-center justify-between p-4 border-b border-sky-800 flex-shrink-0">
          <div className="flex flex-col">
            <h2 id="modal-title" className="text-xl font-bold text-white">{encontro.title}</h2>
            <p className="text-sm text-sky-400">{encontro.date} | {encontro.type} ({encontro.duration})</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-sky-800 hover:text-white transition-colors"
            aria-label="Fechar modal"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="p-6 overflow-y-auto text-slate-300 space-y-4 text-sm leading-relaxed">
          {encontro.guidingQuestion && (
            <div>
              <h3 className="font-semibold text-slate-100 mb-1">Questão Norteadora:</h3>
              <p className="pl-4 border-l-2 border-sky-500 italic text-justify">"{encontro.guidingQuestion}"</p>
            </div>
          )}

          {encontro.objective && (
            <div>
              <h3 className="font-semibold text-slate-100 mb-1">Objetivo:</h3>
              <p className="text-justify">{encontro.objective}</p>
            </div>
          )}

          {encontro.referenceText && (
            <div>
              <h3 className="font-semibold text-slate-100 mb-1">Texto de Referência:</h3>
              <p className="text-justify">{encontro.referenceText}</p>
            </div>
          )}
          
          {encontro.details && encontro.details.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-100 mb-1">Detalhes:</h3>
              <ul className="list-disc list-inside space-y-1">
                {encontro.details.map((detail, i) => <li key={i}>{detail}</li>)}
              </ul>
            </div>
          )}

          {encontro.keyActivity && (
            <div>
              <h3 className="font-semibold text-slate-100 mb-1">Atividade Chave:</h3>
              <p className="text-justify">{encontro.keyActivity}</p>
            </div>
          )}
        </main>
        
        {encontro.extraInfo && (
            <footer className="px-6 py-3 bg-black/30 border-t border-sky-800 rounded-b-xl text-center text-xs text-slate-400 flex-shrink-0">
                <p>{encontro.extraInfo}</p>
            </footer>
        )}
      </div>
    </div>
  );
};