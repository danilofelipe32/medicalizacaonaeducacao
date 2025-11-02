import React, { useRef, useState, useEffect } from 'react';
import { Encontro } from '../types';

const TimelineItemFC: React.FC<{ encontro: Encontro; index: number }> = ({ encontro, index }) => {
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
      <div className={`relative bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-lg motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out transform hover:bg-slate-700 hover:-translate-y-1 hover:shadow-blue-500/20
          ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-4' : 'translate-x-4'}`
        }`}>
          {/* Puntero/Triángulo */}
          <div className={`absolute w-3 h-3 bg-slate-800 border-slate-700 transform rotate-45 top-1/2 -translate-y-1/2 
              ${isLeft ? 'right-[-7px] border-t border-r' : 'left-[-7px] border-b border-l'}`
          }></div>
          <div className="relative">
              <time className="text-sm font-bold text-blue-400 uppercase tracking-wider">{encontro.date}</time>
              <p className="mt-2 text-slate-200 leading-relaxed">{encontro.title}</p>
          </div>
      </div>
  );
  
  const centerDot = (
      <div className="w-2/12 flex justify-center" aria-hidden="true">
            <div className={`w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-800 z-10 motion-safe:transition-transform motion-safe:duration-500 ${isVisible ? 'scale-100' : 'scale-0'} motion-reduce:scale-100`}></div>
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
