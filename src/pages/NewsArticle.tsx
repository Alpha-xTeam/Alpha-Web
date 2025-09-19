import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { LazyImage } from '../components/ui/LazyImage';
import { motion } from 'framer-motion';
import { Share2, Calendar, User, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  images: string[];
  created_at: string;
}

const NewsArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchNewsItem(id);
    }
  }, [id]);

  const fetchNewsItem = async (newsId: string) => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', newsId)
      .single();

    if (error) {
      console.error('Error fetching news item:', error);
    } else {
      setNewsItem(data);
    }
    setLoading(false);
  };

  const handleShare = () => {
    if (newsItem && navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: 'Check out this news article',
        url: `${window.location.origin}/news/article/${newsItem.id}`,
      });
    } else if (newsItem) {
      navigator.clipboard.writeText(`${window.location.origin}/news/article/${newsItem.id}`);
      alert('Link copied to clipboard!');
    }
  };

  const nextImage = () => {
    if (newsItem) {
      setCurrentImageIndex((prev) => (prev + 1) % newsItem.images.length);
    }
  };

  const prevImage = () => {
    if (newsItem) {
      setCurrentImageIndex((prev) => prev === 0 ? newsItem.images.length - 1 : prev - 1);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/news"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to News</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple Header */}
      <div className="pt-24 pb-8 px-8 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
            {newsItem.title}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Read the full article and stay updated with our latest announcements
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="pt-24 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/news"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors duration-300 text-gray-300 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to News</span>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div id="article-content" className="pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
          {/* Article Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-lg">Alpha Team</p>
                  <p className="text-gray-400 flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(newsItem.created_at).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors duration-300"
              >
                <Share2 className="w-5 h-5" />
                <span>Share Article</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Featured Image with Carousel */}
          {newsItem.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 relative"
            >
              <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-2xl">
                <LazyImage
                  key={currentImageIndex}
                  src={newsItem.images[currentImageIndex] || 'https://picsum.photos/800/600?blur=2&grayscale'}
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                  showLoadingSpinner={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Carousel Navigation */}
                {newsItem.images.length > 1 && (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      onClick={prevImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </>
                )}

                {/* Image Counter */}
                {newsItem.images.length > 1 && (
                  <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-sm">
                    {currentImageIndex + 1} / {newsItem.images.length}
                  </div>
                )}
              </div>

              {/* Image Indicators */}
              {newsItem.images.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {newsItem.images.map((_, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentImageIndex === index
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="bg-gray-900/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50">
              <div className="text-gray-300 leading-relaxed text-lg md:text-xl whitespace-pre-wrap">
                {newsItem.content}
              </div>
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold mb-4 text-white">Share this article</h3>
              <p className="text-gray-400 mb-6">Help us spread the word about our latest updates and achievements.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
                <span>Share Article</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Back to News */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <Link
              to="/news"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to All News</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;