
import { useEffect } from 'react';

interface ObserverOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useIntersectionObserver = (
  elementSelector: string,
  classToAdd: string,
  options: ObserverOptions = {}
) => {
  useEffect(() => {
    const { threshold = 0.1, rootMargin = '0px', once = true } = options;
    
    const elements = document.querySelectorAll(elementSelector);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(classToAdd);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          entry.target.classList.remove(classToAdd);
        }
      });
    }, {
      threshold,
      rootMargin,
    });

    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [elementSelector, classToAdd, options]);
};

export const fadeIn = (delay: number = 0): string => {
  return `opacity-0 animate-fade-in [animation-delay:${delay}ms] [animation-fill-mode:forwards]`;
};

export const fadeUp = (delay: number = 0): string => {
  return `opacity-0 translate-y-4 animate-fade-up [animation-delay:${delay}ms] [animation-fill-mode:forwards]`;
};

export const slideInRight = (delay: number = 0): string => {
  return `opacity-0 -translate-x-4 animate-slide-in-right [animation-delay:${delay}ms] [animation-fill-mode:forwards]`;
};
