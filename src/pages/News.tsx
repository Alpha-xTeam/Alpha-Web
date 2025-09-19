import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { LiquidGlassCard } from '../components/ui/liquid-glass-card';
import { LazyImage } from '../components/ui/LazyImage';
import { motion } from 'framer-motion';
import { Share2, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  images: string[];
  created_at: string;
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching news:', error);
    } else {
      setNews(data || []);
    }
    setLoading(false);
  };

  const handleShare = (title: string, id: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: 'Check out this news article',
        url: `${window.location.origin}/news/article/${id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/news/article/${id}`);
      alert('Link copied to clipboard!');
    }
  };

  const nextImage = (newsId: string, images: string[]) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [newsId]: ((prev[newsId] || 0) + 1) % images.length
    }));
  };

  const prevImage = (newsId: string, images: string[]) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [newsId]: prev[newsId] === 0 ? images.length - 1 : (prev[newsId] || 0) - 1
    }));
  };

  const goToImage = (newsId: string, index: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [newsId]: index
    }));
  };

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Simple Header */}
      <div className="pb-8 px-8 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
            Latest News
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stay updated with our latest announcements, achievements, and insights from the Alpha Team
          </p>
        </div>
      </div>

      {/* News Grid Section */}
      <div id="news-grid" className="pt-16 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">All Articles</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our complete collection of news articles, updates, and announcements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <Link to={`/news/article/${item.id}`}>
              <LiquidGlassCard
                shadowIntensity='sm'
                borderRadius='20px'
                glowIntensity='md'
                className="overflow-hidden bg-gradient-to-br from-gray-900/10 to-black/5 backdrop-blur-xl min-h-[500px] flex flex-col transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-gray-900/30 border border-gray-700/30 cursor-pointer"
              >
              {/* صورة الخبر مع الكرواسول */}
              <div className="relative h-48 overflow-hidden">
                <LazyImage
                  key={currentImageIndexes[item.id] || 0}
                  src={item.images[currentImageIndexes[item.id] || 0] || 'https://picsum.photos/400/300?blur=2&grayscale'}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  showLoadingSpinner={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* أزرار التنقل في الكرواسول */}
                {item.images.length > 1 && (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage(item.id, item.images);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage(item.id, item.images);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </>
                )}

                {/* زر المشاركة */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(item.title, item.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30 transition-all duration-300"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>

                {/* مؤشرات الصور */}
                {item.images.length > 1 && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2">
                    {item.images.map((_, imgIndex) => (
                      <motion.button
                        key={imgIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + imgIndex * 0.1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToImage(item.id, imgIndex);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          (currentImageIndexes[item.id] || 0) === imgIndex
                            ? 'bg-white scale-125'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* تاريخ الخبر */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white/90">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {new Date(item.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* محتوى الخبر */}
              <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/40 backdrop-blur-sm min-h-[200px]">
                <h2 className="text-xl font-bold mb-3 text-white group-hover:text-gray-100 transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-gray-300 leading-relaxed mb-4 flex-grow line-clamp-3">
                  {item.content}
                </p>

                {/* معلومات إضافية */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-600/50 bg-gray-900/30 backdrop-blur-sm rounded-lg p-3 mt-auto">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Alpha Team</span>
                  </div>

                  <div className="flex space-x-2">
                    {item.images.slice(1, 4).map((img, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-600/50">
                        <LazyImage
                          src={img}
                          alt={`News ${idx}`}
                          className="w-full h-full object-cover"
                          showLoadingSpinner={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* تأثيرات زجاجية إضافية */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* دوائر زجاجية متحركة */}
              <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gray-900/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gray-900/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 pointer-events-none"></div>
            </LiquidGlassCard>
            </Link>
          </motion.div>
        ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;