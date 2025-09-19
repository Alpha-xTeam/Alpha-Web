import React from 'react';
import { useLazyImage } from '../../hooks/useLazyImage';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  placeholder?: string;
  alt: string;
  className?: string;
  showLoadingSpinner?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  placeholder = 'https://picsum.photos/400/300?blur=2&grayscale',
  alt,
  className = '',
  showLoadingSpinner = true,
  onLoad,
  onError,
}) => {
  const { imageSrc, isLoaded, isError, imgRef, handleLoad, handleError } = useLazyImage({
    src,
    placeholder,
  });

  const handleImageLoad = () => {
    handleLoad();
    onLoad?.();
  };

  const handleImageError = () => {
    handleError();
    onError?.();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading Spinner */}
      {showLoadingSpinner && !isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-lg"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </motion.div>
      )}

      {/* Error State */}
      {isError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm rounded-lg"
        >
          <div className="text-center text-white">
            <div className="text-2xl mb-2">📷</div>
            <p className="text-sm">Failed to load image</p>
          </div>
        </motion.div>
      )}

      {/* Main Image */}
      <motion.img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
        transition={{ duration: 0.3 }}
      />

      {/* Loading Overlay Animation */}
      {!isLoaded && !isError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      )}
    </div>
  );
};