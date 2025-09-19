import React, { memo } from 'react';

interface InfiniteCarouselProps {
  children: React.ReactNode;
  speed?: number; // سرعة الحركة بالثواني
  direction?: 'left' | 'right';
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = memo(({
  children,
  speed = 15,
  direction = 'left'
}) => {
  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="overflow-hidden relative w-full py-4">
      <div
        className={`flex whitespace-nowrap ${animationClass}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        <div className="flex flex-shrink-0 gap-4">
          {children}
        </div>
        <div className="flex flex-shrink-0 gap-4">
          {children}
        </div>
      </div>
    </div>
  );
});

export default InfiniteCarousel;