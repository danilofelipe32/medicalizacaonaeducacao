import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './icons';

interface SectionCardProps {
    title: string;
    category: string;
    children: React.ReactNode;
}

const COLLAPSED_HEIGHT_REM = 4.5; // Corresponds to Tailwind's h-18, approx 3 lines of text-sm

export const SectionCard: React.FC<SectionCardProps> = React.memo(({ title, category, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpandable, setIsExpandable] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkExpandable = () => {
             if (contentRef.current) {
                const collapsedPx = COLLAPSED_HEIGHT_REM * 16; // Assuming 1rem = 16px
                // Is the actual content taller than the collapsed height?
                if (contentRef.current.scrollHeight > collapsedPx + 1) { // +1 for safety margin
                    setIsExpandable(true);
                } else {
                    setIsExpandable(false);
                }
            }
        };

        checkExpandable();
        window.addEventListener('resize', checkExpandable);
        
        return () => {
            window.removeEventListener('resize', checkExpandable);
        };

    }, [children]);

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

        const currentRef = cardRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);
    
    const baseClasses = "bg-sky-900/30 backdrop-blur-lg border border-sky-700/50 shadow-lg rounded-lg transition-all duration-500 ease-out";
    const hoverClasses = !isExpandable ? "hover:bg-sky-900/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/20" : "";
    const animationClasses = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5';

    return (
        <div ref={cardRef} className={`${baseClasses} ${hoverClasses} ${animationClasses}`}>
            <div className="p-6">
                <p className="mb-2 text-sm font-medium text-sky-400 uppercase tracking-wider">{category}</p>
                <h3 className="mb-3 font-bold text-white text-xl">{title}</h3>
                <div 
                    ref={contentRef}
                    className="text-sm leading-relaxed tracking-wide text-slate-300 space-y-4 overflow-hidden transition-all duration-500 ease-in-out text-justify"
                    style={{ 
                        maxHeight: isOpen || !isExpandable ? `${contentRef.current?.scrollHeight}px` : `${COLLAPSED_HEIGHT_REM}rem` 
                    }}
                >
                    {children}
                </div>
            </div>
            {isExpandable && (
                <div className="border-t border-sky-700/50 px-6 py-2">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex justify-center items-center text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors"
                        aria-expanded={isOpen}
                    >
                        <span>{isOpen ? 'Ver menos' : 'Ver mais'}</span>
                        <ChevronDownIcon className={`w-5 h-5 ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            )}
        </div>
    );
});