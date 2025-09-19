"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { LazyImage } from './ui/LazyImage';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsItem: {
    id: string;
    title: string;
    content: string;
    images: string[];
    created_at: string;
  } | null;
}

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose, newsItem }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft' && newsItem && newsItem.images.length > 1) {
      setCurrentImageIndex((prev) => prev === 0 ? newsItem.images.length - 1 : prev - 1);
    } else if (e.key === 'ArrowRight' && newsItem && newsItem.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % newsItem.images.length);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0); // Reset to first image when modal opens
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, newsItem]);

  if (!newsItem) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: 'Check out this news article',
        url: `${window.location.origin}/news#${newsItem.id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/news#${newsItem.id}`);
      alert('Link copied to clipboard!');
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % newsItem.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev === 0 ? newsItem.images.length - 1 : prev - 1);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4
            }}
            className="relative w-full max-w-2xl sm:max-w-3xl lg:max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-2xl border border-gray-700/50 rounded-2xl shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30 transition-all duration-300"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Header Image with Carousel */}
            <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
              <LazyImage
                key={currentImageIndex}
                src={newsItem.images[currentImageIndex] || 'https://picsum.photos/400/300?blur=2&grayscale'}
                alt={newsItem.title}
                className="w-full h-full object-cover"
                showLoadingSpinner={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Carousel Navigation Buttons */}
              {newsItem.images.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={prevImage}
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={nextImage}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </>
              )}

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="absolute top-3 sm:top-4 left-3 sm:left-4 p-2 sm:p-3 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30 transition-all duration-300"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              {/* Image Indicators */}
              {newsItem.images.length > 1 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2">
                  {newsItem.images.map((_, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentImageIndex === index
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Date */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex items-center space-x-2 text-white/90">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">
                  {new Date(newsItem.created_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {/* Image Counter */}
              {newsItem.images.length > 1 && (
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white/90 text-xs sm:text-sm">
                  {currentImageIndex + 1} / {newsItem.images.length}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[80vh] sm:max-h-[85vh] md:max-h-[90vh]">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white leading-tight"
              >
                {newsItem.title}
              </motion.h1>

              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-700"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">Alpha Team</p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {new Date(newsItem.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="prose prose-base sm:prose-lg prose-invert max-w-none"
              >
                <div className="text-gray-300 leading-relaxed text-base sm:text-lg mb-4 sm:mb-6 whitespace-pre-wrap">
                  {newsItem.content}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-4 sm:p-6 md:p-8 border-t border-gray-700 bg-black/20 backdrop-blur-sm"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">
                <div className="flex items-center space-x-3 sm:space-x-4 text-gray-400">
                  <span className="text-xs sm:text-sm">Share this article:</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors duration-300"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Share</span>
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 text-sm sm:text-base"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsModal;