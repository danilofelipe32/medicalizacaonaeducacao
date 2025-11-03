import React, { useRef, useState, useEffect } from 'react';
import { Encontro } from '../types';

// Array de temas de cores para os itens da linha do tempo
const colorThemes = [
    { bg: 'bg-rose-400/10', border: 'border-rose-400/30', hoverBg: 'hover:bg-rose-400/20', shadow: 'hover:shadow-rose-500/20' },
    { bg: 'bg-purple-400/10', border: 'border-purple-400/30', hoverBg: 'hover:bg-purple-400/20', shadow: 'hover:shadow-purple-500/20' },
    { bg: 'bg-indigo-400/10', border: 'border-indigo-400/30', hoverBg: 'hover:bg-indigo-400/20', shadow: 'hover:shadow-indigo-500/20' },
    { bg: 'bg-sky-400/10', border: 'border-sky-400/30', hoverBg: 'hover:bg-sky-400/20', shadow: 'hover:shadow-sky-500/20' },
    { bg: 'bg-teal-400/10', border: 'border-teal-400/30', hoverBg: 'hover:bg-teal-400/20', shadow: 'hover:shadow-teal-500/20' },
    { bg: 'bg-emerald-400/10', border: 'border-emerald-400/30', hoverBg: 'hover:bg-emerald-400/20', shadow: 'hover:shadow-emerald-500/20' },
    { bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', hoverBg: 'hover:bg-yellow-400/20', shadow: 'hover:shadow-yellow-500/20' },
    { bg: 'bg-orange-400/10', border: 'border-orange-400/30', hoverBg: 'hover:bg-orange-400/20', shadow: 'hover:shadow-orange-500/20' },
    { bg: 'bg-pink-400/10', border: 'border-pink-400/30', hoverBg: 'hover:bg-pink-400/20', shadow: 'hover:shadow-pink-500/20' },
];


const TimelineItemFC: React.FC<{ encontro: Encontro; index: number; onClick: () => void }> = ({ encontro, index, onClick }) => {
  const ownRef = useRef<HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = ownRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const isLeft = index % 2 === 0;
  const theme = colorThemes[index % colorThemes.length];

  const contentCard = (
      <div 
        className={`relative backdrop-blur-lg p-4 rounded-lg border shadow-lg cursor-pointer motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out transform hover:-translate-y-1 hover:shadow-xl ${theme.bg} ${theme.border} ${theme.hoverBg} ${theme.shadow}
          ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-4' : 'translate-x-4'}`
        }`}
        onClick={onClick}
        onKeyPress={(e) => e.key === 'Enter' && onClick()}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalhes sobre: ${encontro.title}`}
      >
          {/* Puntero/Triángulo */}
          <div className={`absolute w-3 h-3 ${theme.bg} ${theme.border} transform rotate-45 top-1/2 -translate-y-1/2 
              ${isLeft ? 'right-[-7px] border-t border-r' : 'left-[-7px] border-b border-l'}`
          }></div>
          <div className="relative">
              <time className="text-sm font-bold text-sky-400 uppercase tracking-wider">{encontro.date}</time>
              <p className="mt-1 text-white font-semibold leading-relaxed">{encontro.title}</p>
              <p className="text-xs text-slate-400">{encontro.type} - {encontro.duration}</p>
          </div>
      </div>
  );
  
  const centerDot = (
      <div className="w-2/12 flex justify-center" aria-hidden="true">
            <div className={`w-4 h-4 bg-sky-400 rounded-full border-4 border-sky-950 z-10 motion-safe:transition-transform motion-safe:duration-500 ${isVisible ? 'scale-100' : 'scale-0'} motion-reduce:scale-100`}></div>
      </div>
  );

  return (
    <li ref={ownRef} className="flex justify-between items-center w-full">
      {isLeft ? (
        <>
          <div className="w-5/12">{contentCard}</div>
          {centerDot}
          <div className="w-5/12" aria-hidden="true"></div>
        </>
      ) : (
        <>
          <div className="w-5/12" aria-hidden="true"></div>
          {centerDot}
          <div className="w-5/12">{contentCard}</div>
        </>
      )}
    </li>
  );
};

export const TimelineItem = React.memo(TimelineItemFC);