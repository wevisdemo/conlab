import { RefObject, useEffect, useRef, useState } from 'react';
import scrollama, { ScrollamaInstance } from 'scrollama';

export const useScrollama = (
  options: Omit<ScrollOptions, 'step'> = {},
  updateDependencies: unknown[] = []
): [RefObject<HTMLDivElement>, number | null] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (containerRef?.current) {
      const scroller = scrollama();

      scroller
        .setup({
          step: Array.from(containerRef.current.children) as HTMLElement[],
          ...options,
        })
        .onStepEnter(({ index }) => setActiveIndex(index))
        .onStepExit(({ index }) => {
          if (
            index === 0 ||
            index + 1 === containerRef.current?.childElementCount
          ) {
            setActiveIndex(null);
          }
        });

      window.addEventListener('resize', scroller.resize);

      return () => {
        window.removeEventListener('resize', scroller.resize);
        scroller.destroy();
      };
    }
  }, [containerRef, ...updateDependencies]);

  return [containerRef, activeIndex];
};
