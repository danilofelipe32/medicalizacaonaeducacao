import React, { useRef, useState, useEffect } from 'react';
import { Encontro } from '../types';

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

  const contentCard = (
      <div 
        className={`relative bg-sky-900/40 backdrop-blur-lg p-4 rounded-lg border border-sky-800/60 shadow-lg cursor-pointer motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out transform hover:bg-sky-800/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/20
          ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-4' : 'translate-x-4'}`
        }`}
        onClick={onClick}
        onKeyPress={(e) => e.key === 'Enter' && onClick()}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalhes sobre: ${encontro.title}`}
      >
          {/* Puntero/Triángulo */}
          <div className={`absolute w-3 h-3 bg-sky-900/40 border-sky-800/60 transform rotate-45 top-1/2 -translate-y-1/2 
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