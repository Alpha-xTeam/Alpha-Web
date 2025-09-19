import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { RocketIcon, UsersIcon, LightbulbIcon } from '../components/Icons';
import { Link } from 'react-router-dom';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { Component as AnimatedBackground } from '../components/ui/raycast-animated-black-background';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeatureStepsDemo } from '../components/ui/demo';
import { supabase } from '../lib/supabase';
import { LiquidGlassCard } from '../components/ui/liquid-glass-card';
import { LazyImage } from '../components/ui/LazyImage';
import { Share2, Calendar, User } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  images: string[];
  created_at: string;
}

const Home: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching latest news:', error);
        setLatestNews([]);
      } else {
        setLatestNews(data || []);
      }
    } catch (error) {
      console.error('Error fetching latest news:', error);
      setLatestNews([]);
    }
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

  return (
    <>
      <SEO
        title="Home"
        description="Welcome to Alpha Team - A cutting-edge technology team at the University of Babylon, fostering innovation and technological advancement."
      />

      <div className="min-h-screen bg-black text-white relative">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-32 md:pt-40">
          <div className="text-center mb-8">
            {/* Hero Text Section - Using HeroGeometric style */}
            <div className="max-w-4xl xl:max-w-6xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12">
                <Circle className="h-2 w-2 fill-rose-500/80" />
                <span className="text-sm text-white/60 tracking-wide">
                  Alpha Team
                </span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 md:mb-8 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                    Elevate Your
                  </span>
                  <br />
                  <span
                    className={cn(
                      "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "
                    )}
                  >
                    Digital Vision
                  </span>
                </h1>
              </div>

              <div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-2xl xl:max-w-3xl mx-auto px-4">
                  Spreading Technology Culture & Building Innovative Projects
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <Link to="/team">
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                  Meet Our Team
                </span>
              </ShimmerButton>
            </Link>
            <a href="#projects">
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                  Our Projects
                </span>
              </ShimmerButton>
            </a>
          </div>

          <div className="max-w-6xl xl:max-w-7xl text-center">
            <div className="glass p-6 md:p-8 lg:p-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">About Us</h2>
              <div className="space-y-6 text-base md:text-lg lg:text-xl text-white leading-relaxed">
                <p>
                  Alpha Team is a dynamic technology-focused group dedicated to fostering innovation
                  and technological advancement within our university community.
                </p>
                <p>
                  We believe in the power of technology to transform ideas into reality and are
                  committed to creating a vibrant ecosystem where creativity meets cutting-edge solutions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
                  <div className="glass p-4 md:p-6 text-center hover:bg-white/10 transition-all duration-300">
                    <div className="text-white mb-4 flex justify-center">
                      <RocketIcon size={48} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">Innovation</h3>
                    <p className="text-white">Pushing boundaries with cutting-edge technology</p>
                  </div>
                  <div className="glass p-4 md:p-6 text-center hover:bg-white/10 transition-all duration-300">
                    <div className="text-white mb-4 flex justify-center">
                      <UsersIcon size={48} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">Community</h3>
                    <p className="text-white">Building strong tech community connections</p>
                  </div>
                  <div className="glass p-4 md:p-6 text-center hover:bg-white/10 transition-all duration-300">
                    <div className="text-white mb-4 flex justify-center">
                      <LightbulbIcon size={48} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">Learning</h3>
                    <p className="text-white">Continuous learning and skill development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Steps Section */}
          <div className="mt-16">
            <FeatureStepsDemo />
          </div>

          {/* Latest News Section */}
          <div className="text-center mt-16">
            <div className="max-w-7xl xl:max-w-8xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">Latest News</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestNews.map((news) => (
                  <Link
                    key={news.id}
                    to={`/news/article/${news.id}`}
                    className="group cursor-pointer"
                  >
                    <LiquidGlassCard
                      shadowIntensity='xl'
                      borderRadius='20px'
                      glowIntensity='xl'
                      className="overflow-hidden bg-gradient-to-br from-gray-900/20 to-black/10 backdrop-blur-2xl h-full flex flex-col transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gray-900/50"
                    >
                      {/* صورة الخبر */}
                      <div className="relative h-48 overflow-hidden">
                        <LazyImage
                          src={news.images[0] || 'https://picsum.photos/400/300?blur=2&grayscale'}
                          alt={news.title}
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                          showLoadingSpinner={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                        {/* زر المشاركة */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(news.title, news.id);
                          }}
                          className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30 transition-all duration-300"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>

                        {/* تاريخ الخبر */}
                        <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white/90">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {new Date(news.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* محتوى الخبر */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h2 className="text-xl font-bold mb-3 text-white group-hover:text-gray-100 transition-colors duration-300 line-clamp-2">
                          {news.title}
                        </h2>

                        <p className="text-gray-300 leading-relaxed mb-4 flex-1 line-clamp-3">
                          {news.content}
                        </p>

                        {/* معلومات إضافية */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                          <div className="flex items-center space-x-2 text-gray-400">
                            <User className="w-4 h-4" />
                            <span className="text-sm">Alpha Team</span>
                          </div>

                          <div className="flex space-x-2">
                            {news.images.slice(1, 4).map((img, idx) => (
                              <div key={idx} className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-600">
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
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                      {/* دوائر زجاجية متحركة */}
                      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gray-900/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gray-900/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 pointer-events-none"></div>
                    </LiquidGlassCard>
                  </Link>
                ))}
              </div>
              <Link to="/news" className="mt-8 inline-block">
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                    View All News
                  </span>
                </ShimmerButton>
              </Link>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 mb-24">
            <div className="glass p-6 md:p-8 lg:p-12 max-w-4xl xl:max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Join Our Journey</h2>
              <p className="text-base md:text-lg lg:text-xl text-white mb-8">
                Be part of a community that pushes the boundaries of what's possible in technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/team">
                  <ShimmerButton className="shadow-2xl">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                      Explore Our Team
                    </span>
                  </ShimmerButton>
                </Link>
                <a href="#contact">
                  <ShimmerButton className="shadow-2xl">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                      Get In Touch
                    </span>
                  </ShimmerButton>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;